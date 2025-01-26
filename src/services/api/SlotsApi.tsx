import { ApiError, axiosInstance } from "@/config/axios";
import { API_ENDPOINTS } from "@/constants/endpoints";
import { IApiResponse } from "@/types/api";
import { IGetSlotsProps, ISlotDetails } from "@/types/slots";

// Slot specific error class
export class SlotApiError extends ApiError {
  constructor(message: string, statusCode?: number) {
    super(message, statusCode);
    this.name = "SlotApiError";
  }
}

export class SlotNotFoundError extends SlotApiError {
  constructor(slotId: string) {
    super(`Slot bulunamadı: ${slotId}`, 404);
    this.name = "SlotNotFoundError";
  }
}

// Hata yönetimi için yardımcı fonksiyon
const handleSlotApiError = (error: unknown, operation: string) => {
  if (error instanceof ApiError) {
    throw new SlotApiError(error.message, error.statusCode);
  }
  throw new SlotApiError(`Unexpected error during ${operation}`);
};

export const slotsApi = {
  getSlots: async (
    params: IGetSlotsProps = {}
  ): Promise<ISlotDetails[] | undefined> => {
    try {
      const {
        data: { data },
      } = await axiosInstance.get<IApiResponse<ISlotDetails[]>>(
        API_ENDPOINTS.SLOTS,
        { params }
      );
      return data;
    } catch (error) {
      handleSlotApiError(error, "fetching slot list");
      return undefined;
    }
  },

  getSlotById: async (
    id: string,
    signal: AbortSignal
  ): Promise<ISlotDetails | undefined> => {
    try {
      const {
        data: { data },
      } = await axiosInstance.get<IApiResponse<ISlotDetails>>(
        API_ENDPOINTS.SLOT_DETAILS(id),
        { signal }
      );
      return data;
    } catch (error) {
      handleSlotApiError(error, `fetching slot details with ID: ${id}`);
      return undefined;
    }
  },

  bookSlotById: async (
    id: string,
    name: string
  ): Promise<ISlotDetails | undefined> => {
    try {
      const {
        data: { data },
      } = await axiosInstance.post<IApiResponse<ISlotDetails>>(
        `${API_ENDPOINTS.SLOT_DETAILS(id)}/book`,
        { name }
      );
      return data;
    } catch (error) {
      handleSlotApiError(error, `booking slot with ID: ${id}`);
      return undefined;
    }
  },

  cancelSlotById: async (id: string): Promise<ISlotDetails | undefined> => {
    try {
      const {
        data: { data },
      } = await axiosInstance.post<IApiResponse<ISlotDetails>>(
        `${API_ENDPOINTS.SLOT_DETAILS(id)}/cancel-booking`
      );
      return data;
    } catch (error) {
      handleSlotApiError(error, `canceling slot with ID: ${id}`);
      return undefined;
    }
  },
};
