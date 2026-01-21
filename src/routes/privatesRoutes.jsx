
import Profile from "@/pages/connectedPages/athletes/Profile";
import MyWorkout from "@/pages/connectedPages/athletes/MyWorkout";
import MyCoach from "@/pages/connectedPages/athletes/MyCoach";
import Athletes from "@/pages/connectedPages/coachs/Athletes";
import PrepareWorkout from "@/pages/connectedPages/coachs/PrepareWorkout";
import ConnectedRoute from "@/pages/routeGuards/ConnectedRoute";

export const privateRoutes = [
  {
    // Pour tous les connectés (coachs et athletes)
    path: "athlete/profile",
    element: (
      <ConnectedRoute>
        <Profile />
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
  {
    path: "athlete/coach",
    element: (
      <ConnectedRoute>
        <MyCoach />
      </ConnectedRoute>
    ),
  },
  //  Pour les coachs
  {
    path: "coach/athletes",
    element: (
      <ConnectedRoute>
        <Athletes />
      </ConnectedRoute>
    ),
  },
  {
    path: "coach/prepareWorkout",
    element: (
      <ConnectedRoute>
        <PrepareWorkout />
      </ConnectedRoute>
    ),
  },
  // Tes futures routes (planning, coaching, etc.) iront ici
];
