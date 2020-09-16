import firebase from "firebase/app";
import "firebase/firestore";

const useDbUser = async (email) => {
    const db = firebase.firestore();

    try {
        const ref = db.collection("users").doc(email);
        const doc = await ref.get().catch((e) => console.error("Error within useDbUser" + e));

        if (doc.exists) return volDoc.data();
        return false;
    }
    catch (e) {
        return;
    }
};

export default useDbUser;
