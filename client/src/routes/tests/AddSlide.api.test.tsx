import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import AddSlide from "../AddSlide";
import axios from "axios";
import { MemoryRouter } from "react-router-dom";

// Naive axios mock
jest.mock("axios");
const mockedAxios = axios;

describe("AddSlide API usage", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("submits new slide to API", async () => {
    //@ts-ignore
    mockedAxios.post.mockResolvedValueOnce({ data: { id: 1 } });
    render(
      <MemoryRouter>
        <AddSlide />
      </MemoryRouter>
    );

    // Enter title
    fireEvent.change(screen.getByPlaceholderText(/title/i), { target: { value: "Test Slide" } });
    // Enter markdown (assume there's a textarea with placeholder "Markdown" or similar)
    fireEvent.change(screen.getByRole("textbox"), { target: { value: "# Hello" } });

    // Click the save button (assume button contains "Save")
    fireEvent.click(screen.getByText(/save/i));

    await waitFor(() => {
      expect(mockedAxios.post).toHaveBeenCalledWith(
        "https://markdown-presentation.onrender.com/api/slides",
        expect.objectContaining({ title: "Test Slide" })
      );
    });
  });
});