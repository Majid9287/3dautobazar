import React, { useState } from "react";
import { NextSeo } from "next-seo";
import Image from "next/image";
import { FaPlus } from "react-icons/fa6";
import { CgMathMinus } from "react-icons/cg";

import styles from "@/styles/Color.module.css";
const faqs = [
  {
    question: "What is AutoBazar?",
    answer:
      "AutoBazar is a platform where you can buy and sell cars with a unique 3D viewing experience.",
  },
  {
    question: "How do I create a listing?",
    answer:
      "To create a listing, sign up for an account, click on 'Add Listing', and follow the steps to upload your car's details and images.",
  },
  {
    question: "What are the benefits of 3D viewing?",
    answer:
      "3D viewing allows potential buyers to have a comprehensive and interactive view of the car, enhancing their buying experience.",
  },
  {
    question: "Is there any cost to list my car?",
    answer: "Listing your car on AutoBazar is completely free of charge.",
  },
  {
    question: "How do I contact support?",
    answer:
      "You can contact our support team via the live chat option available on our website or by emailing support@autobazar.com.",
  },
  {
    question: "Are all features available on the website?",
    answer:
      "We have not provided all features on the website. Users need to use the Android app for all features.",
  },
  {
    question: "How do I upload ads?",
    answer: "Ads can only be uploaded via the Android app.",
  },
  {
    question: "How do I upload images for 3D models?",
    answer: "Images for 3D models must be uploaded through the Android app.",
  },
];

const About = () => {
  const [showAnswers, setShowAnswers] = useState(
    Array(faqs.length).fill(false)
  );

  const toggleAnswer = (index) => {
    const newShowAnswers = [...showAnswers];
    newShowAnswers[index] = !newShowAnswers[index];
    setShowAnswers(newShowAnswers);
  };

  return (
    <>
      <NextSeo
        title="About Us - AutoBazar"
        description="Learn more about AutoBazar, our mission, and how we provide a unique car buying and selling experience."
        canonical="https://3dautobazar.com/about"
        openGraph={{
          url: "https://3dautobazar.com/about",
          title: "About Us - AutoBazar",
          description:
            "Learn more about AutoBazar, our mission, and how we provide a unique car buying and selling experience.",
        }}
      />
      <main className={` ${styles.gradientBg}`}>
        <section className="max-w-screen-xl mx-auto py-16 px-4">
          <div className="text-center pt-24 flex justify-between ss">
            <div>
              <h1 className="text-4xl font-bold mb-6">About Us</h1>
              <p className="text-lg mb-4">
                AutoBazar is revolutionizing the way you buy and sell cars. Our
                platform offers a unique 3D viewing experience that allows
                potential buyers to explore every angle of a car before making a
                purchase.
              </p>
            </div>
           
              
          </div>
        </section>
        <section className="max-w-screen-xl mx-auto py-16 px-4">
          <div className="text-center">
            <h2 className="text-3xl font-bold mb-6">
              Frequently Asked Questions
            </h2>
          </div>
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className="p-4 border rounded-lg bg-white shadow-md"
              >
                <h3 className="text-xl font-semibold mb-2 flex justify-between">
                  {faq.question}
                  <button
                    onClick={() => toggleAnswer(index)}
                    className="ml-4 text-blue-500 underline"
                  >
                    {showAnswers[index] ? <CgMathMinus /> : <FaPlus />}
                  </button>
                </h3>
                {showAnswers[index] && <p>{faq.answer}</p>}
              </div>
            ))}
          </div>
        </section>
      </main>
    </>
  );
};

export default About;
