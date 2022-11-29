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
import Head from "next/head";
import { SessionProvider } from "next-auth/react";

config.autoAddCss = false;

export default function App({ Component, pageProps }: AppProps) {
  const [loading, setLoading] = useState(false);

  Router.events.on("routeChangeStart", () => setLoading(true));
  Router.events.on("routeChangeComplete", () => setLoading(false));
  Router.events.on("routeChangeError", () => setLoading(false));

  return (
    <>
      <SessionProvider session={pageProps.session}>
        <Head>
          <title>./kma_score</title>
          <meta property="og:title" content="./kma_score" />
        </Head>
        <div className="px-4 lg:p-2 lg:px-36 flex flex-auto flex-col h-full">
          <Navbar />
          {loading ? (
            <Loading isLoading={loading} />
          ) : (
            <Component {...pageProps} />
          )}
          <Footer />
          <SearchModal />
        </div>
      </SessionProvider>
    </>
  );
}
