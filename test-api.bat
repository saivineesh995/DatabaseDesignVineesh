@REM Parking Lot API Testing with curl
@REM Make sure netlify dev is running on port 8888

@echo off
setlocal enabledelayedexpansion

set API_BASE=http://localhost:8888/.netlify/functions
set PAUSE_TIME=2

echo.
echo ====================================
echo Parking Lot API - CURL Testing
echo ====================================
echo.

REM Test 1: GET all items
echo [1] Testing GET all items...
curl "%API_BASE%/get-items"
echo.
timeout /t %PAUSE_TIME% >nul
echo.

REM Test 2: GET item by ID (assuming ID=1 exists)
echo [2] Testing GET item by ID (id=1)...
curl "%API_BASE%/get-item-by-id?id=1"
echo.
timeout /t %PAUSE_TIME% >nul
echo.

REM Test 3: POST create new spot
echo [3] Testing POST - Create new parking spot...
curl -X POST "%API_BASE%/create-item" ^
  -H "Content-Type: application/json" ^
  -d "{\"spot_number\":10, \"floor_number\":2, \"status\":\"available\", \"vehicle_license_plate\":\"TEST001\", \"customer_id\":null}"
echo.
timeout /t %PAUSE_TIME% >nul
echo.

REM Test 4: PUT update spot (modify if needed)
echo [4] Testing PUT - Update parking spot...
curl -X PUT "%API_BASE%/update-item?id=1" ^
  -H "Content-Type: application/json" ^
  -d "{\"status\":\"occupied\", \"vehicle_license_plate\":\"XYZ789\"}"
echo.
timeout /t %PAUSE_TIME% >nul
echo.

REM Test 5: DELETE spot (use with caution)
echo [5] Testing DELETE - Delete parking spot...
echo WARNING: This will delete the spot. Press Ctrl+C to cancel.
timeout /t 3 >nul
REM curl -X DELETE "%API_BASE%/delete-item?id=1"
echo Delete test skipped. Uncomment the curl command above to actually delete.
echo.

echo.
echo ====================================
echo Testing Complete!
echo ====================================
echo.
pause
