import { useUserStore } from "@/store/user/useUserStore";
import React from "react";

export default function Profile() {
  const { user } = useUserStore((state) => state);
  return (
    <div>
      <p>Profile</p>
      <p>{user.email}</p>
      <p>{user.username}</p>
      <p>{user.role}</p>
    </div>
  );
}
