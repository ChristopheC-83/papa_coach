import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "./pages/layout/Layout";
import { publicRoutes } from "./routes/publicRoutes";
import { privateRoutes } from "./routes/privatesRoutes";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [...publicRoutes, ...privateRoutes],
  },
]);

export default function App() {
  return <RouterProvider router={router} />;
}
