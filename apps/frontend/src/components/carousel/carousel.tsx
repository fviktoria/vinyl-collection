import { Splide, SplideSlide } from "@splidejs/react-splide";
import { Children, useCallback, useRef } from "react";
import { IconButton } from "@chakra-ui/react";
import { ArrowBackIcon, ArrowForwardIcon } from "@chakra-ui/icons";
import { type ComponentProps, type FC, type PropsWithChildren } from "react";
import { useTranslation } from "next-i18next";

import {
  StyledArrowsContainer,
  StyledCarouselContainer,
} from "./carousel.styles";

import "@splidejs/splide/dist/css/splide.min.css";

const defaultSettings: ComponentProps<typeof Splide> = {
  options: {
    pagination: false,
    gap: "1rem",
    fixedWidth: "25vw",
    breakpoints: {
      992: {
        fixedWidth: "70vw",
      },
    },
    rewind: true,
    arrows: false,
  },
};

export const Carousel: FC<PropsWithChildren<ComponentProps<typeof Splide>>> = ({
  children,
  ...settings
}) => {
  const { t } = useTranslation();
  const ref = useRef<Splide>(null);

  const handlePrevSlide = useCallback(() => {
    ref.current?.go("-1");
  }, []);

  const handleNextSlide = useCallback(() => {
    ref.current?.go("+1");
  }, []);

  return (
    <StyledCarouselContainer>
      <StyledArrowsContainer>
        <IconButton
          className="prev-button"
          onClick={handlePrevSlide}
          aria-label={t("labels.prev")}
          icon={<ArrowBackIcon />}
          colorScheme="gray"
          isRound
        />
        <IconButton
          className="next-button"
          onClick={handleNextSlide}
          aria-label={t("labels.next")}
          icon={<ArrowForwardIcon />}
          colorScheme="gray"
          isRound
        />
      </StyledArrowsContainer>

      {/* FIXME: */}
      {/* @ts-ignore */}
      <Splide ref={ref} {...defaultSettings} {...settings}>
        {Children.map(children, (child, index) => {
          return <SplideSlide key={index}>{child}</SplideSlide>;
        })}
      </Splide>
    </StyledCarouselContainer>
  );
};
