import { neon } from '@neondatabase/serverless';
import { corsHeaders, createResponse } from './utils.mjs';

export default async (req, context) => {

  if (req.method === 'OPTIONS') {
    return new Response(null, { status: 204, headers: corsHeaders });
  }

  try {
    if (req.method !== 'DELETE') {
      return createResponse({ error: 'Method not allowed' }, 405);
    }
    
    const url = new URL(req.url);
    const id = url.searchParams.get('id');
    
    if (!id) {
      return createResponse({ error: 'ID parameter required' }, 400);
    }
    
    const sql = neon(process.env.DATABASE_URL);
    const result = await sql`DELETE FROM availability WHERE availability_id = ${id} RETURNING *`;
    
    if (result.length === 0) {
      return createResponse({ error: 'Item not found' }, 404);
    }
    
    return createResponse({ message: 'Item deleted successfully' }, 200);
  } catch (error) {
    console.error('Error deleting item:', error);
    return createResponse({ error: 'Failed to delete item' }, 500);
  }
};
