import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import Quiz from "../pages/quiz/Quiz";
import { it, expect, describe, vi, beforeEach, beforeAll } from "vitest";
import {
  MemoryRouter,
  useParams,
  Route,
  Routes,
  useLocation,
} from "react-router-dom";
import { useAuthContext } from "@/AuthProvider";
// import { db } from "./setup";
// import {
//   doc,
//   setDoc,
//   deleteDoc,
//   collection,
//   getDocs,
// } from "firebase/firestore";
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

// Render the Quiz component with the given user role, email and test number
const renderComponent = (userRole, userEmail, TargetNum) => {
  useAuthContext.mockReturnValue({
    user: userEmail,
    userData: { email: userEmail, role: userRole },
    role: userRole,
    loading: false,
  });
  useLocation.mockReturnValue({ pathname: `/module/${TargetNum}/quiz` });
  useParams.mockReturnValue({ moduleId: TargetNum });
  render(
    <MemoryRouter initialEntries={[`/module/${TargetNum}/quiz`]}>
      <Routes>
        <Route path="/module/:moduleId/quiz" element={<Quiz />} />
      </Routes>
    </MemoryRouter>
  );
};

describe("Quiz Component", () => {
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

  it("should render the score page if the learner has already has a score,", async () => {
    renderComponent("learner", "test_learner@example.com", "1");
    //screen.debug();
    await waitFor(() => {
      expect(screen.getByTestId("scorePage")).toBeInTheDocument();
      expect(screen.getByText("80%")).toBeInTheDocument();
    });
  });

  it("should render the pre-quiz page if the learner has 0 score,", async () => {
    renderComponent("learner", "learner_test@example.com", "1");

    await waitFor(
      () => {
        expect(screen.getByTestId("preQuizPage")).toBeInTheDocument();
        expect(screen.getByText("Ready for the Quiz?")).toBeInTheDocument();
      },
      { timeout: 5000 }
    );
  });

  it("should render questions when learner clicks start quiz from pre-quiz page", async () => {
    renderComponent("learner", "learner_test@example.com", "1");

    await waitFor(
      () => {
        expect(screen.getByTestId("preQuizPage")).toBeInTheDocument();
      },
      { timeout: 5000 }
    );

    const startQuizButton = screen.getByTestId("startQuizButton");

    fireEvent.click(startQuizButton);

    await waitFor(() => {
      expect(screen.getByTestId("questionsPage")).toBeInTheDocument();
    });

    //check if the questions are rendered
    await waitFor(() => {
      expect(screen.getAllByTestId("questionComponent")).toHaveLength(3);
      expect(
        screen.getByText("What is the capital of France?")
      ).toBeInTheDocument();
    });
    await waitFor(() => {
      expect(
        screen.getByText("What is the capital of Germany?")
      ).toBeInTheDocument();
    });
    await waitFor(() => {
      expect(screen.getByText("Why was 6 scared of 7?")).toBeInTheDocument();
    });
  });

  it("should NOT render edit quiz button for learner", async () => {
    renderComponent("learner", "learner_test@example.com", "1");

    await waitFor(
      () => {
        expect(screen.getByTestId("preQuizPage")).toBeInTheDocument();
      },
      { timeout: 5000 }
    );

    //click start quiz button
    const startQuizButton = screen.getByTestId("startQuizButton");
    fireEvent.click(startQuizButton);

    //check if the page is rendered
    await waitFor(() => {
      expect(screen.getByTestId("questionsPage")).toBeInTheDocument();
      expect(screen.queryByTestId("editQuizButton")).not.toBeInTheDocument();
    });
  });

  it("should render questionsPage AND edit quiz button for admin", async () => {
    renderComponent("admin", "test_admin@example.com", "1");

    //check if the page is rendered
    await waitFor(() => {
      expect(screen.getByTestId("questionsPage")).toBeInTheDocument();
      expect(screen.getByTestId("editQuizButton")).toBeInTheDocument();
    });
  });

  it("should render confirmation dialog if learner clicks submit quiz button ", async () => {
    renderComponent("learner", "learner_test@example.com", "1");

    await waitFor(
      () => {
        expect(screen.getByTestId("preQuizPage")).toBeInTheDocument();
      },
      { timeout: 5000 }
    );

    // Navigate to questions page
    const startQuizButton = screen.getByTestId("startQuizButton");
    fireEvent.click(startQuizButton);

    await waitFor(() => {
      expect(screen.getByTestId("questionsPage")).toBeInTheDocument();
    });

    //select answers
    await waitFor(() => {
      const q1Answer = screen.getByTestId("mcq:Paris");
      const q2Answer = screen.getByTestId("mcq:Berlin");
      const q3Answer1 = screen.getByTestId("ms:7");
      const q3Answer2 = screen.getByTestId("ms:8");
      const q3Answer3 = screen.getByTestId("ms:9");

      expect(q1Answer).toBeInTheDocument();
      expect(q2Answer).toBeInTheDocument();
      expect(q3Answer1).toBeInTheDocument();
      expect(q3Answer2).toBeInTheDocument();
      expect(q3Answer3).toBeInTheDocument();

      fireEvent.click(q1Answer);
      fireEvent.click(q2Answer);
      fireEvent.click(q3Answer1);
      fireEvent.click(q3Answer2);
      fireEvent.click(q3Answer3);
    });

    //click submit button
    const submitButton = screen.getByTestId("submitQuizButton");
    fireEvent.click(submitButton);

    //check if confirmation dialog is rendered
    expect(screen.getByTestId("confirmSubmitDialog")).toBeInTheDocument();
  });
});
