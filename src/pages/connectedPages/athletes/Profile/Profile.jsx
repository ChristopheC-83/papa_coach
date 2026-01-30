/* eslint-disable react-hooks/exhaustive-deps */
import { useMyCoach } from "@/customHooks/useMyCoach";
import { useUserStore } from "@/store/user/useUserStore";
import { useEffect } from "react";
import { AVAILABLE_SPORTS } from "@/constants/Profile/sports";
import { AVAILABLE_EXPERTISES } from "@/constants/Profile/expertises";
import { FiUser } from "react-icons/fi";
import TitlePage from "@/components/custom/TitlePage";
import AthleteName from "./components/AthleteName";
import AthleteStatus from "./components/AthleteStatus/AthleteStatus";
import Logout from "./components/Logout";
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
    <div className="w-full md:w-fit max-w-4xl mx-auto mt-5 p-4 space-y-6 pb-24 ">
      <TitlePage titlePage="Mon Profil" iconPage={<FiUser />} />

      <div className="w-full mx-auto flex max-lg:flex-col justify-between gap-4 max-lg:items-center">
        <div className="flex flex-col w-full max-w-md">
          {/* --- SECTION IDENTITÉ --- */}
          <AthleteName user={user} />
          {/* --- STATUT & COACH --- */}
          <AthleteStatus user={user} coachData={coachData} />

          <div className="max-lg:hidden w-full max-w-md flex flex-col gap-4">
            {/* --- ACTIONS --- */}
            {user?.role === "coach" && <CoachCode />}
            <Logout logout={logout} />
          </div>
        </div>

        {/*  SPORTS PRATIQUES POUR ATHLETES */}
        {user?.role === "athlete" && (
          <BadgeSelector
            items={AVAILABLE_SPORTS}
            dbField="favorite_sports"
            title="Mes 3 Sports Prioritaires"
            maxSelection={3}
          />
        )}
        <div className="flex flex-col gap-6">
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

              <div className="md:hidden">
                <CoachCode />
              </div>
            </>
          )}
        </div>

        <div className="lg:hidden w-full max-w-md">
          {/* --- ACTIONS --- */}
          <Logout logout={logout} />
        </div>
      </div>
    </div>
  );
}
