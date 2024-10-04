import { appWithTranslation } from "next-i18next";
import { ChakraProvider } from "@chakra-ui/react";

import { PageContextProvider } from "@record-collection/context/page-context";
import { theme } from "@record-collection/styles/theme";

import type { AppProps } from "next/app";

function App({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider theme={theme}>
      <PageContextProvider>
        <Component {...pageProps} />
      </PageContextProvider>
    </ChakraProvider>
  );
}

export default appWithTranslation(App);
