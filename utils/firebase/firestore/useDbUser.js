import firebase from "firebase/app";
import "firebase/firestore";

const useDbUser = async (email) => {
    const db = firebase.firestore();

    try {
        const volRef = db.collection("volunteers").doc(email);
        const volDoc = await volRef.get().catch((e) => console.error(e));
        const orgRef = db.collection("organizers").doc(email);
        const orgDoc = await orgRef.get().catch((e) => console.error(e));

        if (volDoc.exists) return volDoc;
        else if (orgDoc.exists) return orgDoc;
        return false;
    }
    catch (e) {
        return;
    }
};

export default useDbUser;
