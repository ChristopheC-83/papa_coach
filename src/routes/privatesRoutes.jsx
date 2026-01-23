
import Profile from "@/pages/connectedPages/athletes/Profile";
import MyWorkout from "@/pages/connectedPages/athletes/MyWorkout";
import MyCoach from "@/pages/connectedPages/athletes/MyCoach";
import Athletes from "@/pages/connectedPages/coachs/Athletes";
import PrepareWorkout from "@/pages/connectedPages/coachs/PrepareWorkout";
import ConnectedRoute from "@/pages/routeGuards/ConnectedRoute";
import Invitations from "@/pages/connectedPages/coachs/Invitations";
import Biography from "@/pages/connectedPages/coachs/Biography";
import TypicalsSessions from "@/pages/connectedPages/coachs/TypicalsSessions";
import Resources from "@/pages/connectedPages/coachs/Resources";

export const privateRoutes = [
  {
    // Pour tous les connectés (coachs et athletes)
    path: "athlete/profile",
    element: (
      <ConnectedRoute allowedRole="athlete">
        <Profile />
      </ConnectedRoute>
    ),
  },
  {
    path: "athlete/workout",
    element: (
      <ConnectedRoute allowedRole="athlete">
        <MyWorkout />
      </ConnectedRoute>
    ),
  },
  {
    path: "athlete/coach",
    element: (
      <ConnectedRoute allowedRole="athlete">
        <MyCoach />
      </ConnectedRoute>
    ),
  },
  //  Pour les coachs
  {
    path: "coach/invitation",
    element: (
      <ConnectedRoute allowedRole="coach">
        <Invitations />
      </ConnectedRoute>
    ),
  },
  {
    path: "coach/biography",
    element: (
      <ConnectedRoute allowedRole="coach">
        <Biography />
      </ConnectedRoute>
    ),
  },
  {
    path: "coach/typicals_sessions",
    element: (
      <ConnectedRoute allowedRole="coach">
        <TypicalsSessions />
      </ConnectedRoute>
    ),
  },
  {
    path: "coach/resources",
    element: (
      <ConnectedRoute allowedRole="coach">
        <Resources />
      </ConnectedRoute>
    ),
  },
  {
    path: "coach/athletes",
    element: (
      <ConnectedRoute allowedRole="coach">
        <Athletes />
      </ConnectedRoute>
    ),
  },
  {
    path: "coach/prepareWorkout",
    element: (
      <ConnectedRoute allowedRole="coach">
        <PrepareWorkout />
      </ConnectedRoute>
    ),
  },
];
