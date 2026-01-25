/* eslint-disable react-hooks/exhaustive-deps */
import { useMyCoach } from "@/customHooks/useMyCoach";
import { useUserStore } from "@/store/user/useUserStore";
import { useEffect } from "react";
import TitlePage from "@/components/custom/TitlePage";
import {
  FiUser,
} from "react-icons/fi";
import AthleteName from "./components/AthleteName";
import AthleteStatus from "./components/AthleteStatus";
import Logout from "./components/Logout";
import SportSelector from "./components/SportSelector";

export default function Profile() {
  const { user, logout } = useUserStore();
  const { refreshStatus } = useMyCoach();

  const { coachData } = useMyCoach();

  useEffect(() => {
    refreshStatus();
  }, []);

  return (
    <div className="w-full max-w-md mx-auto mt-5 p-4 space-y-8 pb-24">
      <TitlePage titlePage="Mon Profil" iconPage={<FiUser />} />

      {/* --- SECTION IDENTITÉ --- */}
      <AthleteName user={user} />

      {/* --- STATUT & COACH --- */}
      <AthleteStatus user={user} coachData={coachData} />
      {/*  SPORTS PRATIQUES */}
      <SportSelector/>

      {/* --- ACTIONS --- */}
      <Logout logout={logout} />
    </div>
  );
}
