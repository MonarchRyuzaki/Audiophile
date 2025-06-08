import { ActionData, CartItem, CheckoutFormData, FetchError, Product } from "./types";

export async function getProduct(category: string) {
  const response = await fetch(
    `${import.meta.env.VITE_API_SERVER_URL}/product/category/${category}`
  );
  const res = await response.json();
  if (response.ok) {
    return res.data as Product[];
  }
  throw {
    message: res.error,
    status: res.status,
    text: response.statusText,
  } as FetchError;
}

export async function getProductDetails(slug: string) {
  const response = await fetch(
    `${import.meta.env.VITE_API_SERVER_URL}/product/${slug}`
  );
  const res = await response.json();
  if (response.ok) {
    return res.data as Product;
  }
  throw {
    message: res.error,
    status: res.status,
    text: response.statusText,
  } as FetchError;
}

export async function postCheckoutData(acceessToken: string, values: CheckoutFormData) {
  try {
    const response = await fetch(`${import.meta.env.VITE_API_SERVER_URL}/order/submit`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${acceessToken}`,
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

export const loadRazorpayScript = () => {
  return new Promise((resolve) => {
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });
};

export async function createRazorpayOrder(accessToken: string, orderData: any) {
  try {
    const response = await fetch(
      `${import.meta.env.VITE_API_SERVER_URL}/api/payment/create-order`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify({
          amount: orderData.totalAmount + 50 + 0.2 * orderData.totalAmount,
          currency: "INR",
          orderData: orderData,
        }),
      }
    );
    const data = await response.json();
    if (!response.ok) {
      const messages = data.error.details.map((detail: {message: string}) => detail.message);
      return { success: false, messages : messages } as ActionData;
    } else {
      return { success: true, order: data } as ActionData;
    }
  } catch (error) {
    console.error("Error creating Razorpay order:", error);
    throw error;
  }
}

export async function verifyRazorpayPayment(accessToken: string, response: any, orderData: any) {
  try {
    const verifyResponse = await fetch(
      `${import.meta.env.VITE_API_SERVER_URL}/api/payment/verify`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify({
          razorpay_order_id: response.razorpay_order_id,
          razorpay_payment_id: response.razorpay_payment_id,
          razorpay_signature: response.razorpay_signature,
          orderData: orderData,
        }),
      }
    );

    if (!verifyResponse.ok) {
      throw new Error("Failed to verify payment");
    }
    return await verifyResponse.json();
  } catch (error) {
    console.error("Error verifying Razorpay payment:", error);
    throw error;
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
      return {success: false, message: resData.message} as {success: boolean, message: string}
    }
    return {success: true, message: resData.message} as {success: boolean, message: string}
  } catch (error) {
    console.error("Error fetching cart items:", error);
  }
}

export async function onUpdateItemQuantity(accessToken: string, item: CartItem, change: number) {
  try {
    const response = await fetch(`${import.meta.env.VITE_API_SERVER_URL}/cart/update-item-quantity`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify({slug: item.slug, change: change})
    });
    const resData = await response.json();
    if (!response.ok) {
      return {success: false, message: resData.message} as {success: boolean, message: string}
    }
    return {success: true, message: resData.message} as {success: boolean, message: string}
  } catch (error) {
    console.error("Error fetching cart items:", error);
  }
}

export async function onClearingCart(accessToken: string) {
  try {
    const response = await fetch(`${import.meta.env.VITE_API_SERVER_URL}/cart`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    const resData = await response.json();
    if (!response.ok) {
      return {success: false, message: resData.message} as {success: boolean, message: string}
    }
    return {success: true, message: resData.message} as {success: boolean, message: string}
  } catch (error) {
    console.error("Error fetching cart items:", error);
  }
}