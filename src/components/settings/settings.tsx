import {
  Button,
  IconButton,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
} from "@chakra-ui/react";
import { useTranslations } from "next-intl";
import { SettingsIcon } from "@chakra-ui/icons";

import { StyledSettingsWrapper } from "./settings.styles";

import type { FC } from "react";
import { LanguageSwitch } from "../language-switch/language-switch";

export const Settings: FC = () => {
  const t = useTranslations();

  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <StyledSettingsWrapper>
        <IconButton aria-label={t("labels.settings")} onClick={onOpen}>
          <SettingsIcon />
        </IconButton>
      </StyledSettingsWrapper>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay backdropFilter="blur(10px)" />
        <ModalContent ml={6} mr={6}>
          <ModalHeader>{t("labels.settings")}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <LanguageSwitch />
          </ModalBody>

          <ModalFooter>
            <Button mr={3} onClick={onClose}>
              {t("labels.close")}
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};
