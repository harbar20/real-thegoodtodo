import { useRouter } from "next/router";
import Link from 'next/link'
import { useEffect } from "react";
import FirebaseAuth from "../components/FirebaseAuth";
import { useUser } from "../utils/firebase/auth/useUser";

const Auth = () => {
    const { user } = useUser();
    const router = useRouter();

    /*
    useEffect(() => {
        console.log(user);
        if (user) {
            router.push("/form");
        }
    });
    */

    if (!user) {
        return (
            <div>
                <div>
                    <FirebaseAuth />
                </div>
            </div>
        );
    }
    return (
        <Link href="/form">
            Fill out this required secondary form.
        </Link>
    )
};

export default Auth;
