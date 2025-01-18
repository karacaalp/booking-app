const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";

export const API_ENDPOINTS = {
  SLOTS: `${API_URL}/slots`,
  SLOT_DETAILS: (id: string) => `${API_URL}/slots/${id}`,
} as const;

export const QUERY_KEYS = {
  fetchSlots: "fetchSlots",
  fetchSlotDetails: "fetchSlotDetails",
} as const;
