import { CheckoutFormData, FetchError, Product } from "./types";

export async function getProduct(category: string) {
  const response = await fetch(
    `https://audiophile-backend-kog9.onrender.com/${category}`
  );
  // const response = await fetch(`http://localhost:8080/${category}`);
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
    `https://audiophile-backend-kog9.onrender.com/product/${slug}`
  );
  // const response = await fetch(`http://localhost:8080/product/${slug}`);
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
    // const url = "http://localhost:8080/submit";
    // const url = "https://audiophile-backend-kog9.onrender.com/submit";
    const url = "https://audiophile-ohkm.onrender.com/submit";
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(values),
    });
    const data = await response.json();
    console.log(data);
    if (!response.ok) {
      console.error("Error response from server:", data);
      alert(data.error);
    } else {
      console.log("Form submitted successfully:", data);
    }
  } catch (error) {
    console.error("Error submitting form:", error);
  }
}