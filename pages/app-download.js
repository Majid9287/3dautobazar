import React from "react";
import { NextSeo } from "next-seo";
import Image from "next/image";

import styles from "@/styles/Color.module.css";
const DownloadApp = () => {
  return (
    <>
      <NextSeo
        title="Download App - AutoBazar"
        description="Download the AutoBazar app to access all features, upload ads, and images for 3D models."
        canonical="https://3dautobazar.com/download"
        openGraph={{
          url: "https://3dautobazar.com/download",
          title: "Download App - AutoBazar",
          description: "Download the AutoBazar app to access all features, upload ads, and images for 3D models.",
        }}
      />
      <main className={` ${styles.gradientBg}`}>
        <section className="max-w-screen-xl mx-auto pt-32 px-4">
          <div className="text-center">
            <h1 className="text-4xl font-bold mb-6">Download the AutoBazar App</h1>
            <p className="text-lg mb-4">
              Get the full AutoBazar experience by downloading our app. Access all features, upload ads, and add images for 3D models seamlessly.
            </p>
            <div className="flex justify-center space-x-4  relative">
              <a className="bg-blue-500 rounded-lg px-4 py-2" href="https://play.google.com/store/apps/details?id=com.autobazar" target="_blank" rel="noopener noreferrer">
               Download app
              </a>

            </div>
          </div>
        </section>
        <section className="max-w-screen-xl mx-auto py-8 px-4">
          <div className="text-center">
            <h2 className="text-3xl font-bold mb-6">App Features</h2>
          </div>
          <div className="space-y-4">
            <div className="p-4 border rounded-lg bg-white shadow-md">
              <h3 className="text-xl font-semibold mb-2">Access All Features</h3>
              <p>
                Our app provides all the features you need to buy and sell cars, including advanced search options, notifications, and more.
              </p>
            </div>
            <div className="p-4 border rounded-lg bg-white shadow-md">
              <h3 className="text-xl font-semibold mb-2">Upload Ads</h3>
              <p>
                Easily create and upload ads directly from the app. Reach a wider audience and sell your car faster.
              </p>
            </div>
            <div className="p-4 border rounded-lg bg-white shadow-md">
              <h3 className="text-xl font-semibold mb-2">3D Model Images</h3>
              <p>
                Upload images for 3D models using the app to provide potential buyers with an interactive viewing experience.
              </p>
            </div>
          </div>
        </section>
        <section className="max-w-screen-xl mx-auto py-16 px-4">
          <div className="text-center">
            <h2 className="text-3xl font-bold mb-6">App Screenshots</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <Image src="/images/4.jpg" width={300} height={600} alt="App Screenshot 1" className="rounded-lg mx-auto" />
            <Image src="/images/6.jpg" width={300} height={600} alt="App Screenshot 2" className="rounded-lg mx-auto" />
            <Image src="/images/3.jpg" width={300} height={600} alt="App Screenshot 3" className="rounded-lg mx-auto" />
          </div>
        </section>
      </main>
    </>
  );
};

export default DownloadApp;
