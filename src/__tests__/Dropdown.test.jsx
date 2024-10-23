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
    const dropdownButton = screen.getByRole("button", { name: "Goals" });

    await waitFor(() => {
      expect(screen.queryByText("SDG Goals")).not.toBeInTheDocument();
    });

    userEvent.click(dropdownButton);

    await waitFor(() => {
      expect(screen.getByText("SDG Goals")).toBeInTheDocument();
    });
  });

  //HAVING TROUBLE TESTING SHADCN COMPONENTS
  //   it("should disappear when clicked again", async () => {
  //     screen.debug();
  //     const dropdownButton = screen.getByRole("button", { name: "Goals" });

  //     await waitFor(() => {
  //       expect(screen.queryByText("SDG Goals")).not.toBeInTheDocument();
  //     });

  //     await userEvent.click(dropdownButton);

  //     await waitFor(() => {
  //       expect(screen.getByText("SDG Goals")).toBeInTheDocument();
  //     });

  //     await waitFor(() => {
  //       userEvent.click(document.body);
  //     });

  //     await waitFor(() => {
  //       expect(screen.queryByText("SDG Goals")).not.toBeInTheDocument();
  //     });
  //   });
});
