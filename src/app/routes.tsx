import { createBrowserRouter } from "react-router";
import { HomePage } from "./pages/HomePage";
import { ProductsPage } from "./pages/ProductsPage";
//import { AboutPage } from "./pages/AboutPage";
import { ContactPage } from "./pages/ContactPage";
import { Layout } from "./components/Layout";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Layout,
    children: [
      { index: true, Component: HomePage },
      { path: "products/*", Component: ProductsPage },
      //{ path: "about", Component: AboutPage },
      { path: "contact", Component: ContactPage },
    ],
  },
]);
