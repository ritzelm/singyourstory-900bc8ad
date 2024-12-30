import { createBrowserRouter } from "react-router-dom";
import Index from "./pages/Index";
import About from "./pages/About";
import Create from "./pages/Create";
import Pricing from "./pages/Pricing";
import AGB from "./pages/AGB";
import Datenschutz from "./pages/Datenschutz";
import Impressum from "./pages/Impressum";
import Summary from "./pages/Summary";
import Success from "./pages/Success";
import Blog from "./pages/Blog";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Index />,
  },
  {
    path: "/about",
    element: <About />,
  },
  {
    path: "/create",
    element: <Create />,
  },
  {
    path: "/pricing",
    element: <Pricing />,
  },
  {
    path: "/agb",
    element: <AGB />,
  },
  {
    path: "/datenschutz",
    element: <Datenschutz />,
  },
  {
    path: "/impressum",
    element: <Impressum />,
  },
  {
    path: "/summary",
    element: <Summary />,
  },
  {
    path: "/success",
    element: <Success />,
  },
  {
    path: "/blog",
    element: <Blog />,
  },
]);

export default router;