# 🛠️ Book Management - Backend

**This is the backend for the **Book Management ** application, which provides **authentication, loggin stores user book list, user can edit, delete and add new books**.

## 📌 Features
- ✅ JWT-based **authentication & authorization**
- ✅ MongoDB database for **persistent data storage**
- ✅ Secure API endpoints with **JWT middleware**

---

## 🚀 Installation & Setup

### **  Clone the Repository**
git clone https://github.com/your-repo-url.git
cd backend

# 1. Install Dependencies
npm install

# 2. Set Up Environment Variables
Create a .env file in the backend root directory:

NODE_ENV=development

PORT=5000

MONGODB_URI=your-mongodb-string

JWT_SECRET=your-secret-key

# 3. Run the Server
npm run dev
The server runs on http://localhost:5000.

## 🛠 Built With
Node.js - Backend runtime

Express.js - API framework

MongoDB - Lightweight database

jsonwebtoken - Secure authentication