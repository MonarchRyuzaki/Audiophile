import { Suspense, useEffect } from "react";
import { Await, defer, useLoaderData } from "react-router-dom";
import { getProduct } from "../../api";
import { ItemCardList, ProductHeader } from "../../components";
import { ItemListSkeleton } from "../../Skeleton";

export async function loader() {
  const productsPromise = getProduct("headphones");
  return defer({ productsPromise });
}

const Headphones = () => {
  useEffect(() => {
    // Scroll to the top when the component mounts
    window.scrollTo(0, 0);
  }, []); // The empty dependency array ensures that this effect runs only once when the component mounts

  const { productsPromise } = useLoaderData();
  const renderData = (data) => <ItemCardList data={data} />;
  return (
    <>
      <ProductHeader title={"HEADPHONES"} />
      <Suspense fallback={<ItemListSkeleton />}> {/* Displays a fallback until the children are completed loading */}
        <Await resolve={productsPromise}>
          {" "}
          {/* When the promise is resolved, the following fn will be called and items will be rendered. */}
          {/* For each item this will be called. Render Props used */}
          {renderData}
        </Await>
      </Suspense>
    </>
  );
};

export default Headphones;
