import {
  setDoc,
  doc,
  getDoc,
  collection,
  getDocs,
  deleteDoc,
} from "firebase/firestore";
import { describe, it, expect, afterEach } from "vitest";
import { db } from "./setup";

const clearFirestoreData = async () => {
  const usersCollection = collection(db, "users");
  const userDocs = await getDocs(usersCollection);
  const deletePromises = userDocs.docs.map((doc) => deleteDoc(doc.ref));
  await Promise.all(deletePromises);
};

describe("Firestore Emulator Tests", () => {
  afterEach(async () => {
    await clearFirestoreData();
  });

  it("should add a user and retrieve it", async () => {
    // Arrange
    const userId = "user2";
    const userData = {
      name: "John Doe",
      email: "john@example.com",
    };

    // Act
    await setDoc(doc(db, "users", userId), userData);

    const docRef = doc(db, "users", userId);
    const docSnap = await getDoc(docRef);

    // Assert
    expect(docSnap.exists()).toBe(true);
    expect(docSnap.data()).toEqual(userData);
  });
});
