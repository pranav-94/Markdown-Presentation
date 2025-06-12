import { render, screen, waitFor } from "@testing-library/react";
import SlideList from "../SlideList";
import axios from "axios";
import { MemoryRouter } from "react-router-dom";

jest.mock("axios");
let mockedAxios: any = axios;

describe("SlideList API usage", () => {
  const slides = [
    { id: 1, title: "A", markdown: "B", layout: "default" },
    { id: 2, title: "C", markdown: "D", layout: "default" },
  ];

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("fetches slides on mount", async () => {
    mockedAxios.get.mockResolvedValueOnce({ data: slides });
    render(
      <MemoryRouter>
        <SlideList />
      </MemoryRouter>
    );
    expect(mockedAxios.get).toHaveBeenCalledWith("https://markdown-presentation.onrender.com/api/slides");
    await waitFor(() => {
      expect(screen.getByText("A")).toBeInTheDocument();
      expect(screen.getByText("C")).toBeInTheDocument();
    });
  });

  // To test delete/duplicate, you would interact with the delete/duplicate buttons if they exist in the UI.
});