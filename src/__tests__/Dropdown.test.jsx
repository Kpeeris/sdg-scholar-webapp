import { describe, it, beforeEach, expect } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";
import Dropdown from "@/components/Navbar/Dropdown";

describe("test dropdown in navbar", async () => {
  beforeEach(() => {
    render(
      <MemoryRouter>
        <Dropdown />
      </MemoryRouter>
    );
  });
  it("should appear when clicked", async () => {
    //screen.debug();
    const dropdownButton = screen.getByRole("button", { name: "SDGs" });
    //console.log("dropdownButton", dropdownButton);

    await waitFor(() => {
      expect(dropdownButton).toHaveAttribute("aria-expanded", "false");
      //expect(screen.queryByText("SDGs")).not.toBeInTheDocument();
    });

    userEvent.click(dropdownButton);

    await waitFor(() => {
      expect(dropdownButton).toHaveAttribute("aria-expanded", "true");
    });
  });
});
