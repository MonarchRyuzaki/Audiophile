import {
  Route,
  RouterProvider,
  createHashRouter,
  createRoutesFromElements,
} from "react-router-dom";
import { MainLayout, ProductListLayout } from "./Layouts";
import { Earphones, Headphones, Home, ProductDetails, Speakers, earphonesLoader, headphonesLoader, productsLoader, speakersLoader } from "./Pages";

const router = createHashRouter(
  createRoutesFromElements(
    <Route path="/" element={<MainLayout />}>
      <Route index element={<Home />} />
      <Route element={<ProductListLayout />}>
        <Route path="headphones" element={<Headphones />} loader={headphonesLoader}/>
        <Route path="speakers" element={<Speakers />} loader={speakersLoader}/>
        <Route path="earphones" element={<Earphones />} loader={earphonesLoader}/>
        <Route path="product/:slug" element={<ProductDetails />} loader={productsLoader}/>
      </Route>
    </Route>
  )
);

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;
