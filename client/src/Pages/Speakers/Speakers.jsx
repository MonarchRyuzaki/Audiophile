import { useLoaderData, defer, Await } from "react-router-dom";
import { getProduct } from "../../api";
import { ItemCardList, ProductHeader } from "../../components";
import { useEffect, Suspense } from "react";
import { ItemListSkeleton } from "../../Skeleton";

export async function loader() {
  const productsPromise =  getProduct("speakers");
  return defer({productsPromise})
}

const Speaker = () => {
  useEffect(() => {
    // Scroll to the top when the component mounts
    window.scrollTo(0, 0);
  }, []); // The empty dependency array ensures that this effect runs only once when the component mounts
  const {productsPromise} = useLoaderData();
  const renderData = (data) => <ItemCardList data={data} />
  return (
    <>
      <ProductHeader title={"SPEAKERS"} />
      <Suspense fallback={<ItemListSkeleton />}>
        <Await resolve={productsPromise}>
          {renderData}
        </Await>
      </Suspense>
    </>
  );
};

export default Speaker;
