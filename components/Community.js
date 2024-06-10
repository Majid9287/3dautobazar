import styles from "@/styles/Color.module.css";
const Community = () => {return (
  <div className="max-w-screen-xl md:px-8 px-2 text-red-800 mx-auto justify-center py-2 ">
    <div className={`p-12 rounded-lg ${styles.gradientBg3}`}>
      <div className="py-2 ">
        <h2 className="font-bold text-3xl">
          Join Our Auto Enthusiast Community
        </h2>
      </div>
      <div className="md:flex text-black">
        <div className="md:w-2/4">
          {" "}
          <div>
            If you need to use a one-off gap value that doesn’t make sense to
            include in your theme, use square brackets to generate a property on
            the fly using any arbitrary value.If you need to use a one-off gap
            value that doesn’t make sense to include in your theme, use square
            brackets to generate a property on the fly using any arbitrary
            value.
          </div>
          <div className="md:p-12 py-12">
            <div className="bg-white items-center rounded-full mx-auto md:mb-3  max-w-screen-sm flex sm:space-y-0">
              <div className="relative w-full">
                <label
                  for="email"
                  className="hidden mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                >
                  Email address
                </label>

                <input
                  className="block py-2 pl-10 w-full text-sm text-gray-900  rounded-full   "
                  placeholder="Enter your email"
                  type="email"
                  id="email"
                  required=""
                />
              </div>
              <div>
                <button
                  type="submit"
                  className="py-3 bg-red-800 px-5 w-full text-sm font-medium text-center text-white border cursor-pointer bg-primary-700 border-primary-600  rounded-full hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                >
                  Subscribe
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="md:w-2/4">
          <img
            src="/images/contact1.png"
            alt="Respond to Inquiries"
            className=" "
          />
        </div>
      </div>
    </div>
  </div>
)};

export default Community;
