Live Link: https://www.urbantrendzmdl.com/
*MERN eCommerce Platform*

A full-featured, desktop-first responsive eCommerce application built with the MERN stack, offering secure authentication, product management, order lifecycle tracking, payment integration, and a modern UI.

---

## 🚀 Live Demo

[View the Live Demo](https://www.urbantrendzmdl.com/)

---

## 📝 Table of Contents

1. [Features](#features)
2. [Tech Stack](#tech-stack)
3. [Getting Started](#getting-started)

   * [Prerequisites](#prerequisites)
   * [Installation](#installation)
   * [Environment Variables](#environment-variables)
   * [Run the App](#run-the-app)
4. [Project Structure](#project-structure)
5. [Authentication](#authentication)
6. [API Endpoints](#api-endpoints)
7. [Admin Panel](#admin-panel)
8. [Payment Integration](#payment-integration)
9. [Image Uploads](#image-uploads)
10. [Future Improvements](#future-improvements)
11. [Contributing](#contributing)
12. [License](#license)

---

## ✨ Features

* *JWT Authentication*: Secure login, registration, logout flows with token storage and protected routes.
* *Google OAuth*: Third-party sign-in for convenience and security.
* *Role-Based Admin Panel*: Add/edit/delete products, manage orders, and view site statistics.
* *Product Catalog*: Browse, search, sort, and filter products by category, price range, ratings, and more.
* *Order Management*: Cart, checkout flow, order confirmation, tracking, and address management.
* *Review & Rating System*: Submit and display product reviews with aggregated average ratings.
* *Payment Gateways*:

  * PayPal Sandbox for testing.
  * Razorpay for secure live transactions.
* *Image Handling*: Upload and manage product images via Cloudinary.
* *Responsive Desktop-First UI*: Built with Tailwind CSS, Shadcn UI components, and Lucide React icons.

---

## 🛠 Tech Stack

| Tier           | Technology                                     |
| -------------- | ---------------------------------------------- |
| Frontend       | React, React Router, Context API               |
| Styling & UI   | Tailwind CSS, Shadcn UI, Lucide React icons    |
| Backend        | Node.js, Express.js                            |
| Database       | MongoDB (Mongoose ODM)                         |
| Authentication | JSON Web Tokens (JWT), Google OAuth            |
| Images         | Cloudinary                                     |
| Payments       | PayPal Sandbox, Razorpay                       |
| Deployment     | Vercel (frontend), Heroku / DigitalOcean (API) |

---

## 🏁 Getting Started

### Prerequisites

* Node.js (v16+ recommended)
* npm or Yarn
* MongoDB Atlas account (or local MongoDB)
* Cloudinary account for image uploads
* PayPal Developer account (sandbox)
* Razorpay account

### Installation

1. *Clone the repo*

   bash
   git clone https://github.com/your-username/mern-ecommerce.git
   cd mern-ecommerce
   

2. *Install dependencies*

   * *Server*

     bash
     cd server
     npm install
     
   * *Client*

     bash
     cd ../client
     npm install
     

### Environment Variables

Create a .env file in both server/ and client/ directories.

#### Server .env


PORT=5000
MONGO_URI=your_mongo_connection_string
JWT_SECRET=your_jwt_secret
GOOGLE_CLIENT_ID=your_google_client_id
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
PAYPAL_CLIENT_ID=your_paypal_sandbox_id
RAZORPAY_KEY_ID=your_razorpay_key_id
RAZORPAY_KEY_SECRET=your_razorpay_key_secret


#### Client .env


REACT_APP_API_URL=http://localhost:5000/api
REACT_APP_PAYPAL_CLIENT_ID=your_paypal_sandbox_id
REACT_APP_GOOGLE_CLIENT_ID=your_google_client_id


### Run the App

* *Start Server*

  bash
  cd server
  npm run dev
  

  Server runs on http://localhost:5000

* *Start Client*

  bash
  cd client
  npm start
  

  Client runs on http://localhost:3000

---

## 📂 Project Structure


mern-ecommerce/
├── client/                 # React frontend
│   ├── public/
│   ├── src/
│   │   ├── components/     # UI components (Shadcn UI, dialogs, buttons)
│   │   ├── pages/          # Page-level components
│   │   ├── context/        # Auth, Cart context providers
│   │   ├── hooks/          # Custom React hooks
│   │   └── utils/          # API utilities, helpers
│   └── .env
├── server/                 # Express backend
│   ├── config/             # Database & Cloudinary setup
│   ├── controllers/        # Request handlers
│   ├── middleware/         # Auth, error handling
│   ├── models/             # Mongoose schemas
│   ├── routes/             # API routes
│   └── .env
└── README.md


---

## 🔐 Authentication

* Users register/login with email & password.
* JWT tokens issued on auth, stored in HTTP-only cookies/localStorage.
* Protected routes in React and Express middleware verify token.
* Google OAuth for social login.

---

## 📑 API Endpoints

| Route                      | Method  | Access        | Description                                 |
| -------------------------- | ------- | ------------- | ------------------------------------------- |
| /api/auth/register       | POST    | Public        | Create new user account                     |
| /api/auth/login          | POST    | Public        | Authenticate user & get JWT                 |
| /api/auth/google         | GET     | Public        | Google OAuth callback                       |
| /api/products            | GET     | Public        | Get all products (with filtering & sorting) |
| /api/products/:id        | GET     | Public        | Get single product by ID                    |
| /api/products            | POST    | Admin         | Create new product                          |
| /api/products/:id        | PUT     | Admin         | Update product by ID                        |
| /api/products/:id        | DELETE  | Admin         | Delete product by ID                        |
| /api/orders              | POST    | Private       | Create new order                            |
| /api/orders/:id          | GET     | Private/Admin | Get order details                           |
| /api/orders/:id/paypal   | PUT     | Private       | Update order to paid (PayPal callback)      |
| /api/orders/:id/razorpay | PUT     | Private       | Update order to paid (Razorpay callback)    |
| /api/users/profile       | GET/PUT | Private       | Get/update user profile                     |
| /api/reviews             | POST    | Private       | Create product review                       |

---

## 🧑‍💼 Admin Panel

* Protected by role-based middleware.
* UI for product CRUD, order status updates, and analytics.
* Accessible at /admin route in frontend.

---

## 💳 Payment Integration

* *PayPal Sandbox*: Simulates payment flow in development using sandbox credentials.
* *Razorpay*: Live payment gateway integration for production.
* Webhooks/callbacks update order status in database.

---

## ☁ Image Uploads

* File uploads handled in Express using multer middleware.
* Images stored in Cloudinary; URLs saved in MongoDB.

---

## 🏗 Future Improvements

* *Performance*: Lazy loading, code splitting, improved caching.
* *Search & Recommendations*: Personalized product suggestions.
* *Payment Gateways*: Additional options (Stripe, UPI).
* *Testing*: Unit/integration tests (Jest, Cypress).
* *UI/UX*: A/B testing, accessibility audits.

---

## 🤝 Contributing

Contributions are welcome! Please:

1. Fork the repository
2. Create a feature branch (git checkout -b feature/YourFeature)
3. Commit your changes (git commit -m 'Add YourFeature')
4. Push to the branch (git push origin feature/YourFeature)
5. Open a Pull Request

---

## 📜 License

This project is licensed under the MIT License.

---

Happy coding! 🚀
