
import {createRequire as ___nfyCreateRequire} from "module";
import {fileURLToPath as ___nfyFileURLToPath} from "url";
import {dirname as ___nfyPathDirname} from "path";
let __filename=___nfyFileURLToPath(import.meta.url);
let __dirname=___nfyPathDirname(___nfyFileURLToPath(import.meta.url));
let require=___nfyCreateRequire(import.meta.url);


// netlify/functions/get-item-by-id.mjs
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

// netlify/functions/get-item-by-id.mjs
var get_item_by_id_default = async (req, context) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { status: 204, headers: corsHeaders });
  }
  try {
    const url = new URL(req.url);
    const id = url.searchParams.get("id");
    if (!id) {
      return createResponse({ error: "ID parameter required" }, 400);
    }
    const sql = neon(process.env.DATABASE_URL);
    const result = await sql`SELECT availability_id, spot_number, floor_number, status, vehicle_license_plate, customer_id FROM availability WHERE availability_id = ${id}`;
    if (result.length === 0) {
      return createResponse({ error: "Item not found" }, 404);
    }
    return createResponse(result[0], 200);
  } catch (error) {
    console.error("Error fetching item:", error);
    return createResponse({ error: "Failed to fetch item" }, 500);
  }
};
export {
  get_item_by_id_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsibmV0bGlmeS9mdW5jdGlvbnMvZ2V0LWl0ZW0tYnktaWQubWpzIiwgIm5ldGxpZnkvZnVuY3Rpb25zL3V0aWxzLm1qcyJdLAogICJzb3VyY2VzQ29udGVudCI6IFsiaW1wb3J0IHsgbmVvbiB9IGZyb20gJ0BuZW9uZGF0YWJhc2Uvc2VydmVybGVzcyc7XHJcbmltcG9ydCB7IGNvcnNIZWFkZXJzLCBjcmVhdGVSZXNwb25zZSB9IGZyb20gJy4vdXRpbHMubWpzJztcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGFzeW5jIChyZXEsIGNvbnRleHQpID0+IHtcclxuICAvLyBIYW5kbGUgcHJlZmxpZ2h0IHJlcXVlc3RzXHJcbiAgaWYgKHJlcS5tZXRob2QgPT09ICdPUFRJT05TJykge1xyXG4gICAgcmV0dXJuIG5ldyBSZXNwb25zZShudWxsLCB7IHN0YXR1czogMjA0LCBoZWFkZXJzOiBjb3JzSGVhZGVycyB9KTtcclxuICB9XHJcblxyXG4gIHRyeSB7XHJcbiAgICBjb25zdCB1cmwgPSBuZXcgVVJMKHJlcS51cmwpO1xyXG4gICAgY29uc3QgaWQgPSB1cmwuc2VhcmNoUGFyYW1zLmdldCgnaWQnKTtcclxuICAgIFxyXG4gICAgaWYgKCFpZCkge1xyXG4gICAgICByZXR1cm4gY3JlYXRlUmVzcG9uc2UoeyBlcnJvcjogJ0lEIHBhcmFtZXRlciByZXF1aXJlZCcgfSwgNDAwKTtcclxuICAgIH1cclxuICAgIFxyXG4gICAgY29uc3Qgc3FsID0gbmVvbihwcm9jZXNzLmVudi5EQVRBQkFTRV9VUkwpO1xyXG4gICAgY29uc3QgcmVzdWx0ID0gYXdhaXQgc3FsYFNFTEVDVCBhdmFpbGFiaWxpdHlfaWQsIHNwb3RfbnVtYmVyLCBmbG9vcl9udW1iZXIsIHN0YXR1cywgdmVoaWNsZV9saWNlbnNlX3BsYXRlLCBjdXN0b21lcl9pZCBGUk9NIGF2YWlsYWJpbGl0eSBXSEVSRSBhdmFpbGFiaWxpdHlfaWQgPSAke2lkfWA7XHJcbiAgICBcclxuICAgIGlmIChyZXN1bHQubGVuZ3RoID09PSAwKSB7XHJcbiAgICAgIHJldHVybiBjcmVhdGVSZXNwb25zZSh7IGVycm9yOiAnSXRlbSBub3QgZm91bmQnIH0sIDQwNCk7XHJcbiAgICB9XHJcbiAgICBcclxuICAgIHJldHVybiBjcmVhdGVSZXNwb25zZShyZXN1bHRbMF0sIDIwMCk7XHJcbiAgfSBjYXRjaCAoZXJyb3IpIHtcclxuICAgIGNvbnNvbGUuZXJyb3IoJ0Vycm9yIGZldGNoaW5nIGl0ZW06JywgZXJyb3IpO1xyXG4gICAgcmV0dXJuIGNyZWF0ZVJlc3BvbnNlKHsgZXJyb3I6ICdGYWlsZWQgdG8gZmV0Y2ggaXRlbScgfSwgNTAwKTtcclxuICB9XHJcbn07XHJcbiIsICIvLyBDT1JTIGhlYWRlcnMgZm9yIGFsbCBBUEkgcmVzcG9uc2VzXHJcbmV4cG9ydCBjb25zdCBjb3JzSGVhZGVycyA9IHtcclxuICAnQWNjZXNzLUNvbnRyb2wtQWxsb3ctT3JpZ2luJzogJyonLFxyXG4gICdBY2Nlc3MtQ29udHJvbC1BbGxvdy1NZXRob2RzJzogJ0dFVCwgUE9TVCwgUFVULCBERUxFVEUsIE9QVElPTlMnLFxyXG4gICdBY2Nlc3MtQ29udHJvbC1BbGxvdy1IZWFkZXJzJzogJ0NvbnRlbnQtVHlwZScsXHJcbiAgJ0NvbnRlbnQtVHlwZSc6ICdhcHBsaWNhdGlvbi9qc29uJ1xyXG59O1xyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIGNyZWF0ZVJlc3BvbnNlKGJvZHksIHN0YXR1cyA9IDIwMCkge1xyXG4gIHJldHVybiBuZXcgUmVzcG9uc2UoSlNPTi5zdHJpbmdpZnkoYm9keSksIHtcclxuICAgIHN0YXR1cyxcclxuICAgIGhlYWRlcnM6IGNvcnNIZWFkZXJzXHJcbiAgfSk7XHJcbn1cclxuIl0sCiAgIm1hcHBpbmdzIjogIjs7Ozs7Ozs7OztBQUFBLFNBQVMsWUFBWTs7O0FDQ2QsSUFBTSxjQUFjO0FBQUEsRUFDekIsK0JBQStCO0FBQUEsRUFDL0IsZ0NBQWdDO0FBQUEsRUFDaEMsZ0NBQWdDO0FBQUEsRUFDaEMsZ0JBQWdCO0FBQ2xCO0FBRU8sU0FBUyxlQUFlLE1BQU0sU0FBUyxLQUFLO0FBQ2pELFNBQU8sSUFBSSxTQUFTLEtBQUssVUFBVSxJQUFJLEdBQUc7QUFBQSxJQUN4QztBQUFBLElBQ0EsU0FBUztBQUFBLEVBQ1gsQ0FBQztBQUNIOzs7QURWQSxJQUFPLHlCQUFRLE9BQU8sS0FBSyxZQUFZO0FBRXJDLE1BQUksSUFBSSxXQUFXLFdBQVc7QUFDNUIsV0FBTyxJQUFJLFNBQVMsTUFBTSxFQUFFLFFBQVEsS0FBSyxTQUFTLFlBQVksQ0FBQztBQUFBLEVBQ2pFO0FBRUEsTUFBSTtBQUNGLFVBQU0sTUFBTSxJQUFJLElBQUksSUFBSSxHQUFHO0FBQzNCLFVBQU0sS0FBSyxJQUFJLGFBQWEsSUFBSSxJQUFJO0FBRXBDLFFBQUksQ0FBQyxJQUFJO0FBQ1AsYUFBTyxlQUFlLEVBQUUsT0FBTyx3QkFBd0IsR0FBRyxHQUFHO0FBQUEsSUFDL0Q7QUFFQSxVQUFNLE1BQU0sS0FBSyxRQUFRLElBQUksWUFBWTtBQUN6QyxVQUFNLFNBQVMsTUFBTSw4SUFBOEksRUFBRTtBQUVySyxRQUFJLE9BQU8sV0FBVyxHQUFHO0FBQ3ZCLGFBQU8sZUFBZSxFQUFFLE9BQU8saUJBQWlCLEdBQUcsR0FBRztBQUFBLElBQ3hEO0FBRUEsV0FBTyxlQUFlLE9BQU8sQ0FBQyxHQUFHLEdBQUc7QUFBQSxFQUN0QyxTQUFTLE9BQU87QUFDZCxZQUFRLE1BQU0sd0JBQXdCLEtBQUs7QUFDM0MsV0FBTyxlQUFlLEVBQUUsT0FBTyx1QkFBdUIsR0FBRyxHQUFHO0FBQUEsRUFDOUQ7QUFDRjsiLAogICJuYW1lcyI6IFtdCn0K
