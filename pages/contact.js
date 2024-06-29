import React from "react";
import { useState } from "react";
import { useRouter } from "next/router";
import styles from "@/styles/Color.module.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FaEnvelope } from "react-icons/fa";
function contact() {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    country: "",
    subject: "",
    message: "",
  });

  const router = useRouter();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await fetch("/api/message/add-messege", {
        method: "POST",
        body: JSON.stringify(formData),
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (!response.ok) {
        setLoading(false);
        toast.error('Failed to submit form', {
          position: "top-right",
          autoClose: 1000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
        return;
        
      }
      toast.success("SMS Send successfully", {
        position: "top-right",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      setFormData({
        name: "",
        email: "",
        phone: "",
        country: "",
        subject: "",
        message: "",
      });
      setLoading(false);
    } catch (error) {
      
      toast.error('Failed to submit form', {
        position: "top-right",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
        setLoading(false); // Set loading state to false when the API call is complete
    
    }
    
  };
 
  return (
    <main className={` ${styles.gradientBg}`}>
      <div >
        <section className="py-32 text-gray-800">
         
          <div className="container  mx-auto text-gray-800 ">
          <ToastContainer
          position="top-right"
          autoClose={1000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
        />
            <div
              className="block rounded-lg shadow-lg py-24 md:py-12 px-2 md:px-6"
              style={{
                marginTop: "0px",
                background: "hsla(0, 0%, 100%, 0.8)",
                backdropFilter: "blur(30px)",
              }}
            >
              <div className="flex flex-wrap items-center justify-center">
                <div className="grow-0 shrink-0 basis-auto w-full xl:w-7/12">
                  <div className="flex justify-center">
                    
                      <div className="flex align-start">
                        <div className="shrink-0">
                          <div className="p-4 bg-blue-600 rounded-md shadow-md w-14 h-14 flex items-center justify-center">
                          <FaEnvelope style={{ color: 'white', fontSize: '2rem' }} />
                          </div>
                        </div>
                        <div className="grow ml-6">
                          <p className="font-bold mb-1">EMAIL ADDRESS</p>
                          <p className="text-gray-500">abdulmajid9287@gmail.com</p>
                     
                        </div>
                      </div>
                    
                    
                  </div>
                </div>
              </div>

              <div className={`max-w-screen-xl mt-24 px-8 py-16 mx-auto  text-gray-900 rounded-lg shadow-lg ${styles.gradientBg3}`}>
                <h2 className="text-4xl lg:text-5xl font-bold leading-tight mb-8">
                Contact Us!
                </h2>
                <form onSubmit={handleSubmit}>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="md:col-span-1">
                      <span className="uppercase text-sm text-gray-600 font-bold mb-2">
                        Full Name
                      </span>
                      <input
                        className="w-full bg-gray-100 text-gray-900 p-3 rounded-lg focus:outline-none focus:shadow-outline"
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div className="md:col-span-1">
                      <span className="uppercase text-sm text-gray-600 font-bold mb-2">
                        Email
                      </span>
                      <input
                        className="w-full bg-gray-100 text-gray-900 p-3 rounded-lg focus:outline-none focus:shadow-outline"
                        type="text"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div className="md:col-span-1">
                      <span className="uppercase text-sm text-gray-600 font-bold mb-2">
                        Phone
                      </span>
                      <input
                        className="w-full bg-gray-100 text-gray-900 p-3 rounded-lg focus:outline-none focus:shadow-outline"
                        type="text"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div className="md:col-span-1">
                      <span className="uppercase text-sm text-gray-600 font-bold mb-2">
                        Country
                      </span>
                      <input
                        className="w-full bg-gray-100 text-gray-900 p-3 rounded-lg focus:outline-none focus:shadow-outline"
                        type="text"
                        name="country"
                        value={formData.country}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div className="md:col-span-2">
                      <span className="uppercase text-sm text-gray-600 font-bold mb-2">
                        Subject
                      </span>
                      <input
                        className="w-full bg-gray-100 text-gray-900 p-3 rounded-lg focus:outline-none focus:shadow-outline"
                        type="text"
                        name="subject"
                        value={formData.subject}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div className="md:col-span-2">
                      <span className="uppercase text-sm text-gray-600 font-bold mb-2">
                        Message
                      </span>
                      <textarea
                        className="w-full bg-gray-100 text-gray-900 p-3 rounded-lg focus:outline-none focus:shadow-outline"
                        name="message"
                        rows="6"
                        value={formData.message}
                        onChange={handleChange}
                        required
                      ></textarea>
                    </div>
                  </div>
                  <div className="mt-8">
                    
                    <button
                type="submit"
                className="group relative flex w-full justify-center rounded-md bg-blue-600 py-2 px-3 text-sm font-semibold text-white hover:bg-blue-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                disabled={loading } // Disable the button when loading state is true
              >
                <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                  {loading && (
                    <svg
                      className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647zm7-2.647l3 2.647C19.865 17.824 21 15.042 21 12h-4a7.96 7.96 0 01-2 5.291zM14 4.515V0h-4v4.515A8.003 8.003 0 0112 4c1.657 0 3 1.343 3 3h-2c0-.552-.448-1-1-1s-1 .448-1 1h-2c0-1.657 1.343-3 3-3a3.96 3.96 0 012.586 1H14z"
                      ></path>
                    </svg>
                  )}
                </span>
                {loading ? "Loading..." : "Submit"}
              </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}

export default contact;
