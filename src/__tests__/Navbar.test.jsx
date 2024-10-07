import { fireEvent, render, screen } from "@testing-library/react";
import { BrowserRouter, MemoryRouter } from "react-router-dom";
import Navbar from "@/components/Navbar/Navbar";
import { describe, it, beforeEach } from "vitest";

describe("Navbar Component", () => {
  describe("test rendering", () => {
    beforeEach(() => {
      render(
        <BrowserRouter>
          <Navbar />
        </BrowserRouter>
      );
    });

    it("renders logo", () => {
      const logo = screen.getByAltText(/sdg logo/i);
      expect(logo).toBeInTheDocument();
    });
  });

  describe("test routing in navbar", () => {
    beforeEach(() => {
      render(
        <MemoryRouter initialEntries={["/"]}>
          <Navbar />
        </MemoryRouter>
      );
    });
    it("navigates to Home page when clicking the SDG logo", () => {
      const logo = screen.getByAltText(/sdg logo/i);
      fireEvent.click(logo);
      expect(window.location.pathname).toBe("/");
    });
    it("navigates to Home page when clicking the Home link", () => {
      const home = screen.getByTestId("home-button");
      fireEvent.click(home);
      expect(window.location.pathname).toBe("/");
    });

    // it("navigates to About page when clicking the About link", () => {
    //   const about = screen.getByTestId("about-button");
    //   fireEvent.click(about);
    //   expect(window.location.pathname).toBe("/about");
    // });
  });
});
