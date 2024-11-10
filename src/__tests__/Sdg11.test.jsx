import Sdg11 from "@/pages/sdg11/Sdg11";
import { render, screen, waitFor, fireEvent } from "@testing-library/react";
import { it, expect, describe, vi, afterEach } from "vitest";
import { MemoryRouter, useNavigate } from "react-router-dom";
import { useAuthContext } from "@/AuthProvider";
import { getDoc, getDocs } from "firebase/firestore";

vi.mock("firebase/firestore", () => ({
  getDoc: vi.fn(),
  getDocs: vi.fn(),
  doc: vi.fn(),
  collection: vi.fn(),
  query: vi.fn(),
  where: vi.fn(),
  getFirestore: vi.fn(),
  connectFirestoreEmulator: vi.fn(),
}));

// Mock the useAuthContext hook
vi.mock("@/AuthProvider", () => {
  return {
    useAuthContext: vi.fn(),
  };
});

vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual("react-router-dom");
  return {
    ...actual,
    useNavigate: vi.fn(),
  };
});

// Render the SDG11page with the given user role, email and test number
const renderComponent = (userRole, userEmail, TargetNum) => {
  useAuthContext.mockReturnValue({
    user: userEmail,
    userData: { email: userEmail, scores: { sdg11t1: 50 } },
    role: userRole,
  });

  // Mock the getting firestore data for the target
  getDoc.mockResolvedValue({
    exists: () => true,
    data: () => ({
      targetText: "Test target description",
      targetNumber: `11.${TargetNum}`,
    }),
  });

  // Mock the getting firestore data for the user
  getDocs.mockResolvedValue({
    empty: false,
    forEach: (callback) => {
      callback({
        id: "randomId123",
        data: () => ({
          email: "testuser@example.com",
          firstName: "John",
          lastName: "Doe",
          // the user has 100% score for target 3
          scores: {
            sdg11t1: 0,
            sdg11t2: 0,
            sdg11t3: 100,
            sdg11t4: 0,
            sdg11t5: 0,
            sdg11t6: 0,
            sdg11t7: 0,
            sdg11t8: 0,
            sdg11t9: 0,
            sdg11t10: 0,
          },
        }),
      });
    },
  });

  render(
    <MemoryRouter>
      <Sdg11 />
    </MemoryRouter>
  );
};

describe("Sdg11 Page Component", () => {
  afterEach(() => {
    vi.clearAllMocks();
  });

  it("should render the Sdg11 page", async () => {
    renderComponent("learner", "learner_test@example.com", "1");

    // Check if the full city image is in the document
    await waitFor(() => {
      expect(screen.getByAltText("full city")).toBeInTheDocument();
    });
  });

  it("should render the info button", async () => {
    renderComponent("learner", "learner_test@example.com", "1");

    // Check if the info button is in the document
    await waitFor(() => {
      expect(screen.getByText("SDG 11")).toBeInTheDocument();
    });
  });

  it("should NOT render dark image when score is 100%", async () => {
    renderComponent("learner", "learner_test@example.com", "1");

    // town hall corresponds to target 3 that has 100% score
    await waitFor(() => {
      expect(screen.queryByTestId("dark-Town Hall")).not.toBeInTheDocument();
    });
  });

  it("should render dark image when score is NOT 100%", async () => {
    renderComponent("learner", "learner_test@example.com", "1");

    // Train Station corresponds to target 1 that has 0% score
    await waitFor(() => {
      expect(screen.queryByTestId("dark-Train Station")).toBeInTheDocument();
    });
  });

  it("should render the dialog when the building open button is clicked", async () => {
    renderComponent("learner", "learner_test@example.com", "1");

    const openButton = screen.getByTestId("open-Train Station");
    // Click the open button
    fireEvent.click(openButton);

    // Check if the pop-up is in the document
    await waitFor(() => {
      expect(screen.queryByTestId("Train Station-dialog")).toBeInTheDocument();
    });
  });

  it("should navigate to correct module content on button click inside dialog", async () => {
    const mockNavigate = vi.fn();
    useNavigate.mockReturnValue(mockNavigate);
    renderComponent("learner", "learner_test@example.com", "1");

    // Get the open button
    const openButton = screen.getByTestId("open-Houses");

    // Click the open button
    fireEvent.click(openButton);

    // Check if the pop-up is in the document
    await waitFor(() => {
      expect(screen.queryByTestId("Houses-dialog")).toBeInTheDocument();
    });

    // Get the navigate button
    const navigateButton = screen.getByTestId("Houses-navigate");

    // Click the navigate button
    fireEvent.click(navigateButton);

    // Check if the navigate function is called with the correct path
    expect(mockNavigate).toHaveBeenCalledWith("/module/1/content");
  });
});
