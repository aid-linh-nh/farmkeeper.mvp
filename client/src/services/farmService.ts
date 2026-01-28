import { db } from "../lib/firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";

export const saveFarmSetup = async (data: any) => {
    try {
        const docRef = await addDoc(collection(db, "farms"), {
            ...data,
            createdAt: serverTimestamp(),
        });
        console.log("Document written with ID: ", docRef.id);
        return { success: true, id: docRef.id };
    } catch (e) {
        console.error("Error adding document: ", e);
        return { success: false, error: e };
    }
};
