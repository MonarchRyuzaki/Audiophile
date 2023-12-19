import { Await, defer, useLoaderData } from "react-router-dom";
import { getProduct } from "../../api";
import { ItemCardList, ProductHeader } from "../../components";
import { Suspense, useEffect } from "react";
import { ItemListSkeleton } from "../../Skeleton";

export async function loader() {
  const productsPromise =  getProduct("headphones");
  return defer({productsPromise})
}

const Headphones = () => {
  useEffect(() => {
    // Scroll to the top when the component mounts
    window.scrollTo(0, 0);
  }, []); // The empty dependency array ensures that this effect runs only once when the component mounts

  const {productsPromise} = useLoaderData();
  const renderData = (data) => <ItemCardList data={data} />
  return (
    <>
      <ProductHeader title={"HEADPHONES"} />
      <Suspense fallback={<ItemListSkeleton />}>
        <Await resolve={productsPromise}>
          {renderData}
        </Await>
      </Suspense>
      
    </>
  );
};

export default Headphones;
