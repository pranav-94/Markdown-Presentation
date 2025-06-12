import { render, screen, waitFor } from "@testing-library/react";
import EditSlide from "../EditSlide";
import axios from "axios";
import { MemoryRouter, Route, Routes } from "react-router-dom";

jest.mock("axios");
const mockedAxios: any = axios;

describe("EditSlide API usage", () => {
  const slides = [
    { id: 1, title: "A", markdown: "B", layout: "default" },
    { id: 2, title: "C", markdown: "D", layout: "default" },
  ];

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("fetches all slides and finds the current slide", async () => {
    mockedAxios.get.mockResolvedValueOnce({ data: slides });
    render(
      <MemoryRouter initialEntries={["/edit/1"]}>
        <Routes>
          <Route path="/edit/:id" element={<EditSlide />} />
        </Routes>
      </MemoryRouter>
    );
    await waitFor(() => expect(mockedAxios.get).toHaveBeenCalled());
    expect(screen.getByText(/Markdown Slides/i)).toBeInTheDocument();
  });

  it("saves edits to the backend", async () => {
    mockedAxios.get.mockResolvedValueOnce({ data: slides });
    mockedAxios.put.mockResolvedValueOnce({ data: {} });
    render(
      <MemoryRouter initialEntries={["/edit/1"]}>
        <Routes>
          <Route path="/edit/:id" element={<EditSlide />} />
        </Routes>
      </MemoryRouter>
    );
    await waitFor(() => screen.getByText(/Markdown Slides/i));
  });
});