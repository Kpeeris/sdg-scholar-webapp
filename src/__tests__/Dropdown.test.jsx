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
    const dropdownButton = screen.getByRole("button", { name: "SDGs" });

    //check if the dropdown is hidden
    await waitFor(() => {
      expect(dropdownButton).toHaveAttribute("aria-expanded", "false");
    });

    //click the dropdown button
    userEvent.click(dropdownButton);

    //check if the dropdown is visible
    await waitFor(() => {
      expect(dropdownButton).toHaveAttribute("aria-expanded", "true");
    });
  });
});
