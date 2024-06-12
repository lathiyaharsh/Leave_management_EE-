import React from "react";
import Link from "next/link";
interface LinkDetails {
    linkDetails: { href: string; title: string }[] | null;
}
function A({links} : { links: LinkDetails }) {
   const { linkDetails } = links;
   const components = linkDetails;
  return (
    <>
      {components?.map((component: { href: string; title: string }, i: number) => (
        <Link
          href={component.href}
          key={i}
          className="block px-4 py-2 text-sm text-gray-800 hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
        >
          {component.title}
        </Link>
      ))}
    </>
  );
}

export default A;