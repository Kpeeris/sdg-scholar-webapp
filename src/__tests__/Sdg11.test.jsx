import Sdg11 from "@/pages/sdg11/Sdg11";
import { render, screen, waitFor, fireEvent } from "@testing-library/react";
import { it, expect, describe, vi, afterEach } from "vitest";
import { MemoryRouter, useNavigate } from "react-router-dom";
import { useAuthContext } from "@/AuthProvider";
// Import the mocked Firestore functions
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

const renderComponent = (userRole, userEmail, TargetNum) => {
  useAuthContext.mockReturnValue({
    user: userEmail,
    userData: { email: userEmail, scores: { sdg11t1: 50 } },
    role: userRole,
  });
  getDoc.mockResolvedValue({
    exists: () => true,
    data: () => ({
      targetText: "Test target description",
      targetNumber: `11.${TargetNum}`,
    }),
  });

  getDocs.mockResolvedValue({
    empty: false,
    forEach: (callback) => {
      callback({
        id: "randomId123",
        data: () => ({
          email: "testuser@example.com",
          firstName: "John",
          lastName: "Doe",
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
  //useParams.mockReturnValue({ moduleId: TargetNum });
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
    await waitFor(() => {
      expect(screen.getByAltText("full city")).toBeInTheDocument();
    });
  });

  it("should render the info button", async () => {
    renderComponent("learner", "learner_test@example.com", "1");

    await waitFor(() => {
      expect(screen.getByText("SDG 11")).toBeInTheDocument();
    });
  });

  it("should NOT render dark image when score is 100%", async () => {
    renderComponent("learner", "learner_test@example.com", "1");

    await waitFor(() => {
      expect(screen.queryByTestId("dark-Town Hall")).not.toBeInTheDocument();
    });
  });

  it("should render dark image when score is NOT 100%", async () => {
    renderComponent("learner", "learner_test@example.com", "1");

    await waitFor(() => {
      expect(screen.queryByTestId("dark-Train Station")).toBeInTheDocument();
    });
  });

  it("should render the dialog when the building open button is clicked", async () => {
    renderComponent("learner", "learner_test@example.com", "1");
    screen.debug();
    const openButton = screen.getByTestId("open-Train Station");
    fireEvent.click(openButton);
    await waitFor(() => {
      expect(screen.queryByTestId("Train Station-dialog")).toBeInTheDocument();
    });
  });

  it("should navigate to correct module content on button click inside dialog", async () => {
    const mockNavigate = vi.fn();
    useNavigate.mockReturnValue(mockNavigate);

    renderComponent("learner", "learner_test@example.com", "1");
    const openButton = screen.getByTestId("open-Houses");
    fireEvent.click(openButton);
    await waitFor(() => {
      expect(screen.queryByTestId("Houses-dialog")).toBeInTheDocument();
    });
    const navigateButton = screen.getByTestId("Houses-navigate");
    fireEvent.click(navigateButton);
    expect(mockNavigate).toHaveBeenCalledWith("/module/1/content");
  });
});
