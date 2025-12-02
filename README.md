# Parking Lot Management System

A full-stack web application for managing parking lot availability using Neon PostgreSQL, Netlify Functions, and a responsive frontend.

## 🚀 Live Demo
**Live Site:** https://databasedesignvineesh.netlify.app

## 📊 Database Schema
**Database:** Neon PostgreSQL
**Main Table:** `availability`

### Availability Table Structure:
- `availability_id` (Primary Key)
- `spot_number` (Integer)
- `floor_number` (Integer)
- `status` (VARCHAR) - 'available' or 'occupied'
- `vehicle_license_plate` (VARCHAR)
- `customer_id` (Integer, Foreign Key)

## 🔌 API Endpoints

### 1. Get All Parking Spots
**Endpoint:** `GET /.netlify/functions/get-items`
**Description:** Retrieves all parking spots ordered by spot number
**Response:**
```json
[
  {
    "availability_id": 1,
    "spot_number": 1,
    "floor_number": 1,
    "status": "occupied",
    "vehicle_license_plate": "ABC123",
    "customer_id": 1
  }
]
```

### 2. Get Parking Spot by ID
**Endpoint:** `GET /.netlify/functions/get-item-by-id?id={availability_id}`
**Description:** Retrieves a single parking spot by its ID
**Parameters:** 
- `id` (required) - The availability_id
**Response:**
```json
{
  "availability_id": 1,
  "spot_number": 1,
  "floor_number": 1,
  "status": "occupied",
  "vehicle_license_plate": "ABC123",
  "customer_id": 1
}
```

### 3. Create New Parking Spot
**Endpoint:** `POST /.netlify/functions/create-item`
**Description:** Creates a new parking spot entry
**Request Body:**
```json
{
  "spot_number": 10,
  "floor_number": 2,
  "status": "available",
  "vehicle_license_plate": "XYZ789",
  "customer_id": null
}
```
**Response:** Returns the created spot with status 201

### 4. Update Parking Spot
**Endpoint:** `PUT /.netlify/functions/update-item?id={availability_id}`
**Description:** Updates an existing parking spot
**Parameters:**
- `id` (required) - The availability_id
**Request Body:** (all fields optional)
```json
{
  "status": "occupied",
  "vehicle_license_plate": "NEW123",
  "customer_id": 5
}
```
**Response:** Returns the updated spot

### 5. Delete Parking Spot
**Endpoint:** `DELETE /.netlify/functions/delete-item?id={availability_id}`
**Description:** Deletes a parking spot entry
**Parameters:**
- `id` (required) - The availability_id
**Response:**
```json
{
  "message": "Item deleted successfully"
}
```

## 🛠️ Technologies Used
- **Frontend:** HTML, CSS, JavaScript
- **Backend:** Netlify Serverless Functions (Node.js)
- **Database:** Neon PostgreSQL (Serverless)
- **Database Driver:** @neondatabase/serverless
- **Hosting:** Netlify

## 📦 Installation & Local Development

### Prerequisites
- Node.js installed
- Netlify CLI installed: `npm install -g netlify-cli`
- Neon PostgreSQL database

### Setup
1. Clone the repository:
```bash
git clone https://github.com/saivineesh995/DatabaseDesignVineesh.git
cd my-database-frontend
```

2. Install dependencies:
```bash
npm install
```

3. Create `.env` file:
```
DATABASE_URL=your_neon_connection_string
```

4. Run locally:
```bash
netlify dev
```

5. Open browser to `http://localhost:8888`

## 🔒 Security Features
- Parameterized queries to prevent SQL injection
- Environment variables for database credentials
- CORS headers configured
- Input validation on all endpoints

## 📁 Project Structure
```
my-database-frontend/
├── netlify/
│   └── functions/
│       ├── get-items.mjs
│       ├── get-item-by-id.mjs
│       ├── create-item.mjs
│       ├── update-item.mjs
│       ├── delete-item.mjs
│       └── utils.mjs
├── public/
│   └── index.html
├── netlify.toml
├── package.json
└── README.md
```

## 👨‍💻 Author
Sai Vineesh

## 📝 License
ISC
