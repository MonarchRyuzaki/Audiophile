import { ActionData, CartItem, CheckoutFormData, FetchError, Product } from "./types";

export async function getProduct(category: string) {
  const response = await fetch(
    `${import.meta.env.VITE_API_SERVER_URL}/product/category/${category}`
  );
  if (response.ok) {
    const res = await response.json();
    return res.data as Product[];
  }
  throw {
    message: "Failed to fetch data",
    status: response.status,
    text: response.statusText,
  } as FetchError;
}

export async function getProductDetails(slug: string) {
  const response = await fetch(
    `${import.meta.env.VITE_API_SERVER_URL}/product/${slug}`
  );
  if (response.ok) {
    const res = await response.json();
    return res.data as Product;
  }
  throw {
    message: "Failed to fetch data",
    status: response.status,
    text: response.statusText,
  } as FetchError;
}

export async function postCheckoutData(values: CheckoutFormData) {
  try {
    const response = await fetch(`${import.meta.env.VITE_API_SERVER_URL}/order/submit`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(values),
    });
    const data = await response.json();
    if (!response.ok) {
      const messages = data.error.details.map((detail: {message: string}) => detail.message);
      return { success: false, messages : messages } as ActionData;
    } else {
      return { success: true, message: data.message } as ActionData;
    }
  } catch (error) {
    console.error("Error submitting form:", error);
  }
}

export async function getCartItems(accessToken: string) {
  try {
    const response = await fetch(`${import.meta.env.VITE_API_SERVER_URL}/cart`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    const resData = await response.json();
    if (!response.ok) {
      throw {
        message: "Failed to fetch data",
        status: response.status,
        text: response.statusText,
      } as FetchError;
    }
    return resData.cartItems as CartItem[];
  } catch (error) {
    console.error("Error fetching cart items:", error);
  }
}

export async function onAddToCartItems(accessToken: string, item: CartItem) {
  try {
    console.log("API ITEM: ", item);
    const response = await fetch(`${import.meta.env.VITE_API_SERVER_URL}/cart/add`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify({...item})
    });
    const resData = await response.json();
    if (!response.ok) {
      return {success: false, message: resData.message}
    }
    return {success: true, message: resData.message}
  } catch (error) {
    console.error("Error fetching cart items:", error);
  }
}