import { Button, ButtonProps } from "@/components/Button";
import { ModalDetails } from "@/components/Modal";
import { ChromeCookie } from "@/utils/cookie";
import { useCallback } from "react";
import { FaFileExport } from "react-icons/fa";
import { ExportCookiesSection } from "../ExportCookiesSection";

export type ExportCookiesButtonProps = ButtonProps & {
  cookies: ChromeCookie[];
  setModalDetails: (details: ModalDetails) => void;
  setIsModalOpen: (value: boolean) => void;
};

export const ExportCookiesButton = ({
  cookies,
  setIsModalOpen,
  setModalDetails,
  ...buttonProps
}: ExportCookiesButtonProps) => {
  const openModal = useCallback(() => {
    const plural = cookies.length === 1 ? "" : "s";
    setModalDetails({
      title: `Export ${cookies.length} Cookie${plural}`,
      contents: <ExportCookiesSection cookies={cookies} />,
      modalElementProps: {
        style: {
          backgroundColor: "hsl(30, 50%, 66%)",
        },
      },
      modalContentProps: {},
    });
    setIsModalOpen(true);
  }, [cookies, setIsModalOpen, setModalDetails]);

  return (
    <Button {...buttonProps} onClick={openModal}>
      <FaFileExport size="1em" style={{ marginRight: "0.5em" }} /> Export
    </Button>
  );
};
