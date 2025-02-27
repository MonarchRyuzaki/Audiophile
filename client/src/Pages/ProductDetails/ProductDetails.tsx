import { Suspense, useEffect } from "react";
import {
  Await,
  defer,
  LoaderFunctionArgs,
  useLoaderData,
} from "react-router-dom";
import { ProductDetailsSkeleton } from "../../Skeleton";
import { getProductDetails } from "../../api";
import { LoaderData } from "../../types";
import { Details, Hero, Others, Photos } from "./components";

export async function loader({ params }: LoaderFunctionArgs) {
  // there is a request object with url property which has the url. We use new URL() constructor to form a url and get search params
  const productPromise = getProductDetails(params.slug as string); // route/:slug aisa wala
  return defer({ productPromise }); // loading state can be added using this with suspense and await component
}

const ProductDetails = () => {
  useEffect(() => {
    // Scroll to the top when the component mounts
    window.scrollTo(0, 0);
  }, []); // The empty dependency array ensures that this effect runs only once when the component mounts
  const { productPromise } = useLoaderData() as LoaderData;
  {
    /* Line - 30 : Loads the skeleton until a promise is resolved */
  }
  {
    /* Line - 31 : When the promise is resolved, the following fn will be called and items will be rendered */
  }
  return (
    <div className="flex justify-center items-center px-6 sm:px-16">
      <div className="w-full xl:max-w-[1100px]">
        <Suspense fallback={<ProductDetailsSkeleton />}>
          <Await resolve={productPromise}>
            {(data) => (
              <>
                <Hero data={data} />
                <Details data={data} />
                <Photos data={data} />
                <Others data={data} />
              </>
            )}
          </Await>
        </Suspense>
      </div>
    </div>
  );
};

export default ProductDetails;
