import {
  Route,
  RouterProvider,
  createHashRouter,
  createRoutesFromElements,
} from "react-router-dom";
import { MainLayout, ProductListLayout, mainLoader } from "./Layouts";
import { Earphones, Headphones, Home, ProductDetails, Speakers, earphonesLoader, headphonesLoader, productsLoader, speakersLoader } from "./Pages";
import { cartAction } from "./Pages/ProductDetails/components";

const router = createHashRouter(
  createRoutesFromElements(
    <Route path="/" element={<MainLayout />} loader={mainLoader}>
      <Route index element={<Home />} />
      <Route element={<ProductListLayout />}>
        <Route path="headphones" element={<Headphones />} loader={headphonesLoader}/>
        <Route path="speakers" element={<Speakers />} loader={speakersLoader}/>
        <Route path="earphones" element={<Earphones />} loader={earphonesLoader}/>
        <Route path="product/:slug" element={<ProductDetails />} loader={productsLoader} action={cartAction}/>
      </Route>
    </Route>
  )
);

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;
