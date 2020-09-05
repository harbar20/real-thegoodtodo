import * as admin from "firebase-admin";
import {useUser} from '../auth/useUser'

const useRegisterUser = async (userType, email, name, description) => {
    const {updateProfile} = useUser();

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

    const docRef = db.collection(`${userType.toLowerCase()}s`).doc(email);

    updateProfile({displayName: name.replace(" ", "_")})
    await docRef.set({
        email: email,
        name: name,
        desc: description,
    });
};

export default useRegisterUser;
