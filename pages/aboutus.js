import React from "react";
import { useState } from "react";
import { useRouter } from "next/router";
import styles from "@/styles/Color.module.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FaEnvelope } from "react-icons/fa";
function contact() {
  return (
    <div>
      <div className={` text-white top-0  ${styles.customcolor}`}>
        <section className="py-32 ">
          <div className="container  mx-auto  ">
            <div
              className={`block rounded-lg shadow-lg pt-10 md:pt-12 px-2 md:px-6  ${styles.customcolor1}`}
              style={{
                marginTop: "-100px",

                backdropFilter: "blur(30px)",
              }}
            >
              <div className="flex flex-wrap items-center justify-center ">
                <div className="grow-0 shrink-0 basis-auto w-full xl:w-7/12 ">
                  <div className="flex justify-center text-center">
                    <div className="">
                    <h2 className="text-4xl lg:text-5xl font-bold leading-tight mb-8">
                  ABOUT US
                </h2>
                <p className="text-lg mt-4">
                We have a team for analysing the market dynamic situation with 24/7 support. We are providing Crypto and Forex trading Facilities to Peoples from last 2 years. We have 5000 members+ community on WhatsApp those follow us for Market latest analysed updates. This platform will help you start to advance level of trading.
                  </p>
                    </div>
                  </div>
                </div>
              </div>

              <div
                className={`max-w-screen-xl mt-24 px-8 py-16 mx-auto   rounded-lg shadow-lg ${styles.customcolor}`}
              >
                
                <section className="about-us container mx-auto p-24">
                
                  <div className="flex flex-wrap justify-between mt-4">
                    <div className="about-us-item w-64">
                      <h3 className="text-2xl font-bold mt-4">Our Mission</h3>
                      <p className="text-lg">
                        To make technology accessible to everyone.
                      </p>
                    </div>

                    <div className="about-us-item w-64">
                      <h3 className="text-2xl font-bold mt-4">Our Vision</h3>
                      <p className="text-lg">
                        To be the leading provider of innovative technology
                        solutions.
                      </p>
                    </div>

                    <div className="about-us-item w-64">
                      <h3 className="text-2xl font-bold mt-4">Our Values</h3>
                      <ul className="list-disc">
                        <li>Innovation</li>
                        <li>User-friendliness</li>
                        <li>Affordability</li>
                        <li>Teamwork</li>
                        <li>Community</li>
                      </ul>
                    </div>
                  </div>
                </section>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

export default contact;
