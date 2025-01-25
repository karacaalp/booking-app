import Header from "@/components/common/Header/Header";
import Modal from "@/components/common/Modal/Modal.tsx";
import Form from "@/components/features/slots/Form/Form.tsx";
import SlotList from "@/components/features/slots/SlotList/SlotList.tsx";
import { useSlotSearch } from "@/hooks/slots/useSlotSearch";
import { useState } from "react";

function CustomersHome() {
  const {
    selectedDate,
    setSelectedDate,
    data,
    isFetching,
    isError,
    error,
    refetch,
  } = useSlotSearch();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedSlotId, setSelectedSlotId] = useState<string | null>(null);

  const handleModalOpen = (id: string) => {
    setSelectedSlotId(id);
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setSelectedSlotId(null);
  };

  return (
    <div className="p-4">
      <Header />

      <Form
        selectedDate={selectedDate}
        setSelectedDate={setSelectedDate}
        onSearch={refetch}
        isLoading={isFetching}
      />

      {data && (
        <SlotList
          slots={data}
          isError={isError}
          error={error}
          onButtonClick={handleModalOpen}
        />
      )}

      {isModalOpen && selectedSlotId && (
        <Modal
          isOpen={isModalOpen}
          onClose={handleModalClose}
          id={selectedSlotId}
          refetchSlots={refetch}
        />
      )}
    </div>
  );
}

export default CustomersHome;
