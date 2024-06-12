import Link from "next/link";
import React from "react";

const student: { title: string; href: string }[] = [
  {
    title: "Student",
    href: "#",
  },
];
const hod: { title: string; href: string }[] = [
  {
    title: "Hod",
    href: "#",
  },
];
const faculty: { title: string; href: string }[] = [
  {
    title: "Faculty",
    href: "#",
  },
];
const admin: { title: string; href: string }[] = [
  {
    title: "Admin",
    href: "#",
  },
];
const loginCommune: { title: string; href: string }[] = [
  {
    title: "Dashboard",
    href: "/dashboard",
  },
  {
    title: "Logout",
    href: "/logout",
  },
];

const guest: { title: string; href: string }[] = [
  {
    title: "Sign In",
    href: "/Login",
  },
  {
    title: "Sign Up",
    href: "/signUp",
  },
];

function SideBarLi({ user }) {
  const userRole = user?.user?.user || "Guest";
  
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
     
      {userRole !== "Guest" ? (
        <>
          {components?.map((component, i) => (
            <li key={i}>
              <Link
                href={component.href}
                className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
              >
                <svg
                  className="w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 22 21"
                >
                  <path d="M16.975 11H10V4.025a1 1 0 0 0-1.066-.998 8.5 8.5 0 1 0 9.039 9.039.999.999 0 0 0-1-1.066h.002Z" />
                  <path d="M12.5 0c-.157 0-.311.01-.565.027A1 1 0 0 0 11 1.02V10h8.975a1 1 0 0 0 1-.935c.013-.188.028-.374.028-.565A8.51 8.51 0 0 0 12.5 0Z" />
                </svg>
                <span className="ms-3">{component.title}</span>
              </Link>
            </li>
          ))}

          {loginCommune?.map((component, i) => (
            <li key={i}>
              <Link
                href={component.href}
                className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
              >
                <svg
                  className="w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 22 21"
                >
                  <path d="M16.975 11H10V4.025a1 1 0 0 0-1.066-.998 8.5 8.5 0 1 0 9.039 9.039.999.999 0 0 0-1-1.066h.002Z" />
                  <path d="M12.5 0c-.157 0-.311.01-.565.027A1 1 0 0 0 11 1.02V10h8.975a1 1 0 0 0 1-.935c.013-.188.028-.374.028-.565A8.51 8.51 0 0 0 12.5 0Z" />
                </svg>
                <span className="ms-3">{component.title}</span>
              </Link>
            </li>
          ))}
        </>
      ) : (
        <>
          {guest?.map((component, i) => (
            <li key={i}>
              <Link
                href={component.href}
                className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
              >
                <svg
                  className="w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 22 21"
                >
                  <path d="M16.975 11H10V4.025a1 1 0 0 0-1.066-.998 8.5 8.5 0 1 0 9.039 9.039.999.999 0 0 0-1-1.066h.002Z" />
                  <path d="M12.5 0c-.157 0-.311.01-.565.027A1 1 0 0 0 11 1.02V10h8.975a1 1 0 0 0 1-.935c.013-.188.028-.374.028-.565A8.51 8.51 0 0 0 12.5 0Z" />
                </svg>
                <span className="ms-3">{component.title}</span>
              </Link>
            </li>
          ))}
        </>
      )}
    </>
  );
}

export default SideBarLi;
