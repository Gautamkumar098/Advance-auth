# 🔐 Advanced MERN Authentication System

A production-ready authentication system built with the MERN Stack featuring JWT Authentication, Email Verification, Password Reset, Protected Routes, Profile Management, and a modern responsive UI.

---

## 🌟 Features

### 🔑 Authentication

- User Registration
- Secure User Login
- User Logout
- JWT Authentication
- HTTP-Only Cookie Authentication
- Protected Routes
- Check Authentication Endpoint

### 📧 Email System

- Email Verification
- Welcome Email
- Forgot Password Email
- Password Reset Email

### 👤 User Dashboard

- Profile Information
- Profile Photo Upload
- Edit Profile
- Account Activity
- Last Login Tracking
- Join Date

### 🎨 UI Features

- Responsive Design
- Dark / Light Theme
- Beautiful Animations (Framer Motion)
- Password Strength Meter
- Toast Notifications
- Loading Spinner

---

# 🚀 Tech Stack

## Frontend

- React
- Vite
- Zustand
- React Router DOM
- Axios
- Tailwind CSS
- Framer Motion
- Lucide React
- React Hot Toast

## Backend

- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT
- bcryptjs
- Cookie Parser
- CORS
- dotenv

---

# 📂 Folder Structure

```
Advance-auth
│
├── backend
│   ├── config
│   ├── controllers
│   ├── middleware
│   ├── models
│   ├── routes
│   ├── utils
│   ├── package.json
│   └── index.js
│
├── frontend
│   ├── public
│   ├── src
│   │   ├── components
│   │   ├── pages
│   │   ├── store
│   │   ├── utils
│   │   └── App.jsx
│   └── package.json
│
└── README.md
```

---

# 📚 Project Flow

- ✔ Backend Setup
- ✔ Database Setup
- ✔ Signup Endpoint
- ✔ Sending Verify Account Email
- ✔ Verify Email Endpoint
- ✔ Welcome Email Template
- ✔ Logout Endpoint
- ✔ Login Endpoint
- ✔ Forgot Password Endpoint
- ✔ Reset Password Endpoint
- ✔ Check Authentication Endpoint
- ✔ Frontend Setup
- ✔ Signup Page UI
- ✔ Login Page UI
- ✔ Email Verification UI
- ✔ Signup Integration
- ✔ Email Verification Integration
- ✔ Protected Routes
- ✔ Login Integration
- ✔ Dashboard Page
- ✔ Forgot Password Integration
- ✔ Production Deployment

---

# 🔄 Authentication Flow

```
Signup
   │
   ▼
Verification Email
   │
   ▼
Verify Email
   │
   ▼
Login
   │
   ▼
JWT Cookie Generated
   │
   ▼
Protected Dashboard
   │
   ▼
Logout
```

---

# 🖼 Screenshots

## Signup Page

<img width="801" height="872" alt="image" src="https://github.com/user-attachments/assets/e67abd31-856b-492a-a359-0e960ba8990b" />


---

## Login Page

<img width="752" height="646" alt="image" src="https://github.com/user-attachments/assets/382aa195-927b-43f1-b77a-c7218d73c8ad" />


---

## Email Verification

<img width="707" height="522" alt="Screenshot 2026-06-27 002720" src="https://github.com/user-attachments/assets/48d7af49-8097-4449-bbce-147ce2e23d48" />
<img width="602" height="517" alt="image" src="https://github.com/user-attachments/assets/ee85dddf-28d4-4232-ac5c-48c5317b08a1" />



---

## Forgot Password

<img width="832" height="632" alt="image" src="https://github.com/user-attachments/assets/72c2f5c5-e328-4544-a896-5a757a2b7019" />


---

## Reset Password

<img width="730" height="473" alt="Screenshot 2026-06-27 003216" src="https://github.com/user-attachments/assets/0a815634-7a0d-42eb-b39a-3b9b20a8d3f6" />


---

## Dashboard

<img width="974" height="846" alt="Screenshot 2026-06-27 003116" src="https://github.com/user-attachments/assets/786a59a0-8d73-4eed-8c66-766d69e6491c" />


---

# ⚙ Installation

## Clone Repository

```bash
git clone https://github.com/Gautamkumar098/Advance-auth.git
```

---

## Install Backend

```bash
cd backend
npm install
```

---

## Install Frontend

```bash
cd frontend
npm install
```

---

## Run Backend

```bash
npm run dev
```

---

## Run Frontend

```bash
npm run dev
```

---

# 🌍 Environment Variables

## Backend (.env)

```env
PORT=5000

MONGO_URI=

JWT_SECRET_KEY=

CLIENT_URL=

MAILTRAP_TOKEN=

MAILTRAP_ENDPOINT=

NODE_ENV=development
```

---

## Frontend (.env)

```env
VITE_API_URL=http://localhost:5000/api/auth
```

---

# 🚀 Deployment

### Frontend

- Vercel

### Backend

- Render

### Database

- MongoDB Atlas

---

# 🔒 Security Features

- JWT Authentication
- HTTP Only Cookies
- Password Hashing (bcrypt)
- Email Verification
- Secure Password Reset
- Protected Routes
- Environment Variables
- CORS Protection

---

# 📌 Future Improvements

- Google Authentication
- GitHub Authentication
- Two Factor Authentication
- Refresh Token Rotation
- Cloudinary Image Upload
- Admin Dashboard
- User Roles
- Account Delete
- Email Change Verification
- Session Management

---

# 📈 Project Status

✅ Backend Completed

✅ Frontend Completed

✅ Authentication Completed

✅ Email Verification Completed

✅ Forgot Password Completed

✅ Dashboard Completed

✅ Ready for Deployment

---

# 🤝 Contributing

Pull requests are welcome.

For major changes, please open an issue first to discuss your ideas.

---

# 👨‍💻 Author

**Gautam Kumar**

GitHub:
https://github.com/Gautamkumar098

---

# ⭐ Support

If you found this project helpful, please consider giving it a ⭐ on GitHub.
