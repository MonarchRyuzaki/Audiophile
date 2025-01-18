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