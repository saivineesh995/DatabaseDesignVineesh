
import {createRequire as ___nfyCreateRequire} from "module";
import {fileURLToPath as ___nfyFileURLToPath} from "url";
import {dirname as ___nfyPathDirname} from "path";
let __filename=___nfyFileURLToPath(import.meta.url);
let __dirname=___nfyPathDirname(___nfyFileURLToPath(import.meta.url));
let require=___nfyCreateRequire(import.meta.url);


// netlify/functions/update-item.mjs
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

// netlify/functions/update-item.mjs
var update_item_default = async (req, context) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { status: 204, headers: corsHeaders });
  }
  try {
    if (req.method !== "PUT") {
      return createResponse({ error: "Method not allowed" }, 405);
    }
    const url = new URL(req.url);
    const id = url.searchParams.get("id");
    if (!id) {
      return createResponse({ error: "ID parameter required" }, 400);
    }
    const body = await req.json();
    if (Object.keys(body).length === 0) {
      return createResponse({ error: "No fields to update" }, 400);
    }
    const sql = neon(process.env.DATABASE_URL);
    let result;
    const allowedFields = ["spot_number", "floor_number", "status", "vehicle_license_plate", "customer_id"];
    const updateFields = Object.keys(body).filter((field) => allowedFields.includes(field));
    if (updateFields.length === 0) {
      return createResponse({ error: "No valid fields to update" }, 400);
    }
    if (updateFields.length === 1) {
      const field = updateFields[0];
      const value = body[field];
      if (field === "spot_number") {
        result = await sql`UPDATE availability SET spot_number = ${value} WHERE availability_id = ${id} RETURNING *`;
      } else if (field === "floor_number") {
        result = await sql`UPDATE availability SET floor_number = ${value} WHERE availability_id = ${id} RETURNING *`;
      } else if (field === "status") {
        result = await sql`UPDATE availability SET status = ${value} WHERE availability_id = ${id} RETURNING *`;
      } else if (field === "vehicle_license_plate") {
        result = await sql`UPDATE availability SET vehicle_license_plate = ${value} WHERE availability_id = ${id} RETURNING *`;
      } else if (field === "customer_id") {
        result = await sql`UPDATE availability SET customer_id = ${value} WHERE availability_id = ${id} RETURNING *`;
      }
    } else if (updateFields.length === 2) {
      const field1 = updateFields[0];
      const field2 = updateFields[1];
      const value1 = body[field1];
      const value2 = body[field2];
      if (field1 === "status" && field2 === "vehicle_license_plate" || field1 === "vehicle_license_plate" && field2 === "status") {
        result = await sql`UPDATE availability SET status = ${body.status}, vehicle_license_plate = ${body.vehicle_license_plate} WHERE availability_id = ${id} RETURNING *`;
      } else if (field1 === "status" && field2 === "customer_id" || field1 === "customer_id" && field2 === "status") {
        result = await sql`UPDATE availability SET status = ${body.status}, customer_id = ${body.customer_id} WHERE availability_id = ${id} RETURNING *`;
      } else {
        result = await sql`UPDATE availability SET ${field1} = ${value1}, ${field2} = ${value2} WHERE availability_id = ${id} RETURNING *`;
      }
    } else {
      result = await sql`UPDATE availability SET 
        spot_number = COALESCE(${updateFields.includes("spot_number") ? body.spot_number : null}, spot_number),
        floor_number = COALESCE(${updateFields.includes("floor_number") ? body.floor_number : null}, floor_number),
        status = COALESCE(${updateFields.includes("status") ? body.status : null}, status),
        vehicle_license_plate = COALESCE(${updateFields.includes("vehicle_license_plate") ? body.vehicle_license_plate : null}, vehicle_license_plate),
        customer_id = COALESCE(${updateFields.includes("customer_id") ? body.customer_id : null}, customer_id)
        WHERE availability_id = ${id} RETURNING *`;
    }
    if (result.length === 0) {
      return createResponse({ error: "Item not found" }, 404);
    }
    return createResponse(result[0], 200);
  } catch (error) {
    console.error("Error updating item:", error);
    return createResponse({ error: "Failed to update item" }, 500);
  }
};
export {
  update_item_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsibmV0bGlmeS9mdW5jdGlvbnMvdXBkYXRlLWl0ZW0ubWpzIiwgIm5ldGxpZnkvZnVuY3Rpb25zL3V0aWxzLm1qcyJdLAogICJzb3VyY2VzQ29udGVudCI6IFsiaW1wb3J0IHsgbmVvbiB9IGZyb20gJ0BuZW9uZGF0YWJhc2Uvc2VydmVybGVzcyc7XHJcbmltcG9ydCB7IGNvcnNIZWFkZXJzLCBjcmVhdGVSZXNwb25zZSB9IGZyb20gJy4vdXRpbHMubWpzJztcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGFzeW5jIChyZXEsIGNvbnRleHQpID0+IHtcclxuICAvLyBIYW5kbGUgcHJlZmxpZ2h0IHJlcXVlc3RzXHJcbiAgaWYgKHJlcS5tZXRob2QgPT09ICdPUFRJT05TJykge1xyXG4gICAgcmV0dXJuIG5ldyBSZXNwb25zZShudWxsLCB7IHN0YXR1czogMjA0LCBoZWFkZXJzOiBjb3JzSGVhZGVycyB9KTtcclxuICB9XHJcblxyXG4gIHRyeSB7XHJcbiAgICBpZiAocmVxLm1ldGhvZCAhPT0gJ1BVVCcpIHtcclxuICAgICAgcmV0dXJuIGNyZWF0ZVJlc3BvbnNlKHsgZXJyb3I6ICdNZXRob2Qgbm90IGFsbG93ZWQnIH0sIDQwNSk7XHJcbiAgICB9XHJcbiAgICBcclxuICAgIGNvbnN0IHVybCA9IG5ldyBVUkwocmVxLnVybCk7XHJcbiAgICBjb25zdCBpZCA9IHVybC5zZWFyY2hQYXJhbXMuZ2V0KCdpZCcpO1xyXG4gICAgXHJcbiAgICBpZiAoIWlkKSB7XHJcbiAgICAgIHJldHVybiBjcmVhdGVSZXNwb25zZSh7IGVycm9yOiAnSUQgcGFyYW1ldGVyIHJlcXVpcmVkJyB9LCA0MDApO1xyXG4gICAgfVxyXG4gICAgXHJcbiAgICBjb25zdCBib2R5ID0gYXdhaXQgcmVxLmpzb24oKTtcclxuICAgIFxyXG4gICAgLy8gVmFsaWRhdGUgdGhhdCBhdCBsZWFzdCBvbmUgZmllbGQgaXMgcHJvdmlkZWQgZm9yIHVwZGF0ZVxyXG4gICAgaWYgKE9iamVjdC5rZXlzKGJvZHkpLmxlbmd0aCA9PT0gMCkge1xyXG4gICAgICByZXR1cm4gY3JlYXRlUmVzcG9uc2UoeyBlcnJvcjogJ05vIGZpZWxkcyB0byB1cGRhdGUnIH0sIDQwMCk7XHJcbiAgICB9XHJcbiAgICBcclxuICAgIGNvbnN0IHNxbCA9IG5lb24ocHJvY2Vzcy5lbnYuREFUQUJBU0VfVVJMKTtcclxuICAgIGxldCByZXN1bHQ7XHJcbiAgICBcclxuICAgIC8vIEJ1aWxkIHF1ZXJ5IGJhc2VkIG9uIHByb3ZpZGVkIGZpZWxkc1xyXG4gICAgY29uc3QgYWxsb3dlZEZpZWxkcyA9IFsnc3BvdF9udW1iZXInLCAnZmxvb3JfbnVtYmVyJywgJ3N0YXR1cycsICd2ZWhpY2xlX2xpY2Vuc2VfcGxhdGUnLCAnY3VzdG9tZXJfaWQnXTtcclxuICAgIGNvbnN0IHVwZGF0ZUZpZWxkcyA9IE9iamVjdC5rZXlzKGJvZHkpLmZpbHRlcihmaWVsZCA9PiBhbGxvd2VkRmllbGRzLmluY2x1ZGVzKGZpZWxkKSk7XHJcbiAgICBcclxuICAgIGlmICh1cGRhdGVGaWVsZHMubGVuZ3RoID09PSAwKSB7XHJcbiAgICAgIHJldHVybiBjcmVhdGVSZXNwb25zZSh7IGVycm9yOiAnTm8gdmFsaWQgZmllbGRzIHRvIHVwZGF0ZScgfSwgNDAwKTtcclxuICAgIH1cclxuICAgIFxyXG4gICAgLy8gSGFuZGxlIGR5bmFtaWMgVVBEQVRFIC0gdXNlIGNvbmRpdGlvbmFsIHVwZGF0ZXNcclxuICAgIGlmICh1cGRhdGVGaWVsZHMubGVuZ3RoID09PSAxKSB7XHJcbiAgICAgIGNvbnN0IGZpZWxkID0gdXBkYXRlRmllbGRzWzBdO1xyXG4gICAgICBjb25zdCB2YWx1ZSA9IGJvZHlbZmllbGRdO1xyXG4gICAgICBcclxuICAgICAgaWYgKGZpZWxkID09PSAnc3BvdF9udW1iZXInKSB7XHJcbiAgICAgICAgcmVzdWx0ID0gYXdhaXQgc3FsYFVQREFURSBhdmFpbGFiaWxpdHkgU0VUIHNwb3RfbnVtYmVyID0gJHt2YWx1ZX0gV0hFUkUgYXZhaWxhYmlsaXR5X2lkID0gJHtpZH0gUkVUVVJOSU5HICpgO1xyXG4gICAgICB9IGVsc2UgaWYgKGZpZWxkID09PSAnZmxvb3JfbnVtYmVyJykge1xyXG4gICAgICAgIHJlc3VsdCA9IGF3YWl0IHNxbGBVUERBVEUgYXZhaWxhYmlsaXR5IFNFVCBmbG9vcl9udW1iZXIgPSAke3ZhbHVlfSBXSEVSRSBhdmFpbGFiaWxpdHlfaWQgPSAke2lkfSBSRVRVUk5JTkcgKmA7XHJcbiAgICAgIH0gZWxzZSBpZiAoZmllbGQgPT09ICdzdGF0dXMnKSB7XHJcbiAgICAgICAgcmVzdWx0ID0gYXdhaXQgc3FsYFVQREFURSBhdmFpbGFiaWxpdHkgU0VUIHN0YXR1cyA9ICR7dmFsdWV9IFdIRVJFIGF2YWlsYWJpbGl0eV9pZCA9ICR7aWR9IFJFVFVSTklORyAqYDtcclxuICAgICAgfSBlbHNlIGlmIChmaWVsZCA9PT0gJ3ZlaGljbGVfbGljZW5zZV9wbGF0ZScpIHtcclxuICAgICAgICByZXN1bHQgPSBhd2FpdCBzcWxgVVBEQVRFIGF2YWlsYWJpbGl0eSBTRVQgdmVoaWNsZV9saWNlbnNlX3BsYXRlID0gJHt2YWx1ZX0gV0hFUkUgYXZhaWxhYmlsaXR5X2lkID0gJHtpZH0gUkVUVVJOSU5HICpgO1xyXG4gICAgICB9IGVsc2UgaWYgKGZpZWxkID09PSAnY3VzdG9tZXJfaWQnKSB7XHJcbiAgICAgICAgcmVzdWx0ID0gYXdhaXQgc3FsYFVQREFURSBhdmFpbGFiaWxpdHkgU0VUIGN1c3RvbWVyX2lkID0gJHt2YWx1ZX0gV0hFUkUgYXZhaWxhYmlsaXR5X2lkID0gJHtpZH0gUkVUVVJOSU5HICpgO1xyXG4gICAgICB9XHJcbiAgICB9IGVsc2UgaWYgKHVwZGF0ZUZpZWxkcy5sZW5ndGggPT09IDIpIHtcclxuICAgICAgY29uc3QgZmllbGQxID0gdXBkYXRlRmllbGRzWzBdO1xyXG4gICAgICBjb25zdCBmaWVsZDIgPSB1cGRhdGVGaWVsZHNbMV07XHJcbiAgICAgIGNvbnN0IHZhbHVlMSA9IGJvZHlbZmllbGQxXTtcclxuICAgICAgY29uc3QgdmFsdWUyID0gYm9keVtmaWVsZDJdO1xyXG4gICAgICBcclxuICAgICAgLy8gVGhpcyBpcyBhIHNpbXBsaWZpZWQgdmVyc2lvbiBmb3IgMiBmaWVsZHMgLSB5b3UgbWF5IHdhbnQgdG8gZXhwYW5kIGZvciBtb3JlIGNvbWJpbmF0aW9uc1xyXG4gICAgICBpZiAoKGZpZWxkMSA9PT0gJ3N0YXR1cycgJiYgZmllbGQyID09PSAndmVoaWNsZV9saWNlbnNlX3BsYXRlJykgfHwgXHJcbiAgICAgICAgICAoZmllbGQxID09PSAndmVoaWNsZV9saWNlbnNlX3BsYXRlJyAmJiBmaWVsZDIgPT09ICdzdGF0dXMnKSkge1xyXG4gICAgICAgIHJlc3VsdCA9IGF3YWl0IHNxbGBVUERBVEUgYXZhaWxhYmlsaXR5IFNFVCBzdGF0dXMgPSAke2JvZHkuc3RhdHVzfSwgdmVoaWNsZV9saWNlbnNlX3BsYXRlID0gJHtib2R5LnZlaGljbGVfbGljZW5zZV9wbGF0ZX0gV0hFUkUgYXZhaWxhYmlsaXR5X2lkID0gJHtpZH0gUkVUVVJOSU5HICpgO1xyXG4gICAgICB9IGVsc2UgaWYgKChmaWVsZDEgPT09ICdzdGF0dXMnICYmIGZpZWxkMiA9PT0gJ2N1c3RvbWVyX2lkJykgfHwgXHJcbiAgICAgICAgICAgICAgICAgKGZpZWxkMSA9PT0gJ2N1c3RvbWVyX2lkJyAmJiBmaWVsZDIgPT09ICdzdGF0dXMnKSkge1xyXG4gICAgICAgIHJlc3VsdCA9IGF3YWl0IHNxbGBVUERBVEUgYXZhaWxhYmlsaXR5IFNFVCBzdGF0dXMgPSAke2JvZHkuc3RhdHVzfSwgY3VzdG9tZXJfaWQgPSAke2JvZHkuY3VzdG9tZXJfaWR9IFdIRVJFIGF2YWlsYWJpbGl0eV9pZCA9ICR7aWR9IFJFVFVSTklORyAqYDtcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICAvLyBGYWxsYmFjayBmb3Igb3RoZXIgY29tYmluYXRpb25zXHJcbiAgICAgICAgcmVzdWx0ID0gYXdhaXQgc3FsYFVQREFURSBhdmFpbGFiaWxpdHkgU0VUICR7ZmllbGQxfSA9ICR7dmFsdWUxfSwgJHtmaWVsZDJ9ID0gJHt2YWx1ZTJ9IFdIRVJFIGF2YWlsYWJpbGl0eV9pZCA9ICR7aWR9IFJFVFVSTklORyAqYDtcclxuICAgICAgfVxyXG4gICAgfSBlbHNlIHtcclxuICAgICAgLy8gTW9yZSB0aGFuIDIgZmllbGRzIC0gdXBkYXRlIGFsbCBwcm92aWRlZCBmaWVsZHNcclxuICAgICAgcmVzdWx0ID0gYXdhaXQgc3FsYFVQREFURSBhdmFpbGFiaWxpdHkgU0VUIFxyXG4gICAgICAgIHNwb3RfbnVtYmVyID0gQ09BTEVTQ0UoJHt1cGRhdGVGaWVsZHMuaW5jbHVkZXMoJ3Nwb3RfbnVtYmVyJykgPyBib2R5LnNwb3RfbnVtYmVyIDogbnVsbH0sIHNwb3RfbnVtYmVyKSxcclxuICAgICAgICBmbG9vcl9udW1iZXIgPSBDT0FMRVNDRSgke3VwZGF0ZUZpZWxkcy5pbmNsdWRlcygnZmxvb3JfbnVtYmVyJykgPyBib2R5LmZsb29yX251bWJlciA6IG51bGx9LCBmbG9vcl9udW1iZXIpLFxyXG4gICAgICAgIHN0YXR1cyA9IENPQUxFU0NFKCR7dXBkYXRlRmllbGRzLmluY2x1ZGVzKCdzdGF0dXMnKSA/IGJvZHkuc3RhdHVzIDogbnVsbH0sIHN0YXR1cyksXHJcbiAgICAgICAgdmVoaWNsZV9saWNlbnNlX3BsYXRlID0gQ09BTEVTQ0UoJHt1cGRhdGVGaWVsZHMuaW5jbHVkZXMoJ3ZlaGljbGVfbGljZW5zZV9wbGF0ZScpID8gYm9keS52ZWhpY2xlX2xpY2Vuc2VfcGxhdGUgOiBudWxsfSwgdmVoaWNsZV9saWNlbnNlX3BsYXRlKSxcclxuICAgICAgICBjdXN0b21lcl9pZCA9IENPQUxFU0NFKCR7dXBkYXRlRmllbGRzLmluY2x1ZGVzKCdjdXN0b21lcl9pZCcpID8gYm9keS5jdXN0b21lcl9pZCA6IG51bGx9LCBjdXN0b21lcl9pZClcclxuICAgICAgICBXSEVSRSBhdmFpbGFiaWxpdHlfaWQgPSAke2lkfSBSRVRVUk5JTkcgKmA7XHJcbiAgICB9XHJcbiAgICBcclxuICAgIGlmIChyZXN1bHQubGVuZ3RoID09PSAwKSB7XHJcbiAgICAgIHJldHVybiBjcmVhdGVSZXNwb25zZSh7IGVycm9yOiAnSXRlbSBub3QgZm91bmQnIH0sIDQwNCk7XHJcbiAgICB9XHJcbiAgICBcclxuICAgIHJldHVybiBjcmVhdGVSZXNwb25zZShyZXN1bHRbMF0sIDIwMCk7XHJcbiAgfSBjYXRjaCAoZXJyb3IpIHtcclxuICAgIGNvbnNvbGUuZXJyb3IoJ0Vycm9yIHVwZGF0aW5nIGl0ZW06JywgZXJyb3IpO1xyXG4gICAgcmV0dXJuIGNyZWF0ZVJlc3BvbnNlKHsgZXJyb3I6ICdGYWlsZWQgdG8gdXBkYXRlIGl0ZW0nIH0sIDUwMCk7XHJcbiAgfVxyXG59O1xyXG4iLCAiLy8gQ09SUyBoZWFkZXJzIGZvciBhbGwgQVBJIHJlc3BvbnNlc1xyXG5leHBvcnQgY29uc3QgY29yc0hlYWRlcnMgPSB7XHJcbiAgJ0FjY2Vzcy1Db250cm9sLUFsbG93LU9yaWdpbic6ICcqJyxcclxuICAnQWNjZXNzLUNvbnRyb2wtQWxsb3ctTWV0aG9kcyc6ICdHRVQsIFBPU1QsIFBVVCwgREVMRVRFLCBPUFRJT05TJyxcclxuICAnQWNjZXNzLUNvbnRyb2wtQWxsb3ctSGVhZGVycyc6ICdDb250ZW50LVR5cGUnLFxyXG4gICdDb250ZW50LVR5cGUnOiAnYXBwbGljYXRpb24vanNvbidcclxufTtcclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBjcmVhdGVSZXNwb25zZShib2R5LCBzdGF0dXMgPSAyMDApIHtcclxuICByZXR1cm4gbmV3IFJlc3BvbnNlKEpTT04uc3RyaW5naWZ5KGJvZHkpLCB7XHJcbiAgICBzdGF0dXMsXHJcbiAgICBoZWFkZXJzOiBjb3JzSGVhZGVyc1xyXG4gIH0pO1xyXG59XHJcbiJdLAogICJtYXBwaW5ncyI6ICI7Ozs7Ozs7Ozs7QUFBQSxTQUFTLFlBQVk7OztBQ0NkLElBQU0sY0FBYztBQUFBLEVBQ3pCLCtCQUErQjtBQUFBLEVBQy9CLGdDQUFnQztBQUFBLEVBQ2hDLGdDQUFnQztBQUFBLEVBQ2hD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
