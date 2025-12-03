import { neon } from '@neondatabase/serverless';
import { corsHeaders, createResponse } from './utils.mjs';

export default async (req, context) => {

  if (req.method === 'OPTIONS') {
    return new Response(null, { status: 204, headers: corsHeaders });
  }

  try {
    if (!process.env.DATABASE_URL) {
      console.error('DATABASE_URL not configured');
      return createResponse({ error: 'Database not configured' }, 500);
    }

    const sql = neon(process.env.DATABASE_URL);
    const result = await sql`SELECT availability_id, spot_number, floor_number, status, vehicle_license_plate, customer_id FROM availability ORDER BY spot_number`;
    
    return createResponse(result, 200);
  } catch (error) {
    console.error('Error fetching items:', error);
    return createResponse({ error: 'Failed to fetch items' }, 500);
  }
};
