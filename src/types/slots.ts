export interface ISlot {
  id: string;
  startDate: string;
}

export interface ISlotDetails extends ISlot {
  isBooked: boolean;
  bookedCustomerName?: string;
  id: string;
  startDate: string;
}

export interface IGetSlotsProps {
  date?: string;
  id?: string;
  isBooked?: boolean;
  bookedCustomerName?: string;
}

export interface ISlots {
  success: boolean;
  data: ISlotDetails[];
}
