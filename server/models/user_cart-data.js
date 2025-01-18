import mongoose from "mongoose";

const userCartSchema = new mongoose.Schema({
    email: {
      type: String,
      required: true,
    },
    cartData: [
      {
        slug: { type: String, required: true },
        name: { type: String, required: true },
        count: { type: Number, required: true },
        image: { type: String, required: true },
        category: { type: String, required: true },
        price: { type: Number, required: true },
      },
    ],
  });

const UserCart = mongoose.model("UserCart", userCartSchema);

export default UserCart;