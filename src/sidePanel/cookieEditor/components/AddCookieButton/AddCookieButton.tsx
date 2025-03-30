import { Button, ButtonProps } from "@/components/Button";
import { ModalDetails } from "@/components/Modal";
import { useCallback } from "react";
import { FaPlus } from "react-icons/fa";
import { CookieTileContent } from "../CookieTileContent";

export type AddCookieButtonProps = ButtonProps & {
  setModalDetails: (details: ModalDetails) => void;
  setIsModalOpen: (value: boolean) => void;
};

const emptyCookie: chrome.cookies.Cookie = {
  name: "",
  domain: "",
  hostOnly: false,
  httpOnly: false,
  path: "",
  sameSite: "unspecified",
  secure: false,
  session: true,
  value: "",
  storeId: "", // Not needed
};

export const AddCookieButton = ({
  setIsModalOpen,
  setModalDetails,
  ...buttonProps
}: AddCookieButtonProps) => {
  const openAddCookieModal = useCallback(() => {
    setModalDetails({
      title: "Add Cookie",
      contents: <CookieTileContent cookie={emptyCookie} />,
      modalElementProps: {
        style: {
          backgroundColor: "hsl(30, 50%, 66%)",
        },
      },
      modalContentProps: {
        style: {
          borderTop: "none",
          padding: "0",
        },
      },
    });
    setIsModalOpen(true);
  }, [setIsModalOpen, setModalDetails]);

  return (
    <Button {...buttonProps} onClick={openAddCookieModal}>
      <FaPlus size="1em" style={{ marginRight: "0.5em" }} /> Add Cookie
    </Button>
  );
};
