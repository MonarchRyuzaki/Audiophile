export async function getProduct(category){
    const response = await fetch(`http://localhost:8080/${category}`);
    if (response.ok){
        const res = await response.json();
        return res.data;
    }
    throw {
        message: "Failed to fetch data",
        status: response.status,
        text: response.statusText,
    }
}