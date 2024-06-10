
import React from 'react'
import Link from 'next/link';
import styles from "@/styles/Color.module.css";
import {FaRegCircleRight } from "react-icons/fa6";
const FooterOne= () => {
  return (
    <footer className={`w-full text-black bg-gray-100 pt-16 `}>
      
      <hr className="mb-4" />
      <div className="mx-auto max-w-6xl items-center justify-between px-4 flex lg:px-0">
        <div className="inline-flex items-center pt-2">
       <Link href='/'> <span className={`font-bold `}>3d-AutoBazar</span></Link>
        </div>
        <div className="mt-4 md:mt-0">
          <p className="text-sm font-medium pb-1">© 2024 3d-AutoBazar. All rights reserved.</p>
        </div>
      </div>
      <hr className="mt-4" />
    </footer>
  )
}
export default FooterOne