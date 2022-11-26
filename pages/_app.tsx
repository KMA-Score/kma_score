import "../styles/globals.css";
import type { AppProps } from "next/app";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import SearchModal from "../components/SearchModal";
import Script from "next/script";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <div className="p-2 px-36">
      <Script
        type="module"
        src="https://unpkg.com/ionicons@5.5.2/dist/ionicons/ionicons.esm.js"
      />
      <Script
        noModule
        src="https://unpkg.com/ionicons@5.5.2/dist/ionicons/ionicons.js"
      />
      <Navbar />
      <Component {...pageProps} />
      <Footer />
      <SearchModal />
    </div>
  );
}
