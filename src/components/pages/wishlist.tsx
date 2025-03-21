"use client";

import { Box } from "@chakra-ui/react";
import { useTranslation } from "next-i18next";
import { FC, useEffect } from "react";

import { AlbumOverview } from "@vinyl-collection/components/album-overview/album-overview";
import { Layout } from "@vinyl-collection/components/layout/layout";
import { usePageContext } from "@vinyl-collection/context/page-context";

import type {
  AlbumType,
  DiscogsWantsResponseInterface,
} from "@vinyl-collection/types/discogs.types";

type WishlistPageProps = {
  wishlist: DiscogsWantsResponseInterface;
};

export const WishlistPage: FC<WishlistPageProps> = ({
  wishlist: ssrWishlist,
}) => {
  const { t } = useTranslation();
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
          albums={wishlist?.wants as AlbumType[]}
          showCount
        />
      </Box>
    </Layout>
  );
};
