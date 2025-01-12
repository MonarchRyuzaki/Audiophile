import { Suspense, useEffect } from "react";
import {
  Await,
  defer,
  LoaderFunctionArgs,
  useLoaderData,
} from "react-router-dom";
import { getProduct } from "../../api";
import { ItemCardList, ProductHeader } from "../../components";
import { ItemListSkeleton } from "../../Skeleton";
import { LoaderData, Product } from "../../types";

export async function loader({ params, request }: LoaderFunctionArgs) {
  console.log(params, request);
  const productsPromise = getProduct("earphones");
  return defer({ productsPromise });
}

const Earphones = () => {
  useEffect(() => {
    // Scroll to the top when the component mounts
    window.scrollTo(0, 0);
  }, []); // The empty dependency array ensures that this effect runs only once when the component mounts
  const { productsPromise } = useLoaderData() as LoaderData;
  const renderData = (data: Product[]) => <ItemCardList data={data} />;
  return (
    <>
      <ProductHeader title={"EARPHONES"} />
      <Suspense fallback={<ItemListSkeleton />}>
        <Await resolve={productsPromise}>{renderData}</Await>
      </Suspense>
    </>
  );
};

export default Earphones;
