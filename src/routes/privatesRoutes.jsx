import MyAthletes from "@/pages/connectedPages/MyAthletes";
import MyWorkout from "@/pages/connectedPages/MyWorkout";
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
  {
    path: "coach/athletes",
    element: (
      <ConnectedRoute>
        <MyAthletes />
      </ConnectedRoute>
    ),
  },
  {
    path: "athlete/workout",
    element: (
      <ConnectedRoute>
        <MyWorkout />
      </ConnectedRoute>
    ),
  },
  // Tes futures routes (planning, coaching, etc.) iront ici
];
