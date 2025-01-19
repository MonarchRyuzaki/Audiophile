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
      .valid("eMoney", "cashOnDelivery")
      .required()
      .messages({
        "string.empty": "Payment method is required.",
        "any.only": 'Payment method must be either "eMoney" or "cashOnDelivery".',
      }),
  
    eMoneyNumber: Joi.string()
      .length(12)
      .when("paymentMethod", {
        is: "eMoney",
        then: Joi.required(),
        otherwise: Joi.string().allow("").optional(),
      })
      .messages({
        "string.empty": "eMoney number is required for eMoney payment.",
        "string.length": "eMoney number must be exactly 12 characters.",
      }),
  
    eMoneyPIN: Joi.string()
      .length(4)
      .when("paymentMethod", {
        is: "eMoney",
        then: Joi.required(),
        otherwise: Joi.string().allow("").optional(),
      })
      .messages({
        "string.empty": "eMoney PIN is required for eMoney payment.",
        "string.length": "eMoney PIN must be exactly 4 characters.",
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