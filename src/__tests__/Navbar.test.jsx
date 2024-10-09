import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Navbar from "@/components/Navbar/Navbar";
import { describe, it, beforeEach, expect } from "vitest";

describe("Navbar Component", () => {
  describe("test rendering", () => {
    beforeEach(() => {
      render(
        <MemoryRouter>
          <Navbar />
        </MemoryRouter>
      );
    });

    it("renders logo", () => {
      const logo = screen.getByAltText(/sdg logo/i);
      expect(logo).toBeInTheDocument();
    });
  });
});
