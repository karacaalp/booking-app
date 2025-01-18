import Header from "@/components/common/Header/Header";
import Modal from "@/components/common/Modal/Modal.tsx";
import Form from "@/components/features/slots/Form/Form.tsx";
import SlotList from "@/components/features/slots/SlotList/SlotList.tsx";
import { QUERY_KEYS } from "@/constants/endpoints";
import useSlotManagement from "@/hooks/slots/useSlotManagement.tsx";
import { useQueryClient } from "@tanstack/react-query";
import { useCallback } from "react";

function CustomersHome() {
  const {
    selectedDate,
    setSelectedDate,
    modalState,
    handleModalOpen,
    handleModalClose,
    data,
    isFetching,
    isError,
    error,
    refetch,
  } = useSlotManagement();

  const queryClient = useQueryClient();

  const handleSearch = useCallback(() => {
    queryClient.removeQueries({ queryKey: [QUERY_KEYS.fetchSlots] });
    refetch();
  }, [refetch]);

  return (
    <div className="p-4">
      <Header />

      <Form
        selectedDate={selectedDate}
        setSelectedDate={setSelectedDate}
        onSearch={handleSearch}
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

      {modalState.isOpen && modalState.selectedId && (
        <Modal
          isOpen={modalState.isOpen}
          onClose={handleModalClose}
          id={modalState.selectedId}
        />
      )}
    </div>
  );
}

export default CustomersHome;
