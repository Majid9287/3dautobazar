import "@/styles/globals.css";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useRouter } from "next/router";

export default function App({ Component, pageProps }) {
  const router = useRouter();
  const hideNavbarFooter = router.pathname.startsWith('/3d-view/') || router.pathname === '/test';

  return (
    <>
      {!hideNavbarFooter && <Navbar />}
      <Component {...pageProps} />
      {!hideNavbarFooter && <Footer />}
    </>
  );
}
