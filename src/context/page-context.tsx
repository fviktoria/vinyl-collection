import { createContext, useContext, useMemo, useState } from "react";

import type { FC } from "react";
import { CfAlbumType } from "@vinyl-collection/types/album.types";

type PageContextProps = {
  wishlist?: CfAlbumType[];
  setWishlist: (value?: CfAlbumType[]) => void;
};

export const PageContext = createContext<PageContextProps | null>(null);

export const PageContextProvider: FC<
  React.PropsWithChildren<Partial<PageContextProps>>
> = ({ children }) => {
  const [wishlist, setWishlist] = useState<CfAlbumType[]>();

  const value = useMemo(
    () => ({
      wishlist,
      setWishlist,
    }),
    [wishlist],
  );

  return <PageContext.Provider value={value}>{children}</PageContext.Provider>;
};

export function usePageContext(): PageContextProps {
  const context = useContext(PageContext);

  if (!context)
    throw new Error(
      "page context must be used inside an page context provider.",
    );

  return context;
}
