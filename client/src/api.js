export async function getProduct(category) {
  const response = await fetch(
    `https://audiophile-backend-kog9.onrender.com/${category}`
  );
  // const response = await fetch(`http://localhost:8080/${category}`);
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

export async function getProductDetails(slug) {
  const response = await fetch(
    `https://audiophile-backend-kog9.onrender.com/product/${slug}`
  );
  // const response = await fetch(`http://localhost:8080/product/${slug}`);
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

export async function addToCart(slug, count) {
  const data = {
    slug,
    count,
  };
  const url = "https://audiophile-backend-kog9.onrender.com/cart";
  // const url = "http://localhost:8080/cart";
  const response = await fetch(url, {
    method: "post",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  if (response.ok) {
    const res = await response.json();
    const { name, image, category, price } = res;
    const storedItemInfo = JSON.parse(localStorage.getItem("itemInfo")) || [];
    const existingItemIndex = storedItemInfo.findIndex(
      (item) => item.name === name
    );

    if (existingItemIndex !== -1) {
      storedItemInfo[existingItemIndex].count =
        parseInt(storedItemInfo[existingItemIndex].count) + parseInt(count);
    } else {
      storedItemInfo.push({ name, count, image, category, price });
    }
    localStorage.setItem("itemInfo", JSON.stringify(storedItemInfo));
  }
  throw {
    message: "Failed to add to cart",
    status: response.status,
    text: response.statusText,
  };
}
