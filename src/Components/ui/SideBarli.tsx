import Link from "next/link";
import React from "react";
import A from "./a";

function SideBarLi({ user }) {
  const userRole = user?.user?.user || "Guest";
  const userName = user?.user?.name;

  const student: { title: string; href: string }[] = [
    {
      title: "Leave",
      href: "/user/leave",
    },
  ];

  const faculty: { title: string; href: string }[] = [
   
  ];
  const admin: { title: string; href: string }[] = [
    
  ];
  const loginCommune: { title: string; href: string }[] = [
    {
      title: userName || "Profile",
      href: "/profile",
    },
    {
      title: "Dashboard",
      href: "/dashboard",
    },
  ];
  const bottomCommune: { title: string; href: string }[] = [
    {
      title: "Logout",
      href: "/logout",
    },
  ];

  const guest: { title: string; href: string }[] = [
    {
      title: "Sign In",
      href: "/login",
    },
    {
      title: "Sign Up",
      href: "/signUp",
    },
  ];

  const components =
    userRole === "Guest"
      ? guest
      : userRole === "student"
        ? student
        : userRole === "faculty"
          ? faculty
          : userRole === "admin"
            ? admin
            : null;
  return (
    <>
      {userRole !== "Guest" ? (
        <>
          <A links={{ linkDetails: loginCommune }} />
          <A links={{ linkDetails: components }} />
          <A links={{ linkDetails: bottomCommune }} />
        </>
      ) : (
        <>
          <A links={{ linkDetails: guest }} />
        </>
      )}
    </>
  );
}

export default SideBarLi;
