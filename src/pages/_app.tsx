import { appWithTranslation } from "next-i18next";
import { ChakraProvider } from "@chakra-ui/react";

import { PageContextProvider } from "@vinyl-collection/context/page-context";
import { theme } from "@vinyl-collection/styles/theme";

import type { AppType } from "next/app";
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

const AppWithTranslation: AppType = appWithTranslation(App);

export default AppWithTranslation;
