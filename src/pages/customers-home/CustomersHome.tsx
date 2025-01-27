import Header from "@/components/common/Header/Header";
import Modal from "@/components/common/Modal/Modal";
import Form from "@/components/features/slots/Form/Form.tsx";
import SlotList from "@/components/features/slots/SlotList/SlotList.tsx";
import SlotModal from "@/components/features/slots/SlotModal/SlotModal";
import { SlotDetailProvider } from "@/context/SlotDetailContext";
import { useModalContext } from "@/hooks/common/useModalContext";
import { useSlotSearch } from "@/hooks/slots/useSlotSearch";
import { useState } from "react";

function CustomersHome() {
  const INITIAL_DATE = new Date("2024-08-01");
  const [selectedDate, setSelectedDate] = useState<Date | null>(INITIAL_DATE);

  const { isOpen } = useModalContext();
  const { data, isFetching, isError, error, refetch } = useSlotSearch({
    date: selectedDate?.toISOString().split("T")[0],
  });

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

        {data && <SlotList slots={data} isError={isError} error={error} />}

        {isOpen && (
          <Modal>
            <SlotModal refetchSlots={refetch} />
          </Modal>
        )}
      </div>
    </SlotDetailProvider>
  );
}

export default CustomersHome;
