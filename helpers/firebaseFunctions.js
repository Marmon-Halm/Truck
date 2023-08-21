import { addDoc, collection, getDoc, doc } from 'firebase/firestore';

export const getUserData = async (userId) => {
    const userSnapshot = getDoc(doc(db, "users", userId))
    return userSnapshot.data()
}

