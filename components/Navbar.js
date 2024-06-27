import React from "react";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import Image from "next/image";

import { TiThMenu } from "react-icons/ti";
import {
  IoMdArrowDropdown,
  IoMdClose,
  IoMdArrowDropright,
} from "react-icons/io";
const menuItems = [
  {
    name: "Home",
    href: "/",
  },
  {
    name: "Ads",
    href: "/ads",
  },
  
  {
    name: "About",
    href: "#",
  },
  {
    name: "Contact",
    href: "#",
  },
 
];

const ExampleNavbarFour = () => {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div className="absolute w-full text-white ">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-2 py-2 md:py-8 sm:px-6 lg:px-2">
        <div className="inline-flex items-center space-x-2">
       <Link href={"/"}> <Image width={100} height={100}  src={"/logo.png"}></Image></Link>
        </div>
        <div className="hidden lg:block ml-12">
          <ul className="ml-12 inline-flex space-x-8">
            {menuItems.map((item) => (
              <li key={item.name}>
                <a
                  href={item.href}
                  className="inline-flex items-center text-sm font-semibold text-white-800 hover:text-white-900"
                >
                  {item.name}
                 
                </a>
              </li>
            ))}
          </ul>
        </div>
        <div className="flex grow justify-end">
         
        </div>
        <div className="ml-2 mt-2 hidden lg:block">
          
        </div>
        <div className="ml-2 lg:hidden">
          <TiThMenu onClick={toggleMenu} className="h-6 w-6 cursor-pointer" />
        </div>
        {isMenuOpen && (
          <div className="absolute inset-x-0 top-0 z-50 origin-top-right transform p-2 transition lg:hidden">
            <div className="divide-y-2 divide-gray-50 rounded-lg bg-white shadow-lg ring-1 ring-black ring-opacity-5">
              <div className="px-5 pb-6 pt-5">
                <div className="flex items-center justify-between">
                  <div className="inline-flex items-center space-x-2">
                  <Image width={100} height={100}  src={"/logo.png"}></Image>
                  </div>
                  <div className="-mr-2">
                    <button
                      type="button"
                      onClick={toggleMenu}
                      className="inline-flex text-black items-center justify-center rounded-md p-2 text-white-400 hover:bg-gray-100 hover:text-white-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
                    >
                      <span className="sr-only">Close menu</span>
                      <IoMdClose className="h-6 w-6" aria-hidden="true" />
                    </button>
                  </div>
                </div>
                <div className="mt-6">
                  <nav className="grid text-black gap-y-4">
                    {menuItems.map((item) => (
                      <a
                        key={item.name}
                        href={item.href}
                        className="-m-3 flex items-center rounded-md p-3 text-sm font-semibold hover:bg-gray-50"
                      >
                        <span className="ml-3 text-base font-medium text-white-900">
                          {item.name}
                        </span>
                       
                      </a>
                    ))}
                  </nav>
                </div>
               
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
export default ExampleNavbarFour;
