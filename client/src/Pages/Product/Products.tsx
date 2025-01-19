import { Suspense, useEffect } from "react";
import {
  Await,
  defer,
  LoaderFunctionArgs,
  useLoaderData,
  useParams,
} from "react-router-dom";
import { getProduct } from "../../api";
import { ItemCardList, ProductHeader } from "../../components";
import { ItemListSkeleton } from "../../Skeleton";
import { LoaderData, Product } from "../../types";

export async function loader({ params, request }: LoaderFunctionArgs) {
  if (
    params.productCategory !== "headphones" &&
    params.productCategory !== "speakers" &&
    params.productCategory !== "earphones"
  ) {
    throw { status: 404, message: "Page Not Found" };
  }
  const productsPromise = getProduct(params.productCategory as string);
  return defer({ productsPromise });
}

const Products = () => {
  useEffect(() => {
    // Scroll to the top when the component mounts
    window.scrollTo(0, 0);
  }, []); // The empty dependency array ensures that this effect runs only once when the component mounts
  const params = useParams();
  const { productsPromise } = useLoaderData() as LoaderData;
  const renderData = (data: Product[]) => <ItemCardList data={data} />;
  return (
    <>
      <ProductHeader title={params.productCategory!.toUpperCase()} />
      <Suspense fallback={<ItemListSkeleton />}>
        <Await resolve={productsPromise}>{renderData}</Await>
      </Suspense>
    </>
  );
};

export default Products;
