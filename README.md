# 📝 Service Review System

A full-featured web application where users can browse services, read and write reviews, rate services, and manage their own content securely using Firebase authentication.

🔗 **Live Demo**: [https://review-system-app.web.app/](https://review-system-app.web.app/)

---

## 🚀 Features

- 🔐 Firebase Authentication (Google login)
- 🌐 Browse all available services
- 🔍 Filter and search services by category or keywords
- ⭐ Submit reviews with ratings
- 📄 View detailed service info and associated reviews
- ✍️ Add, update, and delete your reviews
- 🧑‍💼 User profile page with their data
- 🎨 Beautiful and responsive UI using Tailwind CSS
- ✅ Protected routes using `react-router`
- 🍭 Animations with Framer Motion and Lottie
- 📢 Toast notifications using React Toastify
- 🧠 Real-time dynamic average ratings for each service

---

## 🛠️ Technologies Used

| Frontend                | Backend    |
| ----------------------- | ---------- |
| React 19                | Node.js    |
| React Router v7         | Express.js |
| Tailwind CSS            | MongoDB    |
| Firebase Authentication |            |
| Axios                   |            |

Other Libraries:

- `react-icons`
- `react-helmet-async`
- `sweetalert2`
- `lottie-react`
- `framer-motion`
- `nanoid`
- `react-toastify`
- `react-countup`
- `react-intersection-observer`

---

## 📦 Project Structure

```
client/
├── src/
│ ├── components/ # Reusable components
│ ├── pages/ # All pages (Home, Services, Profile, etc.)
│ ├── routes/ # React Router setup
│ ├── hooks/ # Custom hooks like useAuth
│ ├── assets/ # Images, animations (Lottie), etc.
│ ├── App.jsx
│ └── main.jsx
server/
├── index.js # Main Express server
├── routes/ # API endpoints (services, reviews)
├── controllers/ # Controller logic for routes
├── db.js # MongoDB connection
└── .env
```

## 🙏 Credits

This project was developed as part of a full-stack assignment. Special thanks to the community and open-source libraries that made it possible.

## Creator

Anayet
