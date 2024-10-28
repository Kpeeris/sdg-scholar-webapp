import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
//import { afterEach } from "vitest";
import { it, expect, describe, vi } from "vitest";

import Quiz from "../pages/quiz/Quiz";
// import {
//   doc,
//   getDoc,
//   getDocs,
//   collection,
//   updateDoc,
//   query,
//   where,
//   setDoc,
//   serverTimestamp,
// } from "firebase/firestore";
// import { useAuthContext } from "@/AuthProvider";

// Mock useAuthContext
vi.mock("@/AuthProvider", () => ({
  useAuthContext: vi.fn().mockReturnValue({
    userData: { firstName: "Test", lastName: "User", email: "test@test.com" }, // Mock user data
    role: "admin", // Mock role as “admin” for testing
  }),
}));

describe("Quiz Page", () => {
  it("should render the quiz page", async () => {
    //whether is admin or learner the page should render
    render(
      <MemoryRouter>
        <Quiz />
      </MemoryRouter>
    );
    expect(screen.getByTestId("quiz-page")).toBeInTheDocument();
  });

  describe("Learner", () => {
    it("should render the 'Are you ready?' page for learner", async () => {
      //whether is admin or learner the page should render
      render(
        <MemoryRouter>
          <Quiz />
        </MemoryRouter>
      );
      screen.debug();
    });
  });
  //if admin should render the quiz with edit content button
  //if learner should render "are you ready" page then quiz page without edit button
  //if the user has already taken the quiz, should render the score page
  // when you click submit on the quiz page, should update the user's quiz scores in the database
  // when you click submit sould render the correct score with confetti if 100%
});
