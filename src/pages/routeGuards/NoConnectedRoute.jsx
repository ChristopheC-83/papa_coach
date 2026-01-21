import { Navigate } from "react-router-dom";
import { useUserStore } from "@/store/user/useUserStore";
import Loader from "@/components/custom/Loader";

export default function NoConnectedRoute({ children }) {
  const user = useUserStore((state) => state.user);
  const isHydrated = useUserStore((state) => state.isHydrated);

  if (!isHydrated) return <Loader />;

  if (user) {
    return <Navigate to="/profile" replace />; 
  }

  return children;
}
