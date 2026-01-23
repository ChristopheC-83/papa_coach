import { Navigate } from "react-router-dom";
import { useUserStore } from "@/store/user/useUserStore";
import Loader from "@/components/custom/Loader";

export default function ConnectedRoute({ children, allowedRole }) {
  const user = useUserStore((state) => state.user);
  const isHydrated = useUserStore((state) => state.isHydrated);

  if (!isHydrated) return <Loader />;

  if (!user) {
    return <Navigate to="/login" replace />;
  }
  const userRole = user.role;

  if (allowedRole === "coach" && userRole !== "coach") {
    console.warn("Accès interdit : Coach uniquement.");
    return <Navigate to="/athlete/profile" replace />;
  }

  if (
    allowedRole === "athlete" &&
    userRole !== "athlete" &&
    userRole !== "coach"
  ) {
    console.warn("Accès interdit : Rôle insuffisant.");
    return <Navigate to="/" replace />;
  }

  return children;
}