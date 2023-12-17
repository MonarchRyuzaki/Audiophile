import { useState } from "react";
import { Outlet, useLoaderData } from "react-router-dom";
import { Footer, Navbar } from "../components/index"

export async function loader(){
  return JSON.parse(localStorage.getItem("itemInfo")) || [];
}

const MainLayout = () => {
  const data = useLoaderData();
  console.log(data);
  const [noOfItems, setNoOfItems] = useState(data.length);
  return (
    <>
      <Navbar noOfItems={noOfItems} setNoOfItems={setNoOfItems}/>
      <Outlet context={{ noOfItems, setNoOfItems }} />
      <Footer />
    </>
  );
};

export default MainLayout;
