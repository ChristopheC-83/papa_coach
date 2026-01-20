import Home from "@/pages/noConnectedPages/Home";
import Login from "@/pages/noConnectedPages/Login";
import Register from "@/pages/noConnectedPages/Register";
import NoConnectedRoute from "@/pages/routeGuards/NoConnectedRoute";

export const publicRoutes = [
  { path: "/", element: <Home /> },
  {
    path: "login",
    element: (
      <NoConnectedRoute>
        <Login />
      </NoConnectedRoute>
    ),
  },
  {
    path: "register",
    element: (
      <NoConnectedRoute>
        <Register />
      </NoConnectedRoute>
    ),
  },
];
