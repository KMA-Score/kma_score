import "../styles/globals.css";
import type { AppProps } from "next/app";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import SearchModal from "../components/SearchModal";
import { config } from "@fortawesome/fontawesome-svg-core";
import "@fortawesome/fontawesome-svg-core/styles.css";
import Loading from "../components/Loading";
import React, { useState } from "react";
import { Router } from "next/router";
import Head from "next/head";
import Script from "next/script";

config.autoAddCss = false;

export default function App({ Component, pageProps }: AppProps) {
  const [loading, setLoading] = useState(false);

  Router.events.on("routeChangeStart", () => setLoading(true));
  Router.events.on("routeChangeComplete", () => setLoading(false));
  Router.events.on("routeChangeError", () => setLoading(false));

  return (
    <>
      <Head>
        <title>./kma_score</title>
        <meta property="og:title" content="./kma_score" />
        {/*Google tag (gtag.js)*/}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-JNT8RDZ7B0"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){window.dataLayer.push(arguments);}
          gtag('js', new Date());

          gtag('config', 'G-JNT8RDZ7B0');
        `}
        </Script>
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
    </>
  );
}
