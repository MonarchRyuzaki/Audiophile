export async function getProduct(category) {
  const response = await fetch(`https://audiophile-backend-kog9.onrender.com/${category}`);
  if (response.ok) {
    const res = await response.json();
    return res.data;
  }
  throw {
    message: "Failed to fetch data",
    status: response.status,
    text: response.statusText,
  };
}
