import { slotsApi } from "@/services/api/SlotsApi";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { renderHook, waitFor } from "@testing-library/react";
import React from "react";
import { useSlotSearch } from "./useSlotSearch";

jest.mock("@/services/api/SlotsApi");

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
    },
  },
});

const wrapper = ({ children }: { children: React.ReactNode }) => (
  <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
);

describe("useSlotSearch", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("returns initial state correctly", () => {
    const { result } = renderHook(() => useSlotSearch(), { wrapper });

    expect(result.current.data).toBeUndefined();
    expect(result.current.isFetching).toBeFalsy();
    expect(result.current.isError).toBeFalsy();
  });

  it("fetches slots successfully", async () => {
    const mockSlots = [
      { id: "1", startDate: "2024-08-01T10:00:00Z", isBooked: false },
      { id: "2", startDate: "2024-08-01T11:00:00Z", isBooked: true },
    ];

    (slotsApi.getSlots as jest.Mock).mockResolvedValueOnce(mockSlots);

    const { result } = renderHook(() => useSlotSearch({ date: "2024-08-01" }), {
      wrapper,
    });

    result.current.refetch();

    await waitFor(() => {
      expect(result.current.data).toEqual(mockSlots);
    });
  });

  it("handles error state", async () => {
    const error = new Error("Failed to fetch slots");
    (slotsApi.getSlots as jest.Mock).mockRejectedValueOnce(error);

    const { result } = renderHook(() => useSlotSearch(), { wrapper });

    result.current.refetch();

    await waitFor(() => {
      expect(result.current.isError).toBeTruthy();
      expect(result.current.error).toEqual(error);
    });
  });
});
