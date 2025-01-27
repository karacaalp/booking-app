import { ErrorMessage } from "@/components/common/ErrorMessage/ErrorMessage";
import { BookingForm } from "@/components/common/Modal/BookingForm";
import Modal from "@/components/common/Modal/Modal";
import { DATE_FORMATS } from "@/constants/dateFormats";
import { QUERY_KEYS } from "@/constants/endpoints";
import { useModalContext } from "@/hooks/common/useModalContext";
import { useSlotDetailContext } from "@/hooks/contexts/useSlotDetailContext";
import { useBookSlot, useCancelSlot } from "@/hooks/slots";
import { useSlotDetail } from "@/hooks/slots/useSlotDetail";
import { useQueryClient } from "@tanstack/react-query";
import { useMemo } from "react";
import { toast } from "react-toastify";

interface SlotModalProps {
  refetchSlots: () => void;
}

const SlotModal = ({ refetchSlots }: SlotModalProps) => {
  const { id, setId } = useSlotDetailContext();
  const { onClose } = useModalContext();
  const queryClient = useQueryClient();

  const {
    data,
    isFetching,
    error,
    refetch: refetchSlotDetail,
  } = useSlotDetail();
  const { bookSlot, isBooking } = useBookSlot();
  const { cancelSlot, isCancelling } = useCancelSlot();

  const invalidateSlotDetail = () => {
    queryClient.removeQueries({
      queryKey: [QUERY_KEYS.fetchSlotDetails],
    });
  };

  const onCloseWithCallback = () => {
    setId(null);
    onClose(invalidateSlotDetail);
  };

  const callBackAction = () => {
    onCloseWithCallback();
    refetchSlots();
  };

  const handleBookWithCallback = async (name: string) => {
    try {
      await bookSlot({ id: id!, name });
      callBackAction();
      toast.success("Booking successful");
    } catch (error) {
      console.log("error", error);
      toast.error("Booking failed");
    }
  };

  const handleCancelWithCallback = async () => {
    try {
      await cancelSlot({ id: id! });
      callBackAction();
      toast.success("Cancelling successful");
    } catch (error) {
      console.log("error", error);
      toast.error("Cancelling failed");
    }
  };

  const { formattedDate, formattedTime } = useMemo(() => {
    if (!data?.startDate) return { formattedDate: "", formattedTime: "" };
    const date = new Date(data.startDate);
    return {
      formattedDate: date.toLocaleDateString(
        DATE_FORMATS.LOCALE.DATE,
        DATE_FORMATS.DATE_OPTIONS
      ),
      formattedTime: date.toLocaleTimeString(
        DATE_FORMATS.LOCALE.TIME,
        DATE_FORMATS.TIME_OPTIONS
      ),
    };
  }, [data?.startDate]);

  if (error) return <ErrorMessage onRefetch={refetchSlotDetail} />;
  if (isFetching) return <p>Loading...</p>;

  const renderContent = () => {
    if (!data) return null;

    return (
      <BookingForm
        isCancelling={isCancelling}
        isBooking={isBooking}
        formattedDate={formattedDate}
        formattedTime={formattedTime}
        isBooked={data.isBooked}
        bookedCustomerName={data?.bookedCustomerName}
        onBook={handleBookWithCallback}
        onCancel={handleCancelWithCallback}
        onClose={onCloseWithCallback}
      />
    );
  };

  return (
    <Modal>
      <h2>{data?.isBooked ? "Cancel this slot?" : "Book this slot?"}</h2>
      {renderContent()}
    </Modal>
  );
};

export default SlotModal;
