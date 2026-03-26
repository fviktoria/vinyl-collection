import { useMemo } from "react";

import { isLink } from "@vinyl-collection/util/is-link";

import { AlbumGridCard } from "./album-grid-card/album-grid-card";
import { AlbumListCard } from "./album-list-card/album-list-card";

import type { ComponentProps, FC } from "react";
import type { AlbumOverview } from "../album-overview/album-overview";
import { CfAlbumType } from "@vinyl-collection/types/album.types";

type AlbumCardProps = {
  album: CfAlbumType;
} & Pick<ComponentProps<typeof AlbumOverview>, "variant">;

export const AlbumCard: FC<AlbumCardProps> = ({ album, variant = "grid" }) => {
  const { discogsRelease } = album.fields;
  const artistNames = useMemo(
    () => discogsRelease?.artists.map((artist) => artist.name).join(", "),
    [discogsRelease?.artists],
  );

  const link = useMemo(() => {
    if (album.fields.shopUrl) {
      return isLink(album.fields.shopUrl) ? album.fields.shopUrl : undefined;
    }
  }, [album]);

  return variant === "grid" ? (
    <AlbumGridCard album={album} artistNames={artistNames ?? ""} link={link} />
  ) : (
    <AlbumListCard album={album} artistNames={artistNames} link={link} />
  );
};
