import crypto from "crypto";
import dotenv from "dotenv";
import Razorpay from "razorpay";
import Checkout from "../models/checkout.js";
import UserCart from "../models/user_cart-data.js";
import { getUserInfo } from "../utils/auth.js";
import { formSchema } from "../utils/checkoutFormSchemaValidation.js";
dotenv.config();

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

export const createOrder = async (req, res) => {
  try {
    const { amount, currency = "USD", orderData } = req.body;
    const accessToken = req.auth.token;
    const userInfo = await getUserInfo(req.auth.payload.aud[1], accessToken);
    const checkoutData = {
      ...orderData,
      email: userInfo.email,
    };
    const data = formSchema.validate(checkoutData, { abortEarly: false });
    console.log(data.error);
    if (data.error) {
      return res.status(400).json({ error: data.error });
    }

    const options = {
      amount: Math.round(amount * 100), // Convert to paise
      currency,
      receipt: `order_${Date.now()}`,
      payment_capture: 1,
    };

    const order = await razorpay.orders.create(options);

    res.status(200).json({
      id: order.id,
      amount: order.amount,
      currency: order.currency,
      userEmail: userInfo.email,
    });
  } catch (error) {
    console.error("Error creating Razorpay order:", error);
    res.status(500).json({ error: "Failed to create order" });
  }
};

export const verifyPayment = async (req, res) => {
  try {
    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
      orderData,
    } = req.body;

    const accessToken = req.auth.token;
    const userInfo = await getUserInfo(req.auth.payload.aud[1], accessToken);

    // Verify signature
    const body = razorpay_order_id + "|" + razorpay_payment_id;
    const expectedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
      .update(body.toString())
      .digest("hex");

    const isAuthentic = expectedSignature === razorpay_signature;

    if (isAuthentic) {
      // Payment is verified, save order
      const checkoutData = {
        ...orderData,
        email: userInfo.email,
        paymentMethod: "razorpay",
        paymentStatus: "paid",
        razorpayOrderId: razorpay_order_id,
        razorpayPaymentId: razorpay_payment_id,
        razorpaySignature: razorpay_signature,
      };

      const newCheckout = new Checkout(checkoutData);
      await newCheckout.save();

      // Clear user's cart
      await UserCart.findOneAndUpdate(
        { email: userInfo.email },
        { $set: { cartData: [] } }
      );

      res.status(200).json({
        success: true,
        message: "Payment verified and order placed successfully",
        orderId: newCheckout._id,
      });
    } else {
      res.status(400).json({ error: "Payment verification failed" });
    }
  } catch (error) {
    console.error("Payment verification error:", error);
    res.status(500).json({ error: "Payment verification failed" });
  }
};
