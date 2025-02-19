
import React from "react";
import "./globals.css"; // ✅ Import global styles here
// import "../styles/globals.css"
import type { AppProps } from "next/app";
import WalletContextProvider from "../components/WalletContextProvider";
// import { ChakraProvider } from "@chakra-ui/react"

function MyApp({ Component, pageProps }: AppProps) {
  return (
    // <ChakraProvider>
      <WalletContextProvider>
        <Component {...pageProps} />
      </WalletContextProvider>
    // </ChakraProvider>
  );
}

export default MyApp;
