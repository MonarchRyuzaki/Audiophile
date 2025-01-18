import UserCart from "../models/user_cart-data.js";
import { getUserInfo } from "../utils/auth.js";

export const onAddToCart = async (req, res) => {
  try {
    const accessToken = req.auth.token;
    const userInfo = await getUserInfo(req.auth.payload.aud[1], accessToken);
    const userEmail = userInfo.email;
    const { slug, name, count, image, category, price } = req.body;
    if (!slug || !name || !count || !price) {
      return res.status(400).json({ error: "Invalid cart item data" });
    }

    const userCart = await UserCart.findOne({ email: userEmail });

    if (userCart) {
      const existingItemIndex = userCart.cartData.findIndex(
        (item) => item.slug === slug
      );

      if (existingItemIndex !== -1) {
        userCart.cartData[existingItemIndex].count += count;
      } else {
        userCart.cartData.push({ slug, name, count, image, category, price });
      }

      await userCart.save();
      return res.status(200).json({ message: "Item added to cart" });
    } else {
      const newUserCart = new UserCart({
        email: userEmail,
        cartData: [{ slug, name, count, image, category, price }],
      });
      await newUserCart.save();
      return res.status(201).json({ message: "Cart created and item added" });
    }
  } catch (error) {
    console.error("Error adding to cart:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const getCart = async (req, res) => {
  const accessToken = req.auth.token;
  const userInfo = await getUserInfo(req.auth.payload.aud[1], accessToken);
  const userCart = await UserCart.findOne({ email: userInfo.email });
  res.json({ cartItems: userCart.cartData || [] });
};

export const onUpdateItemQuantity = async (req, res) => {
  try {
    const { slug, change } = req.body;

    if (!slug || !Number.isInteger(change)) {
      return res.status(400).json({ error: "Invalid request data" });
    }
    
    const accessToken = req.auth.token;
    const userInfo = await getUserInfo(req.auth.payload.aud[1], accessToken);
    const userEmail = userInfo.email;

    const userCart = await UserCart.findOne({ email: userEmail });

    if (!userCart) {
      return res.status(404).json({ error: "Cart not found" });
    }

    const itemIndex = userCart.cartData.findIndex((item) => item.slug === slug);

    if (itemIndex === -1) {
      return res.status(404).json({ error: "Item not found in cart" });
    }

    const currentItem = userCart.cartData[itemIndex];
    const newCount = currentItem.count + change;

    if (newCount < 1) {
      userCart.cartData.splice(itemIndex, 1);
    } else {
      userCart.cartData[itemIndex].count = newCount;
    }

    await userCart.save();

    res
      .status(200)
      .json({ message: "Cart updated successfully", cart: userCart.cartData });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};
