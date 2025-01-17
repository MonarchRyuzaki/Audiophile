import { Outlet } from "react-router-dom";
import { Footer, Navbar } from "../components/index";
import CartContextProvider from "../store/ShoppingCartContext";
import { Auth0ProviderWithNavigate } from "../components/Auth0ProviderWithNavigate";

const MainLayout = () => {
  return (
    <Auth0ProviderWithNavigate>
      <CartContextProvider>
        <Navbar />
        <Outlet />
        <Footer />
      </CartContextProvider>
    </Auth0ProviderWithNavigate>
  );
};

export default MainLayout;
