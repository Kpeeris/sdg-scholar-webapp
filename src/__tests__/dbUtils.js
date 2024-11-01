import { db } from "./setup";
import {
  doc,
  setDoc,
  deleteDoc,
  collection,
  getDocs,
} from "firebase/firestore";

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
          options: ["London", "Kenya", "Paris", "Dublin"],
          correctAnswers: ["Paris"],
          type: "mcq",
        },
        {
          id: "Q2",
          questionText: "What is the capital of Germany?",
          options: ["Sydney", "Berlin", "Jakarta", "Chennai"],
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
  console.log("data set up");
};

const cleanUpData = async () => {
  await deleteDoc(doc(db, "learners", "learner1"));
  await deleteDoc(doc(db, "learners", "learner2"));

  await deleteDoc(doc(db, "admins", "admin1"));

  const quixIds = ["sdg11t1", "sdg11t2", "sdg11t3"];
  for (const quizId of quixIds) {
    const quizRef = doc(db, "quizzes", quizId);

    const questions = await getDocs(collection(quizRef, "questions"));
    for (const question of questions.docs) {
      await deleteDoc(question.ref);
    }
    //const deletePromises = questions.docs.map((doc) => deleteDoc(doc.ref));
    //await Promise.all(deletePromises);
    await deleteDoc(quizRef);
  }
  console.log("data cleaned up");
};

export { setUpData, cleanUpData };