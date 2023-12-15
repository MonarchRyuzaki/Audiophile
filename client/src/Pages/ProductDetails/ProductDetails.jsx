import { useState } from "react";
import { Link, useLoaderData } from "react-router-dom";
import { getProductDetails } from "../../api";
import { Details, Hero, Photos, Others } from "./components";

export async function loader({ params }) {
  return getProductDetails(params.slug);
}

const ProductDetails = () => {
  const data = useLoaderData();
  return (
    <div className="flex justify-center items-center px-6 sm:px-16">
      <div className="w-full xl:max-w-[1100px]">
        <Hero data={data} />
        <Details data={data} />
        <Photos data={data} />
        <Others data={data} />
      </div>
    </div>
  );
};

export default ProductDetails;
