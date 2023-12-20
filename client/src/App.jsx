import {
  Route,
  RouterProvider,
  createHashRouter,
  createRoutesFromElements,
} from "react-router-dom";
import { MainLayout, ProductListLayout, mainLoader } from "./Layouts";
import {
  Checkout,
  Earphones,
  Headphones,
  Home,
  ProductDetails,
  Speakers,
  earphonesLoader,
  headphonesLoader,
  productsLoader,
  speakersLoader,
} from "./Pages";
import { cartAction } from "./Pages/ProductDetails/components";
import { Error, NotFound } from "./components";

const router = createHashRouter(
  createRoutesFromElements(
    <Route
      path="/"
      element={<MainLayout />}
      loader={mainLoader}
      errorElement={<Error />}
    >
      <Route index element={<Home />} />
      <Route element={<ProductListLayout />}>
        <Route
          path="headphones"
          element={<Headphones />}
          loader={headphonesLoader}
        />
        <Route
          path="speakers"
          element={<Speakers />}
          loader={speakersLoader}
          errorElement={<Error />}
        />
        <Route
          path="earphones"
          element={<Earphones />}
          loader={earphonesLoader}
          errorElement={<Error />}
        />
        <Route
          path="product/:slug"
          element={<ProductDetails />}
          loader={productsLoader}
          action={cartAction}
          errorElement={<Error />}
        />
      </Route>
      <Route path="checkout" element={<Checkout />} errorElement={<Error />} />
      <Route path="*" element={<NotFound />} errorElement={<Error />} />
    </Route>
  )
);

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;
