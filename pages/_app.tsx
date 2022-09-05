import type { AppProps } from "next/app";
import Router from "next/router";
import { useState, useEffect } from "react";

import "react-alice-carousel/lib/scss/alice-carousel.scss";
import "../styles/globals.css";
import NavBar from "../components/NavBar/NavBar";
import LinearLoader from "../components/Loaders/LinearLoader";

function MyApp({ Component, pageProps }: AppProps) {
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    Router.events.on("routeChangeStart", () => {
      setIsLoading(true);
    });

    Router.events.on("routeChangeComplete", () => {
      setIsLoading(false);
    });

    return () => {
      Router.events.off("routeChangeStart", () => {
        setIsLoading(true);
      });
      Router.events.off("routeChangeComplete", () => {
        setIsLoading(false);
      });
    };
  }, []);

  return (
    <>
      <NavBar />
      {isLoading ? <LinearLoader /> : <Component {...pageProps} />}
    </>
  );
}

export default MyApp;
