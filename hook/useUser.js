import React, { useEffect, useState } from "react";
import useAuth from "./useAuth";
import {
  DocumentData,
  Unsubscribe,
  collection,
  doc,
  getDoc,
  getDocs,
  onSnapshot,
  query,
  where,
} from "firebase/firestore";
import { db } from "../config";

export default function useUser() {
  const { authPromise } = useAuth();
  const [userData, setUserData] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let unsubscribe; // Define a variable to store the unsubscribe function

    const fetchUserData = async () => {
      setIsLoading(true);
      try {
        const authUser = await authPromise;
        const userRef = doc(db, "users", authUser?.uid);

        // Subscribe to the snapshot and store the unsubscribe function in the variable
        unsubscribe = onSnapshot(userRef, (doc) => {
          const userData = doc.data();
          setUserData(userData);
          setIsLoading(false);
        });
      } catch (error) {
        console.log("error resolving promise ", error);
        setIsLoading(false);
      }
    };

    fetchUserData();

    // Clean up the subscription when the component unmounts
    return () => {
      if (unsubscribe) {
        unsubscribe();
      }
    };
  }, []);

  return {
    isLoading,
    userData,
  };
}