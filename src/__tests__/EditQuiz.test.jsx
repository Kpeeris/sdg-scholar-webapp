import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { EditQuiz } from "@/pages/quiz/EditQuiz";
import { it, expect, describe, vi, beforeEach, beforeAll } from "vitest";
import {
  MemoryRouter,
  useParams,
  Route,
  Routes,
  useLocation,
} from "react-router-dom";
import { useAuthContext } from "@/AuthProvider";
import { setUpData, cleanUpData } from "./dbUtils";

// Mock the useAuthContext hook
vi.mock("@/AuthProvider", () => {
  return {
    useAuthContext: vi.fn(),
  };
});

// Mock the useParams hook
vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual("react-router-dom");
  return {
    ...actual,
    useParams: vi.fn(),
    useLocation: vi.fn(),
  };
});

const renderComponent = (userRole, userEmail, TargetNum) => {
  useAuthContext.mockReturnValue({
    user: userEmail,
    userData: { email: userEmail, role: userRole },
    role: userRole,
    loading: false,
  });
  useLocation.mockReturnValue({ pathname: `/module/${TargetNum}/editquiz` });
  useParams.mockReturnValue({ moduleId: TargetNum });
  render(
    <MemoryRouter initialEntries={[`/module/${TargetNum}/editquiz`]}>
      <Routes>
        <Route path="/module/:moduleId/editquiz" element={<EditQuiz />} />
      </Routes>
    </MemoryRouter>
  );
};

describe("EditQuiz Component", () => {
  // Set up the database before all tests
  beforeAll(async () => {
    await setUpData();
  });

  // Clear mocks before each test
  beforeEach(() => {
    vi.clearAllMocks();
  });

  afterAll(async () => {
    await cleanUpData();
  });

  it("should render the EditQuiz component", async () => {
    renderComponent("admin", "test_admin@example.com", "1");

    await waitFor(() => {
      expect(screen.getByTestId("EditQuizPage")).toBeInTheDocument();
    });
    screen.debug();
  });
});
