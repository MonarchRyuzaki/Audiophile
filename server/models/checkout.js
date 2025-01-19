import mongoose from "mongoose";

const checkoutSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  phoneNumber: { type: String, required: true },
  address: { type: String, required: true },
  zip: { type: String, required: true },
  city: { type: String, required: true },
  country: { type: String, required: true },
  eMoneyNumber: { type: String },
  eMoneyPIN: { type: String },
  paymentMethod: { type: String, required: true },
  cartData: [
    { name: { type: String, required: true }, quantity: { type: Number, required: true }, price: { type: Number, required: true }, slug: { type: String, required: true } }
  ],
  totalAmount: { type: Number, required: true }
});

const Checkout = mongoose.model("Checkout", checkoutSchema);

export default Checkout;
