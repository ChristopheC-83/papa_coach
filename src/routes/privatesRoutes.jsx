
import MyCoach from "@/pages/connectedPages/athletes/MyCoach/MyCoach";
import MyWorkout from "@/pages/connectedPages/athletes/MyWorkout/MyWorkout";
import Profile from "@/pages/connectedPages/athletes/Profile/Profile";
import Athletes from "@/pages/connectedPages/coachs/Athletes/Athletes";
import Biography from "@/pages/connectedPages/coachs/Biography/Biography";
import Invitations from "@/pages/connectedPages/coachs/Invitations/Invitations";
import MyCoachWorkout from "@/pages/connectedPages/coachs/MyCoachWorkout/MyCoachWorkout";
import PrepareWorkout from "@/pages/connectedPages/coachs/PrepareWorkout/PrepareWorkout";
import Resources from "@/pages/connectedPages/coachs/Resources/Resources";
import TypicalsSessions from "@/pages/connectedPages/coachs/TypicalSessions/TypicalsSessions";
import ConnectedRoute from "@/pages/routeGuards/ConnectedRoute";
import { Route } from "react-router-dom";


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
    path: "coach/prepare/:athleteId", // L'ID est directement ici
    element: (
      <ConnectedRoute allowedRole="coach">
        <PrepareWorkout />
      </ConnectedRoute>
    ),
  },
  {
    path: "coach/workout",
    element: (
      <ConnectedRoute allowedRole="coach">
        <MyCoachWorkout />
      </ConnectedRoute>
    ),
  },
];
