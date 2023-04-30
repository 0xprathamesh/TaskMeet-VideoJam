import React from "react";
import { ConnectKitButton } from "connectkit";
import Link from "next/link";
const Navbar = () => {
  return (
    <header className="py-4 mt-5">
      <div className="container mx-auto  ">
        <div className="flex justify-between items-center">
          <Link href="/">
            <h1 className="text-xl sm:text-2xl font-primary font-semibold  whitespace-nowrap bg-gradient-to-r from-green-300 via-blue-500 to-purple-600 bg-clip-text text-transparent ">
              TaskMeet
            </h1>
          </Link>
          <div className="flex justify-between items-center">
            <Link href="/tasks">
              {" "}
              <ul className="mx-5">
                <li className="hidden text-lg font-primary md:inline-flex text-white hover:border-b-2 border-purple-600">
                  Your Tasks
                </li>
              </ul>
            </Link>
            <ConnectKitButton />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
