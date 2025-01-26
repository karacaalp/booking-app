import { ErrorMessage } from "@/components/common/ErrorMessage/ErrorMessage";
import { BookingForm } from "@/components/common/Modal/BookingForm";
import Modal from "@/components/common/Modal/Modal";
import { DATE_FORMATS } from "@/constants/dateFormats";
import { QUERY_KEYS } from "@/constants/endpoints";
import { useModalContext } from "@/hooks/common/useModalContext";
import { useSlotApi } from "@/hooks/slots/useSlotsApi";
import useSlotSearch from "@/hooks/slots/useSlotSearch";
import { useSlotDetailContext } from "@/hooks/useSlotDetailContext";
import { useQueryClient } from "@tanstack/react-query";
import { useMemo } from "react";
import { toast } from "react-toastify";

const SlotModal = () => {
  const {
    data,
    isFetching,
    error,
    refetch: refetchSlotDetail,
    name,
    setName,
    handleBook,
    handleCancel,
    isCancelling,
    isBooking,
  } = useSlotApi();
  const { refetch: refetchSlots } = useSlotSearch();
  const { setId } = useSlotDetailContext();
  const { onClose } = useModalContext();
  const queryClient = useQueryClient();

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

  const handleBookWithCallback = async () => {
    try {
      await handleBook();
      callBackAction();
      toast.success("Booking successful");
    } catch (error) {
      console.log("error", error);
      toast.error("Booking failed");
    }
  };

  const handleCancelWithCallback = async () => {
    try {
      await handleCancel();
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

  const renderContent = () => {
    if (isFetching) return <p>Loading...</p>;
    if (!data) return null;

    return (
      <BookingForm
        isCancelling={isCancelling}
        isBooking={isBooking}
        name={name}
        setName={setName}
        formattedDate={formattedDate}
        formattedTime={formattedTime}
        isBooked={data.isBooked}
        bookedCustomerName={data.bookedCustomerName}
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
