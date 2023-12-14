import { useEffect } from "react";
import { useLoaderData } from "react-router-dom";
import { getProduct } from "../../api";
import { ItemCardList, ProductHeader } from "../../components";

export async function loader() {
  return getProduct("earphones");
}

const Earphones = () => {
  useEffect(() => {
    // Scroll to the top when the component mounts
    window.scrollTo(0, 0);
  }, []); // The empty dependency array ensures that this effect runs only once when the component mounts
  const data = useLoaderData();
  return (
    <>
      <ProductHeader title={"EARPHONES"} />
      <ItemCardList data={data} />
    </>
  );
};

export default Earphones;
