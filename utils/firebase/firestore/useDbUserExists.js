import * as admin from "firebase-admin";

const useDbUserExists = async (email) => {
    if (!admin.apps.length) {
        admin.initializeApp({
            credential: admin.credential.cert({
                projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
                clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
                // https://stackoverflow.com/a/41044630/1332513
                privateKey: firebasePrivateKey.replace(/\\n/g, "\n"),
            }),
            databaseURL: process.env.NEXT_PUBLIC_FIREBASE_DATABASE_URL,
        });
    }

    const db = admin.firestore();

    const volRef = db.collection("volunteers").doc(email);
    const volDoc = await volRef.get();
    const orgRef = db.collection("organizers").doc(email);
    const orgDoc = await orgRef.get();

    if (volDoc.exists) return volDoc;
    else if (orgDoc.exists) return orgDoc;
    return false;
};

export default useDbUserExists;