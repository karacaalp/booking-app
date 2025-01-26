import { SlotDetailContext } from "@/context/SlotDetailContext";
import { useContext } from "react";

export const useSlotDetailContext = () => {
  const context = useContext(SlotDetailContext);
  if (!context) {
    throw new Error(
      "useSlotDetailContext must be used within a SlotDetailProvider"
    );
  }
  return context;
};
