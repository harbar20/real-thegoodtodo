import { useRouter } from "next/router";
import Link from 'next/link'
import { useEffect } from "react";
import FirebaseAuth from "../components/FirebaseAuth";
import { useUser } from "../utils/firebase/auth/useUser";
import useDbUser from '../utils/firebase/firestore/useDbUser';

const Auth = () => {
    const { user } = useUser();
    const router = useRouter();
    const dbUser = useDbUser(user ? user.displayName : "default").then((response) => response).catch((e) => {
        console.log("Error with getting dbUser in login.js: " + e);
    });

    if (!user) {
        return (
            <div>
                <div>
                    <FirebaseAuth />
                </div>
            </div>
        );
    }
    
    if (!(dbUser && dbUser.exists)) {
        router.push('/form');
    }

    //router.push(`/accounts/users/${user.displayName}`);
    return null;
};

export default Auth;
