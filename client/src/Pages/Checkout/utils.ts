import * as Yup from "yup";

export const formValidationSchema = Yup.object({
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
      then: () =>
        Yup.string()
          .required("Field is required")
          .length(12, "Invalid E-Money Number"),
      otherwise: () => Yup.string(),
    }),
    eMoneyPIN: Yup.string().when("paymentMethod", {
      is: "eMoney",
      then: () =>
        Yup.string()
          .required("Field is required")
          .length(4, "Invalid E-Money PIN"),
      otherwise: () => Yup.string(),
    }),
    paymentMethod: Yup.string().required("Payment mode is required"),
  })