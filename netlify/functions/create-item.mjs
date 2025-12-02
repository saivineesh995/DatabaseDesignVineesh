import { neon } from '@neondatabase/serverless';
import { corsHeaders, createResponse } from './utils.mjs';

export default async (req, context) => {
  // Handle preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { status: 204, headers: corsHeaders });
  }

  try {
    if (req.method !== 'POST') {
      return createResponse({ error: 'Method not allowed' }, 405);
    }
    
    const body = await req.json();
    
    // Validate required fields
    if (!body.spot_number || !body.status) {
      return createResponse({ error: 'Missing required fields: spot_number, status' }, 400);
    }
    
    const sql = neon(process.env.DATABASE_URL);
    const result = await sql`INSERT INTO availability (spot_number, floor_number, status, vehicle_license_plate, customer_id) VALUES (${body.spot_number}, ${body.floor_number || 1}, ${body.status}, ${body.vehicle_license_plate || null}, ${body.customer_id || null}) RETURNING *`;
    
    return createResponse(result[0], 201);
  } catch (error) {
    console.error('Error creating item:', error);
    return createResponse({ error: 'Failed to create item' }, 500);
  }
};
