import {
  Route,
  RouterProvider,
  createHashRouter,
  createBrowserRouter,
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
import { Error, NotFound, AuthenticationGuard } from "./components";

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
          errorElement={<Error />}
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
      <Route path="checkout" element={<AuthenticationGuard component={Checkout} />} errorElement={<Error />} />
      <Route path="*" element={<NotFound />} errorElement={<Error />} />  {/* Catch all route */}
    </Route>
  )
);

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;
