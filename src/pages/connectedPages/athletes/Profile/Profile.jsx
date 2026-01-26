/* eslint-disable react-hooks/exhaustive-deps */
import { useMyCoach } from "@/customHooks/useMyCoach";
import { useUserStore } from "@/store/user/useUserStore";
import { useEffect } from "react";
import TitlePage from "@/components/custom/TitlePage";
import { FiUser } from "react-icons/fi";
import AthleteName from "./components/AthleteName";
import AthleteStatus from "./components/AthleteStatus";
import Logout from "./components/Logout";
import { AVAILABLE_SPORTS } from "@/constants/Profile/sports";
import { AVAILABLE_EXPERTISES } from "@/constants/Profile/expertises";
import BadgeSelector from "./components/BadgeSelector";
import CoachCode from "./components/CoachCode";

export default function Profile() {
  const user = useUserStore((state) => state.user);
  const logout = useUserStore((state) => state.logout);
  const { refreshStatus } = useMyCoach();
  // console.log(user);
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

      {/*  SPORTS PRATIQUES POUR ATHLETES */}
      {user?.role === "athlete" && (
        <BadgeSelector
          items={AVAILABLE_SPORTS}
          dbField="favorite_sports"
          title="Mes 3 Sports Prioritaires"
          maxSelection={3}
        />
      )}
      {user?.role === "coach" && (
        <BadgeSelector
          items={AVAILABLE_SPORTS}
          dbField="favorite_sports"
          title="Mes Sports Pratiqués"
          maxSelection={AVAILABLE_SPORTS.length}
        />
      )}
      {user?.role === "coach" && (
        <>
          <BadgeSelector
            items={AVAILABLE_EXPERTISES}
            dbField="specialities"
            title="Mes Spécialités"
            maxSelection={AVAILABLE_EXPERTISES.length}
          />

          <CoachCode />
        </>
      )}

      {/* --- ACTIONS --- */}
      <Logout logout={logout} />
    </div>
  );
}
