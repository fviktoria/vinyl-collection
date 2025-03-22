import { Box, useStyleConfig } from "@chakra-ui/react";
import { useTranslations } from "next-intl";
import Link from "next/link";

import { AlbumCard } from "../album-card";
import { StyledButton } from "./album-preview-card.styles";

import type { SystemStyleObject } from "@chakra-ui/react";
import type { ComponentProps, FC } from "react";

type AlbumPreviewCardProps = ComponentProps<typeof AlbumCard> & {
  href: string;
};

export const AlbumPreviewCard: FC<AlbumPreviewCardProps> = ({
  href,
  ...albumCardProps
}) => {
  const { container } = useStyleConfig("Card");
  const t = useTranslations();

  return (
    // FIXME: check typing
    <Box
      __css={container as SystemStyleObject}
      overflow="hidden"
      position="relative"
    >
      <Box filter="blur(20px)" transform="scale(1.1)">
        <AlbumCard {...albumCardProps} />
      </Box>
      <StyledButton as={Link} href={href}>
        {t("labels.showAll")}
      </StyledButton>
    </Box>
  );
};
