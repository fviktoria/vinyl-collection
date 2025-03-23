"use client";

import { ChakraProvider } from "@chakra-ui/react";
import { PageContextProvider } from "@vinyl-collection/context/page-context";
import { theme } from "@vinyl-collection/styles/theme";
import { FC, PropsWithChildren } from "react";

export const Providers: FC<PropsWithChildren> = ({ children }) => {
  return (
    <ChakraProvider theme={theme}>
      <PageContextProvider>{children}</PageContextProvider>
    </ChakraProvider>
  );
};
