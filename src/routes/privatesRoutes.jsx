import Profile from "@/pages/connectedPages/Profile";
import ConnectedRoute from "@/pages/routeGuards/ConnectedRoute";

export const privateRoutes = [
  {
    path: "profile",
    element: (
      <ConnectedRoute>
        <Profile />
      </ConnectedRoute>
    ),
  },
  // Tes futures routes (planning, coaching, etc.) iront ici
];
