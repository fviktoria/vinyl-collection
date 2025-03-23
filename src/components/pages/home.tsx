"use client";

import { Box, Button } from "@chakra-ui/react";
import Link from "next/link";
import { useTranslations } from "next-intl";

import { AlbumOverview } from "@vinyl-collection/components/album-overview/album-overview";
import { Layout } from "@vinyl-collection/components/layout/layout";

import { FC } from "react";
import { CfAlbumType } from "@vinyl-collection/types/album.types";

type HomePageProps = {
  collection: CfAlbumType[];
  wishlist: CfAlbumType[];
};

export const HomePage: FC<HomePageProps> = ({ collection, wishlist }) => {
  const t = useTranslations();

  return (
    <Layout>
      <Box as="section">
        <AlbumOverview
          heading={t("collection.title")}
          albums={collection}
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
          albums={wishlist}
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
