import axios from "axios";
import { API_ENDPOINTS } from "../../constants/endpoints";
import { IGetSlotsProps, ISlotDetails, ISlots } from "../../types/slots";

const handleApiError = (e: unknown, operation: string) => {
  console.error(`Error during ${operation}:`, e);
  throw new Error(
    `Operation failed: ${operation} - ${
      e instanceof Error ? e.message : "Unknown error"
    }`
  );
};

export const slotsApi = {
  getSlots: async (params: IGetSlotsProps = {}) => {
    try {
      const response = await axios.get<ISlots>(`${API_ENDPOINTS.SLOTS}`, {
        params,
      });
      const data = await response.data;
      if (data.success) {
        return data.data;
      }
      throw new Error("Server response unsuccessful");
    } catch (e) {
      handleApiError(e, "fetching slot list");
    }
  },

  getSlotById: async (
    id: string,
    signal: AbortSignal
  ): Promise<ISlotDetails | undefined> => {
    try {
      const response = await axios.get<any>(
        `${API_ENDPOINTS.SLOT_DETAILS(id)}`,
        { signal }
      );
      const data = await response.data;
      if (data.success) {
        return data.data;
      }
      throw new Error("Server response unsuccessful");
    } catch (e) {
      handleApiError(e, "fetching slot details");
    }
  },

  bookSlotById: async (
    id: string,
    name: string
  ): Promise<ISlotDetails | undefined> => {
    try {
      const response = await axios.post<any>(
        `${API_ENDPOINTS.SLOT_DETAILS(id)}/book`,
        { name }
      );
      const data = await response.data;
      if (data.success) {
        return data.data;
      }
      throw new Error("Server response unsuccessful");
    } catch (e) {
      handleApiError(e, "booking slot");
    }
  },

  cancelSlotById: async (id: string): Promise<ISlotDetails | undefined> => {
    try {
      const response = await axios.post<any>(
        `${API_ENDPOINTS.SLOT_DETAILS(id)}/cancel-booking`
      );
      const data = await response.data;
      if (data.success) {
        return data.data;
      }
      throw new Error("Server response unsuccessful");
    } catch (e) {
      handleApiError(e, "canceling slot");
    }
  },
};
