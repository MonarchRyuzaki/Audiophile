import { formSchema } from "../utils/checkoutFormSchemaValidation.js";

export const onCheckout = async (req, res) => {
  console.log("Inside Submit");
  const data = formSchema.validate(req.body, { abortEarly: false });
  if (data.error) {
    return res.status(400).json({ error: data.error });
  }
  res.status(200).json({ message: "Form submitted successfully" });
};
