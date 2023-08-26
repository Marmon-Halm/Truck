import { addDoc, collection, getDoc, doc } from 'firebase/firestore';

export const getUserData = async (userId) => {
    const userSnapshot = getDoc(doc(db, "users", userId))
    const chatSnapshot = getDoc(doc(db, 'chat', 'chatDoc'))
    return userSnapshot.data();
    //return chatSnapshot.data();
}

