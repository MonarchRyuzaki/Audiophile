# Frontend Mentor - Audiophile e-commerce website solution

This is a solution to the [Audiophile e-commerce website challenge on Frontend Mentor](https://www.frontendmentor.io/challenges/audiophile-ecommerce-website-C8cuSd_wx). Frontend Mentor challenges help you improve your coding skills by building realistic projects.

## Table of contents

* [Overview](https://github.com/mbart13/audiophile-ecommerce-website#overview)
  * [The challenge](https://github.com/mbart13/audiophile-ecommerce-website#the-challenge)
  * [Links](https://github.com/mbart13/audiophile-ecommerce-website#links)
  * [Setup](https://github.com/mbart13/audiophile-ecommerce-website#setup)
* [My process](https://github.com/mbart13/audiophile-ecommerce-website#my-process)
  * [Built with](https://github.com/mbart13/audiophile-ecommerce-website#built-with)
  * [What I learned](https://github.com/mbart13/audiophile-ecommerce-website#what-i-learned)
* [Author](https://github.com/mbart13/audiophile-ecommerce-website#author)

## Overview

### The challenge

Users should be able to:

* View the optimal layout for the app depending on their device's screen size ✔️
* See hover states for all interactive elements on the page ✔️
* Add/Remove products from the cart ✔️
* Edit product quantities in the cart ✔️
* Fill in all fields in the checkout ✔️
* Receive form validations if fields are missed or incorrect during checkout ✔️
* See correct checkout totals depending on the products in the cart ✔️
  * Shipping always adds $50 to the order ✔️
  * VAT is calculated as 20% of the product total, excluding shipping ✔️
* See an order confirmation modal after checking out with an order summary ✔️
* **Bonus** : Keep track of what's in the cart, even after refreshing the browser (`localStorage` could be used for this if you're not building out a full-stack app) ✔️

[![](https://github.com/mbart13/audiophile-ecommerce-website/raw/main/screenshot.png)](https://github.com/mbart13/audiophile-ecommerce-website/blob/main/screenshot.png)

### Links

[Live Site URL](https://audiophile-nu-murex.vercel.app/)

### Setup

To run this project locally:

```
cd ./client && npm install & npm run dev
```

## My process

### Built with

* React
* React Router DOM v6
* Tailwind CSS
* **Auth0** for authentication
* **Express** (for backend API)
* **MongoDB** (database)
* Formik
* Yup
* Mobile-first workflow

### What I learned

#### React Router DOM

In this project, React Router DOM has been seamlessly integrated to manage navigation within the application. This allows for a single-page application feel by dynamically updating the URL as the user interacts with different components.

**Loaders:**
Loaders play a crucial role in managing asynchronous operations within the application. They enhance the user experience by providing feedback during data fetching, ensuring a smooth and responsive interface.

**Actions:**
While actions are not actively utilized in this project, they serve as a powerful tool for handling complex state changes. Future iterations of the project could explore incorporating actions to further streamline data management and enhance code modularity.

**Boilerplate Code Reduction**:

One of the notable advantages of using React Router DOM and the data layer API is the significant reduction in boilerplate code. This leads to cleaner and more maintainable code, making it easier for developers to understand and contribute to the project.

**Benefits:**

* **Enhanced Readability:** Reduced boilerplate code contributes to clearer and more readable components, improving the overall maintainability of the codebase.
* **Development Efficiency:** With less boilerplate to manage, developers can focus more on implementing features and functionality rather than dealing with repetitive code structures.

#### Authentication with Auth0

Incorporating Auth0 provided secure authentication and authorization functionalities, ensuring seamless user authentication and access control within the Audiophile e-commerce website. Auth0's robust features enhanced user management capabilities and protected sensitive application data.

**Key Features:**

* **Secure Authentication:** Auth0 supported various authentication methods, including social logins and passwordless authentication, ensuring secure user access.
* **Authorization:** Implementing role-based access control (RBAC) with Auth0 allowed defining granular permissions for different user roles, enhancing application security.
* **User Management:** Auth0 simplified user management tasks such as user registration, profile updates, and password resets, improving overall user experience and engagement.

#### Backend Validation

Implementing backend validation with Express and Joi ensured data integrity and security during form submissions, validating input data before processing within the Audiophile e-commerce website. This approach prevented invalid data from entering the application's database, maintaining data consistency and reliability.

#### Formik

In addition to React Router DOM and the data layer API, the project leverages Formik and Yup for efficient form handling, state management, and validation.

**Formik Integration:**
Formik simplifies the often complex task of managing forms in React applications. By providing a set of intuitive APIs, Formik streamlines form state management, form submission, and error handling. This integration proves invaluable in creating a seamless user experience when dealing with various input forms within the application.

**Key Aspects:**

* **Declarative Form Structure:** Formik allows for the creation of forms in a declarative manner, reducing the boilerplate associated with form implementation.
* **Form State Management:** Efficiently manage form state, including values, errors, and submission status, making it easier to handle user inputs and interactions.

**Yup for Form Validation:**
Yup is employed for form validation, ensuring that data submitted through forms adheres to specific criteria. This enhances the reliability of the application by preventing invalid or inconsistent data from being processed.

**Validation Features:**

* **Schema-based Validation:** Define validation rules using Yup schemas, enabling a clear and concise representation of the expected form data structure.
* **Error Messaging:** Formik and Yup work seamlessly together to provide meaningful error messages to users, improving the overall user experience.

**Simplifying Form Workflows**

The combined use of Formik and Yup significantly eases the process of working with forms, from state management to validation. This not only reduces development time but also enhances the robustness of form interactions in the application.

**Benefits:**

* **Efficient Error Handling:** Formik and Yup contribute to efficient error handling by providing clear feedback to users, guiding them through the form submission process.
* **Modular Form Components:** Formik's modular approach allows for the creation of reusable form components, promoting code reusability and maintainability.

```javascript
const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      phoneNumber: "",
      address: "",
      zip: "",
      city: "",
      country: "",
      eMoneyNumber: "",
      eMoneyPIN: "",
      paymentMethod: "",
    },

    onSubmit: () => {
      // Function for backend Validation
      setSubmit("true");
    },

    validationSchema: Yup.object({
      name: Yup.string().required("Name is required"),
      email: Yup.string()
        .email("Invalid email address")
        .required("Email is required"),
      phoneNumber: Yup.string()
        .min(12, "Invalid Phone Number")
        .max(14, "Invalid Phone Number")
        .required("Phone number is required"),
      address: Yup.string().required("Address is required"),
      zip: Yup.number().required("Zip Code is required"),
      city: Yup.string().required("City is required"),
      country: Yup.string().required("Country is required"),
      eMoneyNumber: Yup.string().when("paymentMethod", {
        is: "eMoney",
        then: () => Yup.string()
          .required("Field is required")
          .length(12, "Invalid E-Money Number"),
        otherwise: () => Yup.string(),
      }),
      eMoneyPIN: Yup.string().when("paymentMethod", {
        is: "eMoney",
        then: () => Yup.string()
          .required("Field is required")
          .length(4, "Invalid E-Money PIN"),
        otherwise: () => Yup.string(),
      }),
      paymentMethod: Yup.string().required("Payment mode is required"),
    }),
  })
```

## Author

* LinkedIn - [Shivam Ganguly](https://www.linkedin.com/in/shivam-ganguly-357b90255/)
