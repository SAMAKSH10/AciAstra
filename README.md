# Learning Platform

A full-stack learning platform providing users with access to courses and blog content. The platform includes an admin section for managing content with real-time updates to the frontend interface.

## Table of Contents

- [Project Overview](#project-overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Installation](#installation)
  - [Backend](#backend)
  - [Frontend](#frontend)
- [Usage](#usage)
- [API Endpoints](#api-endpoints)
- [Environment Variables](#environment-variables)
- [Folder Structure](#folder-structure)
- [Contributing](#contributing)
- [License](#license)

---

## Project Overview

This project provides a platform where users can view courses and read blog posts. Admins can create, edit, or delete content for both courses and blogs, with all data stored in a MySQL database. The frontend updates dynamically using React and data fetched from a RESTful API.

## Features

### User Features
- **View Courses**: Browse featured courses with discounts.
- **Read Blogs**: Access blog posts with details like publication date and author.

### Admin Features
- **Create and Edit Courses**: Add or modify course details.
- **Manage Blogs**: Create and update blog posts with title, description, and publish date.
- **Auto-Update**: Frontend dynamically updates when new data is added.

## Tech Stack

- **Frontend**: React, Tailwind CSS, Vite
- **Backend**: Node.js, Express, MySQL
- **Database**: MySQL

---

## Installation

To run this project locally, follow these setup steps for the backend and frontend.

### Backend

1. **Clone the repository**:

   ```bash
   git clone <repository-url>
   cd backend
