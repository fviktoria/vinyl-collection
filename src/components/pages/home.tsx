"use client";

import { Box, Button } from "@chakra-ui/react";
import Link from "next/link";
import { useTranslation } from "next-i18next";

import { AlbumOverview } from "@vinyl-collection/components/album-overview/album-overview";
import { Layout } from "@vinyl-collection/components/layout/layout";

import type {
  AlbumType,
  DiscogsReleasesResponseInterface,
  DiscogsWantsResponseInterface,
} from "@vinyl-collection/types/discogs.types";
import { FC } from "react";

type HomePageProps = {
  collection: DiscogsReleasesResponseInterface;
  wishlist: DiscogsWantsResponseInterface;
};

export const HomePage: FC<HomePageProps> = ({ collection, wishlist }) => {
  const { t } = useTranslation();

  return (
    <Layout>
      <Box as="section">
        <AlbumOverview
          heading={t("collection.title")}
          albums={collection?.releases as AlbumType[]}
          showFooter={false}
          isTeaser
          overviewLink="/collection"
        />
        <Button as={Link} href="/collection">
          {t("labels.showAll")}
        </Button>
      </Box>

      <Box as="section" mt={12}>
        <AlbumOverview
          heading={t("wishlist.title")}
          albums={wishlist?.wants as AlbumType[]}
          showFooter={false}
          isTeaser
          overviewLink="/wishlist"
        />
        <Button as={Link} href="/wishlist">
          {t("labels.showAll")}
        </Button>
      </Box>
    </Layout>
  );
};
