import Joi from "joi";

export const formSchema = Joi.object({
    name: Joi.string().trim().required().messages({
      "string.empty": "Name is required.",
      "any.required": "Name is a mandatory field.",
    }),
  
    email: Joi.string().email().required().messages({
      "string.empty": "Email is required.",
      "string.email": "Please provide a valid email address.",
    }),
  
    phoneNumber: Joi.string().trim()
      .pattern(/^\d{12,14}$/)
      .required()
      .messages({
        "string.empty": "Phone number is required.",
      }),
  
    address: Joi.string().trim().required().messages({
      "string.empty": "Address is required.",
    }),
  
    zip: Joi.string().pattern(/^\d+$/).required().messages({
      "string.empty": "ZIP code is required.",
      "string.pattern.base": "ZIP code must be a valid number.",
    }),
  
    city: Joi.string().trim().required().messages({
      "string.empty": "City is required.",
    }),
  
    country: Joi.string().trim().required().messages({
      "string.empty": "Country is required.",
    }),
  
    paymentMethod: Joi.string()
      .valid("razorpay", "cashOnDelivery")
      .required()
      .messages({
        "string.empty": "Payment method is required.",
        "any.only": 'Payment method must be either "razorpay" or "cashOnDelivery".',
      }),
  
    totalAmount: Joi.number().required().messages({
      "string.empty": "Total amount is required.",
    }),
  
    cartData: Joi.array().items(
      Joi.object({
        slug: Joi.string().required().messages({
          "string.empty": "Slug is required.",
        }),
        name: Joi.string().required().messages({
          "string.empty": "Name is required.",
        }),
        price: Joi.number().required().messages({
          "string.empty": "Price is required.",
        }),
        quantity: Joi.number().required().messages({
          "string.empty": "Quantity is required.",
        }),
      })  
    ),
  });