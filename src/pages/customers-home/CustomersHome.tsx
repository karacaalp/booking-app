import Header from "@/components/common/Header/Header";
import Modal from "@/components/common/Modal/Modal";
import Form from "@/components/features/slots/Form/Form.tsx";
import SlotList from "@/components/features/slots/SlotList/SlotList.tsx";
import SlotModal from "@/components/features/slots/SlotModal/SlotModal";
import { SlotDetailProvider } from "@/context/SlotDetailContext";
import { useModalContext } from "@/hooks/common/useModalContext";
import { useSlotSearch } from "@/hooks/slots/useSlotSearch";

function CustomersHome() {
  const { isOpen } = useModalContext();
  const {
    selectedDate,
    setSelectedDate,
    data,
    isFetching,
    isError,
    error,
    refetch,
  } = useSlotSearch();

  return (
    <SlotDetailProvider>
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
          />
        )}

        {isOpen && (
          <Modal>
            <SlotModal />
          </Modal>
        )}
      </div>
    </SlotDetailProvider>
  );
}

export default CustomersHome;
