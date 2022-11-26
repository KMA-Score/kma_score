import "../styles/globals.css";
import type { AppProps } from "next/app";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import SearchModal from "../components/SearchModal";
import { config } from "@fortawesome/fontawesome-svg-core";
import "@fortawesome/fontawesome-svg-core/styles.css";
import Loading from "../components/Loading";
import { useState } from "react";
import { Router } from "next/router";
import { Simulate } from "react-dom/test-utils";
config.autoAddCss = false;

export default function App({ Component, pageProps }: AppProps) {
  const [loading, setLoading] = useState(false);

  Router.events.on("routeChangeStart", () => setLoading(true));
  Router.events.on("routeChangeComplete", () => setLoading(false));
  Router.events.on("routeChangeError", () => setLoading(false));

  if (loading) {
    return (
      <div className="p-2 px-36">
        <Navbar />
        <Loading isLoading={loading} />
        <Footer />
        <SearchModal />
      </div>
    );
  }

  return (
    <div className="p-2 px-36">
      <Navbar />
      <Component {...pageProps} />
      <Footer />
      <SearchModal />
    </div>
  );
}
