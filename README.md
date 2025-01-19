# Frontend Mentor - Audiophile e-commerce website solution

This is a solution to the [Audiophile e-commerce website challenge on Frontend Mentor](https://www.frontendmentor.io/challenges/audiophile-ecommerce-website-C8cuSd_wx). Frontend Mentor challenges help you improve your coding skills by building realistic projects. It combines a modern frontend with a secure backend, showcasing advanced features like user authentication, persistent cart storage, and enhanced UX.

## Table of contents

* [Overview](#overview)
* [Features](#features)
* [Links](#links)
* [Setup](#setup)
* [Tech Stack](#tech-stack)
* [What I Learned](#what-i-learned)
* [Challenges Faced](#challenges-faced)
* [Future Improvements](#future-improvements)
* [Author](#author)

## Overview

The Audiophile e-commerce website is a responsive web application that provides an intuitive user experience for browsing, adding to cart, and completing purchases. The application integrates secure authentication, dynamic cart management tied to user accounts, and smooth interactions with real-time feedback.

## Features

* Responsive design with a mobile-first approach.
* User-specific cart storage fetched from the backend, ensuring persistence across sessions.
* Form validation with meaningful error feedback using Formik and Yup.
* Real-time notifications for user actions and events with  **React Toast** .
* Secure authentication and authorization using Auth0.
* Dynamic VAT and shipping calculations.
* Order confirmation modal with a summary of purchased items.

## Links

* **Live Demo** : [Audiophile E-commerce Website](https://audiophile-nu-murex.vercel.app)
* **Frontend Repository** : [GitHub Repo](https://github.com/MonarchRyuzaki/Audiophile/tree/master/client)
* **Backend Repository** : [GitHub Repo](https://github.com/MonarchRyuzaki/Audiophile/tree/master/server)

## Setup

To run this project locally:

1. Clone the repository:

   ```bash
   git clone https://github.com/MonarchRyuzaki/Audiophile.git
   ```
2. Frontend Setup:

   1. Navigate to the client directory

   ```bash
   cd client
   ```

   2. Install the required dependencies:

   ```bash
   npm install
   ```

   3. Create a .env file in the client directory and add the following environment variables:

   ```env
   VITE_AUTH0_DOMAIN = "your-auth0-domain"
   VITE_AUTH0_CLIENT_ID = "your-auth0-client-id"
   VITE_AUTH0_CALLBACK_URL = "http://localhost:5173/callback"
   VITE_AUTH0_AUDIENCE = "your-auth0-audience"
   VITE_API_SERVER_URL = "http://localhost:8080"
   ```

   4. Start the development server:

   ```bash
   npm run dev
   ```
3. Backend Setup:

   1. Navigate to the server directory

   ```bash
   cd ../server
   ```

   2. Install the required dependencies:

   ```bash
   npm install
   ```

   3. Create a .env file in the client directory and add the following environment variables:

   ```env
   MONGODB_URL = "your-mongodb-url"
   AUTH0_DOMAIN = "your-auth0-domain"
   AUTH0_AUDIENCE = "your-auth0-audience"
   CLIENT_URL = "http://localhost:5173"
   ```

   4. Start the server:

   ```bash
   node index.js
   ```
4. Auth0 Setup:

* Refer to the official [Auth0 documentation](https://auth0.com/docs) to learn how to set up and configure your Auth0 account.
* You'll need to create an Auth0 application to obtain the AUTH0_DOMAIN and AUTH0_CLIENT_ID for the .env file.

5. Testing the Setup:

  Once both frontend and backend are running, navigate to http://localhost:3000 in your browser. You should be able to:

* Add/remove products to/from the cart
* Proceed with the checkout process
* Complete authentication via Auth0

## Tech Stack

* **Frontend** : React, React Router DOM v6, Tailwind CSS.
* **Authentication** : Auth0.
* **Backend** : Express.js, MongoDB, Joi.
* **State Management** : React Context API.
* **Form Handling** : Formik and Yup.
* **Notifications** : React Toast for real-time feedback.

## What I learned

#### Persistent Cart Storage

* The cart is dynamically stored in the backend database and is user-specific. This ensures that even if the user logs out or refreshes the page, their cart data is preserved across sessions.

#### Secure Authentication

* Implemented secure user authentication and authorization using Auth0, with role-based access control (RBAC) to manage user-specific actions and permissions.

#### Real-Time Feedback with React Toast

* Integrated React Toast for dynamic notifications, enhancing UX by providing clear and immediate feedback for user actions such as adding items to the cart, completing a purchase, or encountering errors.

#### Simplified Forms

* Leveraged Formik and Yup for declarative form creation, efficient validation, and error management.

## **Challenges Faced**

1. **Backend-Frontend Synchronization** :

* Managed persistent cart storage by integrating backend APIs to ensure data consistency.

2. **Authentication Integration** :

* Encountered challenges with configuring Auth0 for seamless authentication and role-based authorization.

3. **CORS Errors in Production** :

* Resolved CORS issues by correctly setting up headers in the backend for cross-origin requests.

4. **Route Handling in Production** :

* Added a `vercel.json` file to handle React Router routes in production without encountering 404 errors on page refresh.

## **Future Improvements**

* Introduce a search functionality for quicker product navigation.
* Implement server-side rendering (SSR) with Next.js for improved SEO and performance.
* Add admin functionality for managing products and orders.
* Incorporate unit and integration testing with Jest and React Testing Library.

## Author

* LinkedIn - [Shivam Ganguly](https://www.linkedin.com/in/shivam-ganguly-357b90255/)
