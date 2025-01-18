import { DATE_FORMATS } from "@/constants/dateFormats";
import { useEffect, useMemo } from "react";
import { useModalManagement } from "../../../hooks/slots/useModalManagement";
import { ErrorMessage } from "../ErrorMessage/ErrorMessage";
import { BookingForm } from "./BookingForm";
import { ModalContent, ModalWrapper } from "./Modal.styles";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  id: string;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, id }) => {
  const {
    data,
    isFetching,
    error,
    refetch,
    name,
    setName,
    handleBook,
    handleCancel,
    isCancelling,
    isBooking,
  } = useModalManagement(id, isOpen, onClose);

  useEffect(() => {
    const handleEscapeKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEscapeKey);
    }

    return () => {
      document.removeEventListener("keydown", handleEscapeKey);
    };
  }, [isOpen, onClose]);

  const handleWrapperClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const { formattedDate, formattedTime } = useMemo(
    () => ({
      formattedDate:
        data?.startDate &&
        new Date(data.startDate).toLocaleDateString(
          DATE_FORMATS.LOCALE.DATE,
          DATE_FORMATS.DATE_OPTIONS
        ),
      formattedTime:
        data?.startDate &&
        new Date(data.startDate).toLocaleTimeString(
          DATE_FORMATS.LOCALE.TIME,
          DATE_FORMATS.TIME_OPTIONS
        ),
    }),
    [data?.startDate]
  );

  if (!isOpen) return null;
  if (error) return <ErrorMessage onRefetch={refetch} />;

  return (
    <ModalWrapper onClick={handleWrapperClick}>
      <ModalContent onClick={(e) => e.stopPropagation()}>
        <h2>Book this slot?</h2>
        {data ? (
          <BookingForm
            isCancelling={isCancelling}
            isBooking={isBooking}
            name={name}
            setName={setName}
            formattedDate={formattedDate || ""}
            formattedTime={formattedTime || ""}
            isBooked={data.isBooked}
            bookedCustomerName={data.bookedCustomerName}
            onBook={handleBook}
            onCancel={handleCancel}
            onClose={onClose}
          />
        ) : (
          isFetching && <p>Loading...</p>
        )}
      </ModalContent>
    </ModalWrapper>
  );
};

export default Modal;
