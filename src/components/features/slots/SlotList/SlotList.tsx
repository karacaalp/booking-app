import { useModalContext } from "@/hooks/common/useModalContext";
import { useSlotDetailContext } from "@/hooks/slots/useSlotDetailContext";
import { ISlotDetails } from "../../../../types/slots";
import { ErrorMessage } from "../../../common/ErrorMessage/ErrorMessage";
import { SlotButton, SlotListContainer } from "./SlotList.styles";

interface SlotListProps {
  slots: ISlotDetails[];
  isError: boolean;
  error: unknown;
}

const SlotList: React.FC<SlotListProps> = ({ slots, isError, error }) => {
  const { setId } = useSlotDetailContext();
  const { onOpen } = useModalContext();

  if (isError) {
    return (
      <ErrorMessage
        message={
          error instanceof Error ? error.message : "Unknown error occurred"
        }
      />
    );
  }

  return (
    <div>
      <h3>Pick a slot</h3>
      <SlotListContainer>
        {slots.length === 0 ? (
          <p>No available slots found</p>
        ) : (
          slots.map((slot) => (
            <SlotButton
              key={slot.id}
              onClick={() => {
                setId(slot.id);
                onOpen();
              }}
              $isBooked={slot?.isBooked}
            >
              {new Date(slot.startDate).toLocaleTimeString("en-US", {
                timeZone: "UTC",
                hour: "2-digit",
                minute: "2-digit",
              })}
            </SlotButton>
          ))
        )}
      </SlotListContainer>
    </div>
  );
};

export default SlotList;
