import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import { MainLayout, ProductListLayout } from "./Layouts";
import { Earphones, Headphones, Home, Speakers, earphonesLoader, headphonesLoader, speakersLoader } from "./Pages";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<MainLayout />}>
      <Route index element={<Home />} />
      <Route element={<ProductListLayout />}>
        <Route path="headphones" element={<Headphones />} loader={headphonesLoader}/>
        <Route path="speakers" element={<Speakers />} loader={speakersLoader}/>
        <Route path="earphones" element={<Earphones />} loader={earphonesLoader}/>
      </Route>
    </Route>
  )
);

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;
