# 🍽️ Mini Recipe Book

**Mini Recipe Book** is a full-stack web application for discovering recipes, managing favorites, and interacting with users through authentication and email contact forms.

The project demonstrates frontend–backend integration, REST API design, authentication, role-based access, and deployment.

---

## 👥 Team

**Team Mini Recipe Book**

- Asem  
- Gulzada  
- Anel  
- Miras  

---

## 🚀 Features

### 🔐 Authentication
- User registration
- User login
- JWT-based authentication
- Logout
- Protected routes
- Role support (`user`, `admin`)

### 🍲 Recipes
- Fetch recipes from external API (TheMealDB)
- Search recipes by name
- Display recipes with images and categories
- Category pages (Breakfast, Lunch, Dinner, Desserts)

### ⭐ Favorites
- Add recipes to favorites (authorized users only)
- Favorites stored in MongoDB
- JWT-protected endpoints

### 📧 Contact Form
- Contact form connected to backend
- Email sending via SMTP (Nodemailer)
- Form validation on frontend

### 🎨 UI / UX
- Responsive design (Bootstrap 5)
- Custom CSS styling
- Dark / Light mode
- Greeting banner
- Dynamic navbar based on authentication state

---

## 🛠️ Tech Stack

### Frontend
- HTML5
- CSS3
- JavaScript (Vanilla)
- Bootstrap 5

### Backend
- Node.js
- Express.js
- MongoDB + Mongoose
- JWT (jsonwebtoken)
- Nodemailer
- CORS

### External API
- [TheMealDB API](https://www.themealdb.com/api.php)

---

## 📁 Project Structure

project-root/
│
├── server/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── server.js
│   └── .env
│
├── index.html
├── auth.html
├── about.html
├── contact.html
├── favorites.html
├── breakfast.html
├── lunch.html
├── dinner.html
├── desserts.html
│
├── style.css
├── script.js
├── auth.js
├── api.js
│
├── package.json
└── README.md


---

## ⚙️ Environment Variables

Create a `.env` file inside the `server` folder:

```env
PORT=5003
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret

SMTP_HOST=your_smtp_host
SMTP_PORT=587
SMTP_USER=your_email
SMTP_PASS=your_email_password
EMAIL_FROM=your_email

▶️ How to Run the Project Locally

1️⃣ Install dependencies
cd server
npm install

2️⃣ Start backend server
node server.js

Backend will run at:
http://localhost:5003

🔑 API Endpoints

Auth
	•	POST /api/auth/register
	•	POST /api/auth/login

Recipes
	•	GET /api/recipes
	•	POST /api/recipes (admin only)
	•	DELETE /api/recipes/:id (admin only)

Favorites
	•	POST /api/favorites
	•	GET /api/favorites

Email
	•	POST /api/email/send

⸻

🔒 Authorization Logic
	•	JWT token stored in localStorage
	•	Token sent via Authorization: Bearer <token>
	•	Navbar updates dynamically based on user login state
	•	Protected routes for favorites and admin actions

⸻

🌙 Dark Mode
	•	Toggle available in navbar
	•	State saved in localStorage
	•	Fully styled dark theme



🎓 Project Purpose

This project was developed as part of the Web Technologies / Backend Development course to demonstrate:
	•	RESTful API development
	•	Authentication & authorization
	•	Database integration
	•	Frontend and backend communication
	•	Real-world web application structure

	## Screenshots

### Home Page
Main page with navigation and recipe categories.
![Home Page](screenshots/home.png)

### Recipes Page
List of recipes with detailed view.
![Recipes](screenshots/about.png)

### Favorites
Users can save favorite recipes.
![Favorites](screenshots/favorites.png)

### Contact Form
Contact form with email integration using Nodemailer.
![Contact](screenshots/contact.png)