import { render, screen, waitFor } from "@testing-library/react";
import PresentSlide from "../PresentSlide";
import axios from "axios";
import { MemoryRouter, Route, Routes } from "react-router-dom";

jest.mock("axios");
let mockedAxios: any = axios;

describe("PresentSlide API usage", () => {
  const slides = [
    { id: 1, title: "A", markdown: "B", layout: "default" },
    { id: 2, title: "C", markdown: "D", layout: "default" },
  ];

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("fetches slides and displays them", async () => {
    mockedAxios.get.mockResolvedValueOnce({ data: slides });
    render(
      <MemoryRouter initialEntries={["/present/1"]}>
        <Routes>
          <Route path="/present/:id" element={<PresentSlide />} />
        </Routes>
      </MemoryRouter>
    );
    await waitFor(() => expect(mockedAxios.get).toHaveBeenCalled());
    expect(screen.getByText("A")).toBeInTheDocument();
  });
});