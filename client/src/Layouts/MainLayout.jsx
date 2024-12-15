import { useState } from "react";
import { Outlet, useLoaderData } from "react-router-dom";
import { Footer, Navbar } from "../components/index"
import CartContextProvider from "../store/ShoppingCartContext";


const MainLayout = () => {
  return (
    <CartContextProvider>
      <Navbar />
      <Outlet />
      <Footer />
    </CartContextProvider>
  );
};

export default MainLayout;
