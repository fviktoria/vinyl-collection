"use client";

import { Box } from "@chakra-ui/react";
import { useTranslations } from "next-intl";
import { FC, useEffect } from "react";

import { AlbumOverview } from "@vinyl-collection/components/album-overview/album-overview";
import { Layout } from "@vinyl-collection/components/layout/layout";
import { usePageContext } from "@vinyl-collection/context/page-context";
import { CfAlbumType } from "@vinyl-collection/types/album.types";

type WishlistPageProps = {
  wishlist: CfAlbumType[];
};

export const WishlistPage: FC<WishlistPageProps> = ({
  wishlist: ssrWishlist,
}) => {
  const t = useTranslations();
  const { wishlist, setWishlist } = usePageContext();

  useEffect(() => {
    if (ssrWishlist) {
      setWishlist(ssrWishlist);
    }
  }, [ssrWishlist, setWishlist]);

  if (!wishlist) return null;

  return (
    <Layout showBackButton>
      <Box as="section" mt={12}>
        <AlbumOverview
          heading={t("wishlist.title")}
          albums={wishlist}
          showCount
        />
      </Box>
    </Layout>
  );
};
