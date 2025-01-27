import { ModalProvider } from "@/context/ModalContext";
import { SlotDetailProvider } from "@/context/SlotDetailContext";
import { ISlot } from "@/types/slots";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { render, screen, waitFor } from "@testing-library/react";
import React from "react";
import SlotModal from "./SlotModal";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
    },
  },
});

const renderWithProviders = (ui: React.ReactElement) => {
  return render(
    <QueryClientProvider client={queryClient}>
      <ModalProvider>
        <SlotDetailProvider>{ui}</SlotDetailProvider>
      </ModalProvider>
    </QueryClientProvider>
  );
};

// Mock'u güncelliyoruz
const mockUseSlotDetail: {
  isFetching: boolean;
  isError: boolean;
  error: Error | null;
  data: ISlot | null;
} = {
  isFetching: true,
  isError: false,
  error: null,
  data: null,
};

jest.mock("@/hooks/slots/useSlotDetail", () => ({
  useSlotDetail: () => mockUseSlotDetail,
}));

describe("SlotModal", () => {
  const mockRefetchSlots = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    // Her test öncesi varsayılan duruma getiriyoruz
    mockUseSlotDetail.isFetching = true;
    mockUseSlotDetail.isError = false;
    mockUseSlotDetail.error = null;
  });

  it("renders loading state initially", async () => {
    renderWithProviders(<SlotModal refetchSlots={mockRefetchSlots} />);
    await waitFor(() => {
      expect(screen.getByText("Loading...")).toBeInTheDocument();
    });
  });

  it("displays error message when slot fetch fails", async () => {
    mockUseSlotDetail.isFetching = false;
    mockUseSlotDetail.isError = true;
    mockUseSlotDetail.error = new Error("Failed to fetch slot details");

    renderWithProviders(<SlotModal refetchSlots={mockRefetchSlots} />);
    await waitFor(() => {
      expect(
        screen.getByText("An error occurred. Please try again.")
      ).toBeInTheDocument();
    });
  });
});
