import { neon } from '@neondatabase/serverless';
import { corsHeaders, createResponse } from './utils.mjs';

export default async (req, context) => {
  // Handle preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { status: 204, headers: corsHeaders });
  }

  try {
    if (req.method !== 'PUT') {
      return createResponse({ error: 'Method not allowed' }, 405);
    }
    
    const url = new URL(req.url);
    const id = url.searchParams.get('id');
    
    if (!id) {
      return createResponse({ error: 'ID parameter required' }, 400);
    }
    
    const body = await req.json();
    
    // Validate that at least one field is provided for update
    if (Object.keys(body).length === 0) {
      return createResponse({ error: 'No fields to update' }, 400);
    }
    
    const sql = neon(process.env.DATABASE_URL);
    let result;
    
    // Build query based on provided fields
    const allowedFields = ['spot_number', 'floor_number', 'status', 'vehicle_license_plate', 'customer_id'];
    const updateFields = Object.keys(body).filter(field => allowedFields.includes(field));
    
    if (updateFields.length === 0) {
      return createResponse({ error: 'No valid fields to update' }, 400);
    }
    
    // Handle dynamic UPDATE - use conditional updates
    if (updateFields.length === 1) {
      const field = updateFields[0];
      const value = body[field];
      
      if (field === 'spot_number') {
        result = await sql`UPDATE availability SET spot_number = ${value} WHERE availability_id = ${id} RETURNING *`;
      } else if (field === 'floor_number') {
        result = await sql`UPDATE availability SET floor_number = ${value} WHERE availability_id = ${id} RETURNING *`;
      } else if (field === 'status') {
        result = await sql`UPDATE availability SET status = ${value} WHERE availability_id = ${id} RETURNING *`;
      } else if (field === 'vehicle_license_plate') {
        result = await sql`UPDATE availability SET vehicle_license_plate = ${value} WHERE availability_id = ${id} RETURNING *`;
      } else if (field === 'customer_id') {
        result = await sql`UPDATE availability SET customer_id = ${value} WHERE availability_id = ${id} RETURNING *`;
      }
    } else if (updateFields.length === 2) {
      const field1 = updateFields[0];
      const field2 = updateFields[1];
      const value1 = body[field1];
      const value2 = body[field2];
      
      // This is a simplified version for 2 fields - you may want to expand for more combinations
      if ((field1 === 'status' && field2 === 'vehicle_license_plate') || 
          (field1 === 'vehicle_license_plate' && field2 === 'status')) {
        result = await sql`UPDATE availability SET status = ${body.status}, vehicle_license_plate = ${body.vehicle_license_plate} WHERE availability_id = ${id} RETURNING *`;
      } else if ((field1 === 'status' && field2 === 'customer_id') || 
                 (field1 === 'customer_id' && field2 === 'status')) {
        result = await sql`UPDATE availability SET status = ${body.status}, customer_id = ${body.customer_id} WHERE availability_id = ${id} RETURNING *`;
      } else {
        // Fallback for other combinations
        result = await sql`UPDATE availability SET ${field1} = ${value1}, ${field2} = ${value2} WHERE availability_id = ${id} RETURNING *`;
      }
    } else {
      // More than 2 fields - update all provided fields
      result = await sql`UPDATE availability SET 
        spot_number = COALESCE(${updateFields.includes('spot_number') ? body.spot_number : null}, spot_number),
        floor_number = COALESCE(${updateFields.includes('floor_number') ? body.floor_number : null}, floor_number),
        status = COALESCE(${updateFields.includes('status') ? body.status : null}, status),
        vehicle_license_plate = COALESCE(${updateFields.includes('vehicle_license_plate') ? body.vehicle_license_plate : null}, vehicle_license_plate),
        customer_id = COALESCE(${updateFields.includes('customer_id') ? body.customer_id : null}, customer_id)
        WHERE availability_id = ${id} RETURNING *`;
    }
    
    if (result.length === 0) {
      return createResponse({ error: 'Item not found' }, 404);
    }
    
    return createResponse(result[0], 200);
  } catch (error) {
    console.error('Error updating item:', error);
    return createResponse({ error: 'Failed to update item' }, 500);
  }
};
