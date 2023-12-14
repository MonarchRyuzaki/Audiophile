import { useLoaderData } from "react-router-dom";
import { getProduct } from "../../api";
import { ItemCardList, ProductHeader } from "../../components";
import { useEffect } from "react";

export async function loader() {
  return getProduct("speakers");
}

const Speaker = () => {
  useEffect(() => {
    // Scroll to the top when the component mounts
    window.scrollTo(0, 0);
  }, []); // The empty dependency array ensures that this effect runs only once when the component mounts
  const data = useLoaderData();
  return (
    <>
      <ProductHeader title={"SPEAKERS"} />
      <ItemCardList data={data} />
    </>
  );
};

export default Speaker;
