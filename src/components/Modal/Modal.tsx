import { useCallback, useEffect, useMemo, useState } from "react";
import styles from "./Modal.module.css";
import { useCommonManagement } from "@/hooks/useCommonManagement";
import { IoClose } from "react-icons/io5";
import { Button } from "../Button";

export type ModalElementProps = React.HTMLAttributes<HTMLDivElement>;

export type ModalContentProps = React.HTMLAttributes<HTMLDivElement>;

export type ModalDetails = {
  title: string;
  contents: React.ReactNode;
  actionButtons?: React.ReactNode[];
  modalElementProps?: ModalElementProps;
  modalContentProps?: ModalContentProps;
};

export function useModal() {
  const {
    state: { tab },
  } = useCommonManagement();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalDetails, setModalDetails] = useState<ModalDetails>({
    title: "(No title)",
    contents: null,
  });

  const closeModal = useCallback(() => {
    setIsModalOpen(false);
  }, []);

  useEffect(() => {
    closeModal();
  }, [closeModal, tab]);

  const handleOutsideModalClick = useCallback(() => {
    closeModal();
  }, [closeModal]);

  const handleInsideModalClick = useCallback((event: React.MouseEvent) => {
    event.stopPropagation();
  }, []);

  const modalNode = useMemo(
    () => (
      <dialog className={styles.dialog} open={isModalOpen}>
        <div
          className={styles["dialog-inner"]}
          onClick={handleOutsideModalClick}
        >
          <div
            {...modalDetails.modalElementProps}
            className={styles.modal}
            onClick={handleInsideModalClick}
          >
            <div className={styles.modal_header}>
              <span className={styles.modal_title}>{modalDetails.title}</span>
              <Button withShadow onClick={closeModal}>
                <IoClose size="1.5em" />
              </Button>
            </div>
            {/* Contents */}
            <div
              {...modalDetails.modalContentProps}
              className={styles.modal_contents}
            >
              {modalDetails.contents}
            </div>
            {/* Actions Bar */}
            {modalDetails.actionButtons?.length ? (
              <div className={styles.modal_actions_bar}>
                {modalDetails.actionButtons}
              </div>
            ) : null}
          </div>
        </div>
      </dialog>
    ),
    [
      closeModal,
      handleInsideModalClick,
      handleOutsideModalClick,
      isModalOpen,
      modalDetails.actionButtons,
      modalDetails.contents,
      modalDetails.modalContentProps,
      modalDetails.modalElementProps,
      modalDetails.title,
    ]
  );

  return { modalNode, setIsModalOpen, setModalDetails };
}
