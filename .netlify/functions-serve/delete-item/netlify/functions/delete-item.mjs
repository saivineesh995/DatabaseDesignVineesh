
import {createRequire as ___nfyCreateRequire} from "module";
import {fileURLToPath as ___nfyFileURLToPath} from "url";
import {dirname as ___nfyPathDirname} from "path";
let __filename=___nfyFileURLToPath(import.meta.url);
let __dirname=___nfyPathDirname(___nfyFileURLToPath(import.meta.url));
let require=___nfyCreateRequire(import.meta.url);


// netlify/functions/delete-item.mjs
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

// netlify/functions/delete-item.mjs
var delete_item_default = async (req, context) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { status: 204, headers: corsHeaders });
  }
  try {
    if (req.method !== "DELETE") {
      return createResponse({ error: "Method not allowed" }, 405);
    }
    const url = new URL(req.url);
    const id = url.searchParams.get("id");
    if (!id) {
      return createResponse({ error: "ID parameter required" }, 400);
    }
    const sql = neon(process.env.DATABASE_URL);
    const result = await sql`DELETE FROM availability WHERE availability_id = ${id} RETURNING *`;
    if (result.length === 0) {
      return createResponse({ error: "Item not found" }, 404);
    }
    return createResponse({ message: "Item deleted successfully" }, 200);
  } catch (error) {
    console.error("Error deleting item:", error);
    return createResponse({ error: "Failed to delete item" }, 500);
  }
};
export {
  delete_item_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsibmV0bGlmeS9mdW5jdGlvbnMvZGVsZXRlLWl0ZW0ubWpzIiwgIm5ldGxpZnkvZnVuY3Rpb25zL3V0aWxzLm1qcyJdLAogICJzb3VyY2VzQ29udGVudCI6IFsiaW1wb3J0IHsgbmVvbiB9IGZyb20gJ0BuZW9uZGF0YWJhc2Uvc2VydmVybGVzcyc7XHJcbmltcG9ydCB7IGNvcnNIZWFkZXJzLCBjcmVhdGVSZXNwb25zZSB9IGZyb20gJy4vdXRpbHMubWpzJztcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGFzeW5jIChyZXEsIGNvbnRleHQpID0+IHtcclxuICAvLyBIYW5kbGUgcHJlZmxpZ2h0IHJlcXVlc3RzXHJcbiAgaWYgKHJlcS5tZXRob2QgPT09ICdPUFRJT05TJykge1xyXG4gICAgcmV0dXJuIG5ldyBSZXNwb25zZShudWxsLCB7IHN0YXR1czogMjA0LCBoZWFkZXJzOiBjb3JzSGVhZGVycyB9KTtcclxuICB9XHJcblxyXG4gIHRyeSB7XHJcbiAgICBpZiAocmVxLm1ldGhvZCAhPT0gJ0RFTEVURScpIHtcclxuICAgICAgcmV0dXJuIGNyZWF0ZVJlc3BvbnNlKHsgZXJyb3I6ICdNZXRob2Qgbm90IGFsbG93ZWQnIH0sIDQwNSk7XHJcbiAgICB9XHJcbiAgICBcclxuICAgIGNvbnN0IHVybCA9IG5ldyBVUkwocmVxLnVybCk7XHJcbiAgICBjb25zdCBpZCA9IHVybC5zZWFyY2hQYXJhbXMuZ2V0KCdpZCcpO1xyXG4gICAgXHJcbiAgICBpZiAoIWlkKSB7XHJcbiAgICAgIHJldHVybiBjcmVhdGVSZXNwb25zZSh7IGVycm9yOiAnSUQgcGFyYW1ldGVyIHJlcXVpcmVkJyB9LCA0MDApO1xyXG4gICAgfVxyXG4gICAgXHJcbiAgICBjb25zdCBzcWwgPSBuZW9uKHByb2Nlc3MuZW52LkRBVEFCQVNFX1VSTCk7XHJcbiAgICBjb25zdCByZXN1bHQgPSBhd2FpdCBzcWxgREVMRVRFIEZST00gYXZhaWxhYmlsaXR5IFdIRVJFIGF2YWlsYWJpbGl0eV9pZCA9ICR7aWR9IFJFVFVSTklORyAqYDtcclxuICAgIFxyXG4gICAgaWYgKHJlc3VsdC5sZW5ndGggPT09IDApIHtcclxuICAgICAgcmV0dXJuIGNyZWF0ZVJlc3BvbnNlKHsgZXJyb3I6ICdJdGVtIG5vdCBmb3VuZCcgfSwgNDA0KTtcclxuICAgIH1cclxuICAgIFxyXG4gICAgcmV0dXJuIGNyZWF0ZVJlc3BvbnNlKHsgbWVzc2FnZTogJ0l0ZW0gZGVsZXRlZCBzdWNjZXNzZnVsbHknIH0sIDIwMCk7XHJcbiAgfSBjYXRjaCAoZXJyb3IpIHtcclxuICAgIGNvbnNvbGUuZXJyb3IoJ0Vycm9yIGRlbGV0aW5nIGl0ZW06JywgZXJyb3IpO1xyXG4gICAgcmV0dXJuIGNyZWF0ZVJlc3BvbnNlKHsgZXJyb3I6ICdGYWlsZWQgdG8gZGVsZXRlIGl0ZW0nIH0sIDUwMCk7XHJcbiAgfVxyXG59O1xyXG4iLCAiLy8gQ09SUyBoZWFkZXJzIGZvciBhbGwgQVBJIHJlc3BvbnNlc1xyXG5leHBvcnQgY29uc3QgY29yc0hlYWRlcnMgPSB7XHJcbiAgJ0FjY2Vzcy1Db250cm9sLUFsbG93LU9yaWdpbic6ICcqJyxcclxuICAnQWNjZXNzLUNvbnRyb2wtQWxsb3ctTWV0aG9kcyc6ICdHRVQsIFBPU1QsIFBVVCwgREVMRVRFLCBPUFRJT05TJyxcclxuICAnQWNjZXNzLUNvbnRyb2wtQWxsb3ctSGVhZGVycyc6ICdDb250ZW50LVR5cGUnLFxyXG4gICdDb250ZW50LVR5cGUnOiAnYXBwbGljYXRpb24vanNvbidcclxufTtcclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBjcmVhdGVSZXNwb25zZShib2R5LCBzdGF0dXMgPSAyMDApIHtcclxuICByZXR1cm4gbmV3IFJlc3BvbnNlKEpTT04uc3RyaW5naWZ5KGJvZHkpLCB7XHJcbiAgICBzdGF0dXMsXHJcbiAgICBoZWFkZXJzOiBjb3JzSGVhZGVyc1xyXG4gIH0pO1xyXG59XHJcbiJdLAogICJtYXBwaW5ncyI6ICI7Ozs7Ozs7Ozs7QUFBQSxTQUFTLFlBQVk7OztBQ0NkLElBQU0sY0FBYztBQUFBLEVBQ3pCLCtCQUErQjtBQUFBLEVBQy9CLGdDQUFnQztBQUFBLEVBQ2hDLGdDQUFnQztBQUFBLEVBQ2hDLGdCQUFnQjtBQUNsQjtBQUVPLFNBQVMsZUFBZSxNQUFNLFNBQVMsS0FBSztBQUNqRCxTQUFPLElBQUksU0FBUyxLQUFLLFVBQVUsSUFBSSxHQUFHO0FBQUEsSUFDeEM7QUFBQSxJQUNBLFNBQVM7QUFBQSxFQUNYLENBQUM7QUFDSDs7O0FEVkEsSUFBTyxzQkFBUSxPQUFPLEtBQUssWUFBWTtBQUVyQyxNQUFJLElBQUksV0FBVyxXQUFXO0FBQzVCLFdBQU8sSUFBSSxTQUFTLE1BQU0sRUFBRSxRQUFRLEtBQUssU0FBUyxZQUFZLENBQUM7QUFBQSxFQUNqRTtBQUVBLE1BQUk7QUFDRixRQUFJLElBQUksV0FBVyxVQUFVO0FBQzNCLGFBQU8sZUFBZSxFQUFFLE9BQU8scUJBQXFCLEdBQUcsR0FBRztBQUFBLElBQzVEO0FBRUEsVUFBTSxNQUFNLElBQUksSUFBSSxJQUFJLEdBQUc7QUFDM0IsVUFBTSxLQUFLLElBQUksYUFBYSxJQUFJLElBQUk7QUFFcEMsUUFBSSxDQUFDLElBQUk7QUFDUCxhQUFPLGVBQWUsRUFBRSxPQUFPLHdCQUF3QixHQUFHLEdBQUc7QUFBQSxJQUMvRDtBQUVBLFVBQU0sTUFBTSxLQUFLLFFBQVEsSUFBSSxZQUFZO0FBQ3pDLFVBQU0sU0FBUyxNQUFNLHVEQUF1RCxFQUFFO0FBRTlFLFFBQUksT0FBTyxXQUFXLEdBQUc7QUFDdkIsYUFBTyxlQUFlLEVBQUUsT0FBTyxpQkFBaUIsR0FBRyxHQUFHO0FBQUEsSUFDeEQ7QUFFQSxXQUFPLGVBQWUsRUFBRSxTQUFTLDRCQUE0QixHQUFHLEdBQUc7QUFBQSxFQUNyRSxTQUFTLE9BQU87QUFDZCxZQUFRLE1BQU0sd0JBQXdCLEtBQUs7QUFDM0MsV0FBTyxlQUFlLEVBQUUsT0FBTyx3QkFBd0IsR0FBRyxHQUFHO0FBQUEsRUFDL0Q7QUFDRjsiLAogICJuYW1lcyI6IFtdCn0K
