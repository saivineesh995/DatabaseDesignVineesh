import { neon } from '@neondatabase/serverless';
import { corsHeaders, createResponse } from './utils.mjs';

export default async (req, context) => {
  // Handle preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { status: 204, headers: corsHeaders });
  }

  try {
    const url = new URL(req.url);
    const id = url.searchParams.get('id');
    
    if (!id) {
      return createResponse({ error: 'ID parameter required' }, 400);
    }
    
    const sql = neon(process.env.DATABASE_URL);
    const result = await sql`SELECT availability_id, spot_number, floor_number, status, vehicle_license_plate, customer_id FROM availability WHERE availability_id = ${id}`;
    
    if (result.length === 0) {
      return createResponse({ error: 'Item not found' }, 404);
    }
    
    return createResponse(result[0], 200);
  } catch (error) {
    console.error('Error fetching item:', error);
    return createResponse({ error: 'Failed to fetch item' }, 500);
  }
};
