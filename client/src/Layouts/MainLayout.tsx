import { Outlet } from "react-router-dom";
import { Slide, ToastContainer } from "react-toastify";
import { Auth0ProviderWithNavigate } from "../components/Auth0ProviderWithNavigate";
import { Footer, Navbar } from "../components/index";
import CartContextProvider from "../store/ShoppingCartContext";

const MainLayout = () => {
  return (
    <Auth0ProviderWithNavigate>
      <CartContextProvider>
        <Navbar />
        <Outlet />
        <Footer />
        <ToastContainer
          position="bottom-left"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop
          closeOnClick={false}
          rtl={false}
          pauseOnFocusLoss={false}
          draggable
          pauseOnHover={false}
          theme="light"
          transition={Slide}
        />
      </CartContextProvider>
    </Auth0ProviderWithNavigate>
  );
};

export default MainLayout;
