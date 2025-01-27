export interface ISlot {
  id: string;
  startDate: string;
  isBooked?: boolean;
  bookedCustomerName?: string;
}

export interface IGetSlotsProps {
  date?: string;
  id?: string;
  isBooked?: boolean;
  bookedCustomerName?: string;
}

export interface ISlotResponse {
  success: boolean;
  data: ISlot[];
}
