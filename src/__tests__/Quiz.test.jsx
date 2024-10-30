import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import Quiz from "../pages/quiz/Quiz";
import { it, expect, describe, vi, beforeEach, beforeAll } from "vitest";
import { MemoryRouter, useParams } from "react-router-dom";
import { useAuthContext } from "@/AuthProvider";
import { db } from "./setup";
import { doc, setDoc } from "firebase/firestore";

// Mock user data
// const mockUser = { email: "testuser@example.com" };
// const mockUserData = { email: "testuser@example.com", role: "learner" };

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
  useParams.mockReturnValue({ moduleId: TargetNum });
  render(
    <MemoryRouter>
      <Quiz />
    </MemoryRouter>
  );
};

const setUpData = async () => {
  await setDoc(doc(db, "learners", "learner1"), {
    email: "test_learner@example.com",
    firstName: "Test",
    lastname: "Learner",
    scores: { sdg11t1: 80, sdg11t2: 100, sdg11t3: 0 },
  });
  await setDoc(doc(db, "learners", "learner2"), {
    email: "learner_test@example.com",
    firstName: "learner_two",
    lastname: "New",
    scores: { sdg11t1: 0, sdg11t2: 0, sdg11t3: 0 },
  });
  await setDoc(doc(db, "admins", "admin1"), {
    email: "test_admin@example.com",
    firstName: "Test",
    lastname: "Admin",
  });
  const testQuizdata = [
    {
      quizId: "sdg11t1",
      questions: [
        {
          id: "Q1",
          questionText: "What is the capital of France?",
          options: ["London", "Berlin", "Paris", "Dublin"],
          correctAnswers: ["Paris"],
          type: "mcq",
        },
        {
          id: "Q2",
          questionText: "What is the capital of Germany?",
          options: ["London", "Berlin", "Paris", "Dublin"],
          correctAnswers: ["Berlin"],
          type: "mcq",
        },
        {
          id: "Q3",
          questionText: "Why was 6 scared of 7?",
          options: ["because", "7", "8", "9"],
          correctAnswers: ["7", "8", "9"],
          type: "ms",
        },
      ],
    },
    {
      quizId: "sdg11t2",
      questions: [
        {
          id: "Q1",
          questionText: "What does the fox say?",
          options: [
            "Ring-ding-ding-ding-dingeringeding!",
            "Wa-pa-pa-pa-pa-pa-pow!",
            "Joff-tchoff-tchoffo-tchoffo-tchoff!",
            "None of the above",
          ],
          correctAnswers: ["None of the above"],
          type: "mcq",
        },
        {
          id: "Q2",
          questionText: "Who let the dogs out?",
          options: [
            "Baha Men",
            "Snoop Dog",
            "ur mum",
            "the dog let itself out",
          ],
          correctAnswers: ["Baha Men"],
          type: "mcq",
        },
        {
          id: "Q3",
          questionText: "This is a multiple select question",
          options: ["pick", "multiple", "answers", "another answer"],
          correctAnswers: ["pick", "multiple", "answers"],
          type: "ms",
        },
      ],
    },
    {
      quizId: "sdg11t3",
      questions: [
        {
          id: "Q1",
          questionText: "Hotel?",
          options: ["Trivago", "Tripadvisor", "airbnb", "booking.com"],
          correctAnswers: ["Trivago"],
          type: "mcq",
        },
        {
          id: "Q2",
          questionText: "What is the capital of Germany?",
          options: ["London", "Berlin", "Paris", "Dublin"],
          correctAnswers: ["Berlin"],
          type: "mcq",
        },
        {
          id: "Q3",
          questionText: "Can I be bothered thinking of another question?",
          options: [
            "clearly not",
            "not correct",
            "also not correct",
            "I should have used the Qs we alaredy had",
          ],
          correctAnswers: [
            "I should have used the Qs we alaredy had",
            "clearly not",
          ],
          type: "ms",
        },
      ],
    },
  ];

  for (const quiz of testQuizdata) {
    const quizRef = doc(db, "quizzes", quiz.quizId);
    for (const question of quiz.questions) {
      await setDoc(doc(quizRef, "questions", question.id), {
        questionText: question.questionText,
        options: question.options,
        correctAnswers: question.correctAnswers,
        type: question.type,
      });
    }
  }
};

// for some reason, the deleteQuizData function is not working as expected
// const deleteQuizData = async () => {
//   console.log("Clearing quizzes");
//   const quizCollection = collection(db, "quizzes");
//   const quizSnapshot = await getDocs(quizCollection);

//   for (const quizDoc of quizSnapshot.docs) {
//     console.log("deleting quiz", quizDoc.id);

//     const questionCollection = collection(
//       db,
//       "quizzes",
//       quizDoc.id,
//       "questions"
//     );
//     const questionSnapshot = await getDocs(questionCollection);

//     for (const questionDoc of questionSnapshot.docs) {
//       await deleteDoc(
//         doc(db, "quizzes", quizDoc.id, "questions", questionDoc.id)
//       );
//       console.log("deleted question", questionDoc.id);
//     }

//     await deleteDoc(doc(db, "quizzes", quizDoc.id));
//     console.log("deleted quiz", quizDoc.id);
//   }
//   console.log("All Quizzes cleared");
// };

describe("Quiz Component", () => {
  // Set up the database before all tests
  beforeAll(async () => {
    await setUpData();
  });

  // Clear mocks before each test
  beforeEach(() => {
    vi.clearAllMocks();
  });

  // Clear the database after all tests
  //   afterAll(async () => {
  //     deleteQuizData();
  //   });

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

    await waitFor(() => {
      expect(screen.getByTestId("preQuizPage")).toBeInTheDocument();
      expect(screen.getByText("Ready for the Quiz?")).toBeInTheDocument();
    });
  });

  it("should render questions when learner clicks start quiz from pre-quiz page", async () => {
    renderComponent("learner", "learner_test@example.com", "1");

    await waitFor(() => {
      expect(screen.getByTestId("preQuizPage")).toBeInTheDocument();
    });

    const startQuizButton = screen.getByTestId("startQuizButton");

    fireEvent.click(startQuizButton);

    await waitFor(() => {
      expect(screen.getByTestId("questionsPage")).toBeInTheDocument();
    });

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
      screen.debug();
    });
  });

  it("should NOT render edit quiz button for learner", async () => {
    renderComponent("learner", "learner_test@example.com", "1");

    await waitFor(() => {
      expect(screen.getByTestId("preQuizPage")).toBeInTheDocument();
    });

    const startQuizButton = screen.getByTestId("startQuizButton");

    fireEvent.click(startQuizButton);

    await waitFor(() => {
      expect(screen.getByTestId("questionsPage")).toBeInTheDocument();
      expect(screen.queryByTestId("editQuizButton")).not.toBeInTheDocument();
    });
  });

  it("should render questionsPage AND edit quiz button for admin", async () => {
    renderComponent("admin", "test_admin@example.com", "1");

    await waitFor(() => {
      expect(screen.getByTestId("questionsPage")).toBeInTheDocument();
      expect(screen.getByTestId("editQuizButton")).toBeInTheDocument();
    });
  });

  //   // when you click submit on the quiz page, should update the user's quiz scores in the database
  //   // when you click submit sould render the correct score with confetti if 100%
});
