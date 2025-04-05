import { Button, ButtonProps } from "@/components/Button";
import { ModalDetails } from "@/components/Modal";
import { useCallback } from "react";
import { FaPlus } from "react-icons/fa";
import { CookieTileContent } from "../CookieTileContent";
import { ChromeCookie, getCookieKey } from "@/utils/cookie";

export type AddCookieButtonProps = ButtonProps & {
  setModalDetails: (details: ModalDetails) => void;
  setIsModalOpen: (value: boolean) => void;
  onCookieAdded?: (cookie: ChromeCookie) => void;
};

const emptyCookie: ChromeCookie = {
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
  onCookieAdded,
  setIsModalOpen,
  setModalDetails,
  ...buttonProps
}: AddCookieButtonProps) => {
  const handleCookieSaved = useCallback(
    (cookie: ChromeCookie) => {
      setIsModalOpen(false);
      onCookieAdded?.(cookie);
    },
    [onCookieAdded, setIsModalOpen]
  );

  const openAddCookieModal = useCallback(() => {
    setModalDetails({
      title: "Add Cookie",
      contents: (
        <CookieTileContent
          key={getCookieKey(emptyCookie)}
          cookie={emptyCookie}
          onCookieSaved={handleCookieSaved}
        />
      ),
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
  }, [handleCookieSaved, setIsModalOpen, setModalDetails]);

  return (
    <Button {...buttonProps} onClick={openAddCookieModal}>
      <FaPlus size="1em" style={{ marginRight: "0.5em" }} /> Add Cookie
    </Button>
  );
};
