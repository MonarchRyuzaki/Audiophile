import {
  Route,
  RouterProvider,
  Routes,
  createHashRouter,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import { MainLayout, ProductListLayout } from "./Layouts";
import {
  Callback,
  Checkout,
  Home,
  ProductDetails,
  Products,
  checkoutAction,
  productDetailsLoader,
  productsLoader,
} from "./Pages";
import { AuthenticationGuard, Error, NotFound } from "./components";

// to preserve state between two pages we can use search params url se search params lelo

const router = createBrowserRouter(
  // we need to use this instead of <HashRouter> for data layer apis
  createRoutesFromElements(
    // we need to use this instead of <Routes> for data layer apis
    <Route
      path="/"
      element={<MainLayout />} // loaders can be async
      errorElement={<Error />} // handles any sort of error that happens in the element (loader or the element)
    >
      <Route index element={<Home />} />
      <Route element={<ProductListLayout />}>
        <Route
          path=":productCategory"
          element={<Products />}
          loader={productsLoader} // fetches the data vefore we can visit the route if we use defer then we use suspense and await to show loading states and do things
          errorElement={<Error />}
        />
        <Route
          path="product/:slug"
          element={<ProductDetails />}
          loader={productDetailsLoader}
          errorElement={<Error />}
        />
      </Route>
      <Route
        path="checkout"
        // element={<AuthenticationGuard component={Checkout} />}
        element={<Checkout />}
        action={checkoutAction}
        errorElement={<Error />}
      />
      {/* Another way to do authentication when not using auth0 and loaders maybe to create a nested route where the parent is guard type 
      route where it checks if user is logged in if it is it renders the outlet else uses Navigate component to take to login page */}
      {/* This is because loaders run in parallel and will run even before we enter the page. The route and its children ka loader will happen parallely*/}
      {/* We need to check in if the user is logged in every loader inside a route to prevent unauthorized access if we dont use auth0
      and use redirect to go to login page */}
      <Route path="callback" element={<Callback />} errorElement={<Error />} />
      <Route path="*" element={<NotFound />} errorElement={<Error />} />
      {/* Catch all route */}
    </Route>
  )
);

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;
