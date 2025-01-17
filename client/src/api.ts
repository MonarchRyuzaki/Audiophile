import { ActionData, CheckoutFormData, FetchError, Product } from "./types";

export async function getProduct(category: string) {
  const response = await fetch(
    `${import.meta.env.VITE_API_SERVER_URL}/${category}`
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
    const response = await fetch(`${import.meta.env.VITE_API_SERVER_URL}/submit`, {
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

export async function postCartItems() {

}