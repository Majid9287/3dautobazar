import "@/styles/globals.css";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useRouter } from "next/router";
import { useEffect } from "react";

export default function App({ Component, pageProps }) {
 



  return (<>
         <Navbar/>
          <Component {...pageProps} />
           <Footer />
          </>
  );
}
