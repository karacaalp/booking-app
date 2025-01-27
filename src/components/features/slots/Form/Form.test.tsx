import { fireEvent, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { act } from "react";
import Form from "./Form";

describe("Form Component", () => {
  const mockProps = {
    selectedDate: new Date("2024-08-01"),
    setSelectedDate: jest.fn(),
    onSearch: jest.fn(),
    isLoading: false,
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders correctly", () => {
    render(<Form {...mockProps} />);
    expect(screen.getByPlaceholderText("Select a date")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /search/i })).toBeInTheDocument();
  });

  it("handles date selection", () => {
    render(<Form {...mockProps} />);
    const datePicker = screen.getByPlaceholderText("Select a date");
    fireEvent.change(datePicker, { target: { value: "2024-08-02" } });
    expect(mockProps.setSelectedDate).toHaveBeenCalled();
  });

  it("disables search button when loading", () => {
    render(<Form {...mockProps} isLoading={true} />);
    expect(screen.getByRole("button", { name: /searching/i })).toBeDisabled();
    expect(screen.getByText("Searching...")).toBeInTheDocument();
  });

  it("shows error message when date is cleared", async () => {
    render(<Form {...mockProps} />);
    const clearButton = screen.getByRole("button", { name: /close/i });

    await act(async () => {
      await userEvent.click(clearButton);
    });

    expect(screen.getByText("Please select a date")).toBeInTheDocument();
  });
});
