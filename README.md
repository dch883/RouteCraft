# RouteCraft: Regional Day-Trip Planner

**Author:** H.M.D.C. Herath (Reg: E2410120)  
**Institution:** University of Moratuwa, Sri Lanka  
**Scope:** 25 km Perimeter around Kiniyama, Sri Lanka (7°39'36.8"N, 80°00'17.9"E)  


### How to Run This Project

1. Install dependencies:
   npm install

2. Create .env file from .env.example:
   - Copy .env.example and rename copy to .env
   - Fill your local database details and session secret
   - Example .env format:
     PORT=3000
     DB_HOST=localhost
     DB_PORT=3306
     DB_USER=root
     DB_PASSWORD=
     DB_NAME=routecraft_db

3. Import the database:
   - Import the SQL file from /database folder to MySQL (routecraft_db)

4. Run the project:
   npm start
   Project will run on http://localhost:3000

### Project Structure
- assets - Project assets
- database - Database SQL dump
- public - Public files
- src - Source code
- .env.example - Environment variables template
- package.json - Dependencies

### Default Credentials for Evaluation

* **Admin Portal Login:**
  * **Username:** `admin`
  * **Password:** `Admin@RouteCraft2026`