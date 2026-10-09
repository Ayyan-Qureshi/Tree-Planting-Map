"use client";

import { useEffect, useState } from "react";
import { db } from "../lib/firebase";
import { 
  collection, 
  onSnapshot, 
  addDoc, 
  serverTimestamp 
} from "firebase/firestore";

export default function useTrees() {
  const [trees, setTrees] = useState([]);
  const [loading, setLoading] = useState(true);

  // Listen for real-time updates from Firestore
  useEffect(() => {
    const treesRef = collection(db, "trees");

    const unsubscribe = onSnapshot(
      treesRef,
      (snapshot) => {
        const treeList = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setTrees(treeList);
        setLoading(false);
      },
      (error) => {
        console.error("Firestore listener error:", error);
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, []);

  // Save tree directly to Firestore database
  const addTree = async (treeData) => {
    try {
      await addDoc(collection(db, "trees"), {
        ...treeData,
        createdAt: serverTimestamp(),
      });
    } catch (error) {
      console.error("Error adding tree:", error);
      alert("Error saving tree to Firebase. Make sure Firestore rules allow read/write.");
    }
  };

  return { trees, addTree, loading };
}