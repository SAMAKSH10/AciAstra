Learning Platform
A full-stack learning platform that provides users with access to courses and blog content. The platform allows admins to create and manage courses and blogs, with real-time updates to the frontend interface.

Table of Contents
Project Overview
Features
Tech Stack
Installation
Backend
Frontend
Usage
API Endpoints
Environment Variables
Folder Structure
Contributing
License
Project Overview
This project provides a user-friendly platform where users can view courses and read blog posts. It includes an admin section to add, edit, or delete content for both courses and blogs. All data is stored in a MySQL database, and the frontend is dynamically updated using React with data fetched from a RESTful API.

Features
User Features
View Courses: Browse featured courses with discounts.
Read Blogs: Access the latest blog posts with details such as publication date and author.
Admin Features
Create and Edit Courses: Admins can add or modify course information via an intuitive form.
Manage Blogs: Easily create and update blog posts, including titles, descriptions, and publish dates.
Auto-Update: The frontend updates dynamically whenever new data is added to the backend.
Tech Stack
Frontend: React, Tailwind CSS, Vite
Backend: Node.js, Express, MySQL
Database: MySQL
Deployment: Nginx (for deployment) or similar web server
Installation
To run this project locally, follow these steps for both the backend and frontend setups.

Backend
Clone the repository:

bash
Copy code
git clone <repository-url>
cd backend
Install dependencies:

bash
Copy code
npm install
Set up the database:

Ensure MySQL is installed, and create a database for the project. Run the following SQL command to set up the blogs table:

sql
Copy code
CREATE TABLE blogs (
  id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  content TEXT NOT NULL,
  author VARCHAR(255),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
Add similar commands for the courses table if needed.

Environment variables:

Create a .env file in the backend directory and add the following variables:

env
Copy code
DB_HOST=localhost
DB_USER=<your_mysql_user>
DB_PASSWORD=<your_mysql_password>
DB_NAME=<your_database_name>
PORT=5000
Run the server:

bash
Copy code
npm start
The server will start on http://localhost:5000.

Frontend
Navigate to the frontend directory:

bash
Copy code
cd ../frontend
Install dependencies:

bash
Copy code
npm install
Environment variables:

Create a .env file in the frontend directory and add the following variables:

env
Copy code
VITE_BLOG_API_URL=http://localhost:5000/api/blogs
VITE_COURSE_URL=http://localhost:5000/api/courses
Run the development server:

bash
Copy code
npm run dev
The application will start on http://localhost:3000.

Usage
Access the platform via the frontend URL (e.g., http://localhost:3000).
Browse courses and blogs as a user.
To manage courses and blogs, access the admin section and use the provided forms.
API Endpoints
The backend API provides the following endpoints:

Blog Endpoints
GET /api/blogs: Retrieve all blog posts.
POST /api/blogs: Create a new blog post.
PUT /api/blogs/:id: Update an existing blog post.
DELETE /api/blogs/:id: Delete a blog post.
Course Endpoints
GET /api/courses: Retrieve all courses.
POST /api/courses: Create a new course.
PUT /api/courses/:id: Update an existing course.
DELETE /api/courses/:id: Delete a course.
Environment Variables
Ensure you have configured the following environment variables:

Variable	Description
DB_HOST	MySQL database host
DB_USER	MySQL username
DB_PASSWORD	MySQL password
DB_NAME	Database name
PORT	Server port (default: 5000)
VITE_BLOG_API_URL	API endpoint for blogs
VITE_COURSE_URL	API endpoint for courses
Folder Structure
arduino
Copy code
project-root
├── backend
│   ├── controllers
│   ├── models
│   ├── routes
│   ├── .env
│   └── server.js
├── frontend
│   ├── public
│   ├── src
│   │   ├── components
│   │   ├── pages
│   │   ├── App.js
│   │   └── index.js
│   ├── .env
│   └── vite.config.js
└── README.md
Contributing
Contributions are welcome! Feel free to submit issues, fork the repository, and create pull requests.

Fork the Project
Create your Feature Branch (git checkout -b feature/AmazingFeature)
Commit your Changes (git commit -m 'Add some AmazingFeature')
Push to the Branch (git push origin feature/AmazingFeature)
Open a Pull Request
License
Distributed under the MIT License. See LICENSE for more information.






