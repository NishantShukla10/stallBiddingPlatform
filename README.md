# Stall Bidding System

![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)
![Express](https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge&logo=mongodb&logoColor=white)
![React](https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=react&logoColor=black)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-06B6D4?style=for-the-badge&logo=tailwind-css&logoColor=white)
![JWT](https://img.shields.io/badge/JWT-000000?style=for-the-badge&logo=JSON-web-tokens&logoColor=white)

---

## Live URL

- [Live URL](https://stallbiddingplatform-qyx1.onrender.com)

---

## Project Overview

A **secure, role-based online bidding platform** that enables principals to create stalls and students to place competitive bids with automated email notifications.

- Principals can create, update, delete, and manage stalls.  
- Students can place bids with dynamic validation ensuring bids exceed the current highest bid.  
- Real-time tracking of highest bids and bid history.  
- Automated email notifications to previous bidders, principals, and current bidders for each action.  

---

## Features

### Authentication & Authorization
- User registration and login for **principals** and **students**.  
- JWT-based authentication with secure password hashing.  
- Role-based access control for sensitive operations.  

### Stall Management
- Principals can create, update, delete, and mark stalls as sold.  
- Stalls track the **highest bid dynamically**.  
- Bidding closes automatically after 30 days (future enhancement).  

### Bidding System
- Students can place bids only if they are higher than the current highest bid.  
- Real-time bid tracking for each stall.  
- Bid history is maintained for auditing and notifications.  

### Notifications
- **Automated email notifications** using Nodemailer:  
  - Notify previous highest bidder when outbid.  
  - Notify stall owner (principal) when a new bid is placed.  
  - Notify current bidder for bid confirmation.  

### Frontend
- Responsive **React** application with **Tailwind CSS**.  
- API integration for stalls, bids, and authentication.  
- Smooth navigation with Mega Menu and mobile-friendly layout.  

---

## Tech Stack

**Backend:**
- Node.js, Express.js  
- MongoDB & Mongoose  
- JWT Authentication  
- Nodemailer for email notifications  

**Frontend:**
- React.js  
- Tailwind CSS  
- Axios for API calls  

**Deployment:**
- Backend: Vercel
- Frontend: Vercel
---

## Backend Setup

1. Clone the repository:  
   ```bash
   git clone <repo-url>
   cd backend
   npm install

   npm run dev
    
2. Dotenv of Backend:
   ```bash
   PORT=4000
   DB_URL="DB URL"

   JWT_SECRET="Secret Key"
   PRINCIPAL_SECRET_KEY="Principal secret key"

   SENDGRID_API_KEY="Get key from SendGrid website after registration"
   SENDGRID_SENDER="Verified email from SendGrid"

   CLIENT_URLS=http://localhost:5173

## Frontend Setup

1. Clone the repository:  
   ```bash
   cd frontend
   npm install

   npm run dev

2. Dotenv of Frontend:
   ```bash
   VITE_API_URL="http://localhost:4000/api"
