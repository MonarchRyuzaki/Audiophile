import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import { MainLayout } from "./Layouts";
import { Earphones, Headphones, Home, Speakers } from "./Pages";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<MainLayout />}>
      <Route index element={<Home />} />
      <Route path="headphones" element={<Headphones />}/>
      <Route path="speakers" element={<Speakers />}/>
      <Route path="earphones" element={<Earphones />}/>
    </Route>
  )
);

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;
