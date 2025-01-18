import Checkout from "../models/checkout.js";
import { getUserInfo } from "../utils/auth.js";
import { formSchema } from "../utils/checkoutFormSchemaValidation.js";

export const onCheckout = async (req, res) => {
  try {
    console.log("Inside Submit");
    const accessToken = req.auth.token;
    const userInfo = await getUserInfo(req.auth.payload.aud[1], accessToken);
    const userEmail = userInfo.email;
    const formData = req.body;
    const checkoutData = { ...formData, email: userEmail };
    const data = formSchema.validate(checkoutData, { abortEarly: false });
    if (data.error) {
      return res.status(400).json({ error: data.error });
    }
    const newCheckout = new Checkout(checkoutData);
    await newCheckout.save();
    res.status(200).json({ message: "Form submitted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};
