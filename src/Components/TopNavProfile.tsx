import React from "react";
import Image from "next/image";
import { useState } from "react";
import A from "./ui/a";



function TopNavProfile({ user }) {
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const toggleUserMenu = () => setIsUserMenuOpen(!isUserMenuOpen);

  const userRole = user?.user?.user || "Guest";
  const userName = user?.user?.name;
  const student: { title: string; href: string }[] = [
    {
      title: "Student",
      href: "#",
    },
  ];
  const hod: { title: string; href: string }[] = [
    {
      title: "Hod",
      href: "/docs/primitives/alert-dialog",
    }
  ];
  const faculty: { title: string; href: string }[] = [
    {
      title: "Faculty",
      href: "/docs/primitives/alert-dialog",
    }
  ];
  const admin: { title: string; href: string }[] = [
    {
      title: "Admin",
      href: "/docs/primitives/alert-dialog",
    }
  ];
  const guest: { title: string; href: string }[] = [
    {
      title: "Sign in",
      href: "/login",
    },
    {
      title: "Sign Up",
      href: "/signUp",
    },
  ];
  const commune: { title: string; href: string }[] = [
    {
      title: userName || "Profile",
      href: "/profile",
    },
    {
      title: "Dashboard",
      href: "/dashboard",
    },
    {
      title: "Logout",
      href: "/logout",
    },
  ];
  const communeForAll: { title: string; href: string }[] = [
    {
      title: "Home",
      href: "/",
    },
    {
      title: "About",
      href: "/about",
    },
    {
      title: "Blog",
      href: "/blog    ",
    },
  ];
  const communeComponents = commune;
  const components =
    userRole === "Guest"
      ? guest
      : userRole === "student"
        ? student
        : userRole === "hod"
          ? hod
          : userRole === "faculty"
            ? faculty
            : userRole === "admin"
              ? admin
              : null;
  return (
    <>
      <A links={{ linkDetails: communeForAll }} />

      {userRole !== "Guest" ? (
        <>
          <div className="ms-4"></div>
          <div>
            <button
              type="button"
              className="flex text-sm bg-gray-800 rounded-full focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600"
              aria-expanded={isUserMenuOpen}
              onClick={toggleUserMenu}
            >
              <span className="sr-only">Open user menu</span>
              <Image
                src={user?.user?.image}
                alt="Profile Picture"
                width={32}
                height={32}
              />
            </button>
          </div>

          {isUserMenuOpen && (
            <div className="absolute right-0 top-4 mt-10 w-48 bg-white rounded-lg shadow-lg dark:bg-gray-800">
              <div className="py-1">
                <A links={{ linkDetails: components }} />
                <A links={{ linkDetails: communeComponents }} />
              </div>
            </div>
          )}
        </>
      ) : (
        <>
          <A links={{ linkDetails: guest }} />
          <div className="ms-4"></div>
          <div>
            <button
              type="button"
              className="flex text-sm bg-gray-800 rounded-full focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600"
              aria-expanded={isUserMenuOpen}
              onClick={toggleUserMenu}
            >
              <span className="sr-only">Open user menu</span>
              <Image
                src="https://flowbite.com/docs/images/people/profile-picture-5.jpg"
                alt="Profile Picture"
                width={32}
                height={32}
              />
            </button>
          </div>
          {isUserMenuOpen && (
            <div className="absolute right-0 top-4 mt-10 w-48 bg-white rounded-lg shadow-lg dark:bg-gray-800">
              <div className="py-1">
                <p className="block px-4 py-2 text-sm text-gray-800 hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700">
                  Hello Guest
                </p>
                <A links={{ linkDetails: guest }} />
              </div>
            </div>
          )}
        </>
      )}
    </>
  );
}

export default TopNavProfile;
