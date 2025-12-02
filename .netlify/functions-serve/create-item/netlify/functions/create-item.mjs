
import {createRequire as ___nfyCreateRequire} from "module";
import {fileURLToPath as ___nfyFileURLToPath} from "url";
import {dirname as ___nfyPathDirname} from "path";
let __filename=___nfyFileURLToPath(import.meta.url);
let __dirname=___nfyPathDirname(___nfyFileURLToPath(import.meta.url));
let require=___nfyCreateRequire(import.meta.url);


// netlify/functions/create-item.mjs
import { neon } from "@neondatabase/serverless";

// netlify/functions/utils.mjs
var corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type",
  "Content-Type": "application/json"
};
function createResponse(body, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: corsHeaders
  });
}

// netlify/functions/create-item.mjs
var create_item_default = async (req, context) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { status: 204, headers: corsHeaders });
  }
  try {
    if (req.method !== "POST") {
      return createResponse({ error: "Method not allowed" }, 405);
    }
    const body = await req.json();
    if (!body.spot_number || !body.status) {
      return createResponse({ error: "Missing required fields: spot_number, status" }, 400);
    }
    const sql = neon(process.env.DATABASE_URL);
    const result = await sql`INSERT INTO availability (spot_number, floor_number, status, vehicle_license_plate, customer_id) VALUES (${body.spot_number}, ${body.floor_number || 1}, ${body.status}, ${body.vehicle_license_plate || null}, ${body.customer_id || null}) RETURNING *`;
    return createResponse(result[0], 201);
  } catch (error) {
    console.error("Error creating item:", error);
    return createResponse({ error: "Failed to create item" }, 500);
  }
};
export {
  create_item_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsibmV0bGlmeS9mdW5jdGlvbnMvY3JlYXRlLWl0ZW0ubWpzIiwgIm5ldGxpZnkvZnVuY3Rpb25zL3V0aWxzLm1qcyJdLAogICJzb3VyY2VzQ29udGVudCI6IFsiaW1wb3J0IHsgbmVvbiB9IGZyb20gJ0BuZW9uZGF0YWJhc2Uvc2VydmVybGVzcyc7XHJcbmltcG9ydCB7IGNvcnNIZWFkZXJzLCBjcmVhdGVSZXNwb25zZSB9IGZyb20gJy4vdXRpbHMubWpzJztcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGFzeW5jIChyZXEsIGNvbnRleHQpID0+IHtcclxuICAvLyBIYW5kbGUgcHJlZmxpZ2h0IHJlcXVlc3RzXHJcbiAgaWYgKHJlcS5tZXRob2QgPT09ICdPUFRJT05TJykge1xyXG4gICAgcmV0dXJuIG5ldyBSZXNwb25zZShudWxsLCB7IHN0YXR1czogMjA0LCBoZWFkZXJzOiBjb3JzSGVhZGVycyB9KTtcclxuICB9XHJcblxyXG4gIHRyeSB7XHJcbiAgICBpZiAocmVxLm1ldGhvZCAhPT0gJ1BPU1QnKSB7XHJcbiAgICAgIHJldHVybiBjcmVhdGVSZXNwb25zZSh7IGVycm9yOiAnTWV0aG9kIG5vdCBhbGxvd2VkJyB9LCA0MDUpO1xyXG4gICAgfVxyXG4gICAgXHJcbiAgICBjb25zdCBib2R5ID0gYXdhaXQgcmVxLmpzb24oKTtcclxuICAgIFxyXG4gICAgLy8gVmFsaWRhdGUgcmVxdWlyZWQgZmllbGRzXHJcbiAgICBpZiAoIWJvZHkuc3BvdF9udW1iZXIgfHwgIWJvZHkuc3RhdHVzKSB7XHJcbiAgICAgIHJldHVybiBjcmVhdGVSZXNwb25zZSh7IGVycm9yOiAnTWlzc2luZyByZXF1aXJlZCBmaWVsZHM6IHNwb3RfbnVtYmVyLCBzdGF0dXMnIH0sIDQwMCk7XHJcbiAgICB9XHJcbiAgICBcclxuICAgIGNvbnN0IHNxbCA9IG5lb24ocHJvY2Vzcy5lbnYuREFUQUJBU0VfVVJMKTtcclxuICAgIGNvbnN0IHJlc3VsdCA9IGF3YWl0IHNxbGBJTlNFUlQgSU5UTyBhdmFpbGFiaWxpdHkgKHNwb3RfbnVtYmVyLCBmbG9vcl9udW1iZXIsIHN0YXR1cywgdmVoaWNsZV9saWNlbnNlX3BsYXRlLCBjdXN0b21lcl9pZCkgVkFMVUVTICgke2JvZHkuc3BvdF9udW1iZXJ9LCAke2JvZHkuZmxvb3JfbnVtYmVyIHx8IDF9LCAke2JvZHkuc3RhdHVzfSwgJHtib2R5LnZlaGljbGVfbGljZW5zZV9wbGF0ZSB8fCBudWxsfSwgJHtib2R5LmN1c3RvbWVyX2lkIHx8IG51bGx9KSBSRVRVUk5JTkcgKmA7XHJcbiAgICBcclxuICAgIHJldHVybiBjcmVhdGVSZXNwb25zZShyZXN1bHRbMF0sIDIwMSk7XHJcbiAgfSBjYXRjaCAoZXJyb3IpIHtcclxuICAgIGNvbnNvbGUuZXJyb3IoJ0Vycm9yIGNyZWF0aW5nIGl0ZW06JywgZXJyb3IpO1xyXG4gICAgcmV0dXJuIGNyZWF0ZVJlc3BvbnNlKHsgZXJyb3I6ICdGYWlsZWQgdG8gY3JlYXRlIGl0ZW0nIH0sIDUwMCk7XHJcbiAgfVxyXG59O1xyXG4iLCAiLy8gQ09SUyBoZWFkZXJzIGZvciBhbGwgQVBJIHJlc3BvbnNlc1xyXG5leHBvcnQgY29uc3QgY29yc0hlYWRlcnMgPSB7XHJcbiAgJ0FjY2Vzcy1Db250cm9sLUFsbG93LU9yaWdpbic6ICcqJyxcclxuICAnQWNjZXNzLUNvbnRyb2wtQWxsb3ctTWV0aG9kcyc6ICdHRVQsIFBPU1QsIFBVVCwgREVMRVRFLCBPUFRJT05TJyxcclxuICAnQWNjZXNzLUNvbnRyb2wtQWxsb3ctSGVhZGVycyc6ICdDb250ZW50LVR5cGUnLFxyXG4gICdDb250ZW50LVR5cGUnOiAnYXBwbGljYXRpb24vanNvbidcclxufTtcclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBjcmVhdGVSZXNwb25zZShib2R5LCBzdGF0dXMgPSAyMDApIHtcclxuICByZXR1cm4gbmV3IFJlc3BvbnNlKEpTT04uc3RyaW5naWZ5KGJvZHkpLCB7XHJcbiAgICBzdGF0dXMsXHJcbiAgICBoZWFkZXJzOiBjb3JzSGVhZGVyc1xyXG4gIH0pO1xyXG59XHJcbiJdLAogICJtYXBwaW5ncyI6ICI7Ozs7Ozs7Ozs7QUFBQSxTQUFTLFlBQVk7OztBQ0NkLElBQU0sY0FBYztBQUFBLEVBQ3pCLCtCQUErQjtBQUFBLEVBQy9CLGdDQUFnQztBQUFBLEVBQ2hDLGdDQUFnQztBQUFBLEVBQ2hDLGdCQUFnQjtBQUNsQjtBQUVPLFNBQVMsZUFBZSxNQUFNLFNBQVMsS0FBSztBQUNqRCxTQUFPLElBQUksU0FBUyxLQUFLLFVBQVUsSUFBSSxHQUFHO0FBQUEsSUFDeEM7QUFBQSxJQUNBLFNBQVM7QUFBQSxFQUNYLENBQUM7QUFDSDs7O0FEVkEsSUFBTyxzQkFBUSxPQUFPLEtBQUssWUFBWTtBQUVyQyxNQUFJLElBQUksV0FBVyxXQUFXO0FBQzVCLFdBQU8sSUFBSSxTQUFTLE1BQU0sRUFBRSxRQUFRLEtBQUssU0FBUyxZQUFZLENBQUM7QUFBQSxFQUNqRTtBQUVBLE1BQUk7QUFDRixRQUFJLElBQUksV0FBVyxRQUFRO0FBQ3pCLGFBQU8sZUFBZSxFQUFFLE9BQU8scUJBQXFCLEdBQUcsR0FBRztBQUFBLElBQzVEO0FBRUEsVUFBTSxPQUFPLE1BQU0sSUFBSSxLQUFLO0FBRzVCLFFBQUksQ0FBQyxLQUFLLGVBQWUsQ0FBQyxLQUFLLFFBQVE7QUFDckMsYUFBTyxlQUFlLEVBQUUsT0FBTywrQ0FBK0MsR0FBRyxHQUFHO0FBQUEsSUFDdEY7QUFFQSxVQUFNLE1BQU0sS0FBSyxRQUFRLElBQUksWUFBWTtBQUN6QyxVQUFNLFNBQVMsTUFBTSwrR0FBK0csS0FBSyxXQUFXLEtBQUssS0FBSyxnQkFBZ0IsQ0FBQyxLQUFLLEtBQUssTUFBTSxLQUFLLEtBQUsseUJBQXlCLElBQUksS0FBSyxLQUFLLGVBQWUsSUFBSTtBQUVuUSxXQUFPLGVBQWUsT0FBTyxDQUFDLEdBQUcsR0FBRztBQUFBLEVBQ3RDLFNBQVMsT0FBTztBQUNkLFlBQVEsTUFBTSx3QkFBd0IsS0FBSztBQUMzQyxXQUFPLGVBQWUsRUFBRSxPQUFPLHdCQUF3QixHQUFHLEdBQUc7QUFBQSxFQUMvRDtBQUNGOyIsCiAgIm5hbWVzIjogW10KfQo=
