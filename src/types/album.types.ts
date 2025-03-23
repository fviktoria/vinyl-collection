import { MODIFIER } from "@vinyl-collection/util/contentful-client";
import { EntryFieldTypes, EntrySkeletonType, Entry } from "contentful";

export type DiscogsAlbumType = {
  id: number;
  title: string;
  uri: string;
  year: number;
  thumb: string;
  genres: string[];
  images: { uri: string }[];
  labels: { name: string }[];
  artists: { name: string }[];
  country: string;
  released: string;
};

type TypeAlbumFields = {
  discogsRelease?: EntryFieldTypes.Object<DiscogsAlbumType>;
  location: EntryFieldTypes.Symbol<"Collection" | "Wishlist">;
  title?: EntryFieldTypes.Symbol;
  reserved?: EntryFieldTypes.Boolean;
  shopUrl?: EntryFieldTypes.Symbol;
};

export type TypeAlbumSkeleton = EntrySkeletonType<TypeAlbumFields, "album">;
export type CfAlbumType = Entry<TypeAlbumSkeleton, MODIFIER>;
