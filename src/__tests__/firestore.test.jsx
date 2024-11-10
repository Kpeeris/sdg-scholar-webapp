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

// clear all data in Firestore
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
    // define user data
    const userId = "user2";
    const userData = {
      name: "John Doe",
      email: "john@example.com",
    };

    // write user data to Firestore
    await setDoc(doc(db, "users", userId), userData);

    // read user data from Firestore
    const docRef = doc(db, "users", userId);
    const docSnap = await getDoc(docRef);

    //  check if the user data is the same
    expect(docSnap.exists()).toBe(true);
    expect(docSnap.data()).toEqual(userData);
  });
});
