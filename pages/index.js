import Link from "next/link";
import Layout from "../components/layout";
import { useUser } from "../utils/firebase/auth/useUser";
import useDbUser from '../utils/firebase/firestore/useDbUser';

const Index = () => {
    const { user, logout } = useUser();
    const dbUser = useDbUser(user ? user.displayName : "default").then((response) => {
        return response;
    })
    if (!user) {
        return (
            <Layout>
                <p>Hi there!</p>
                <p>
                    You are not signed in.{" "}
                    <Link href={"/login"}>
                        <a>Sign in</a>
                    </Link>
                </p>
            </Layout>
        );
    }

    return (
        <div>
            <div>
                <p>Your email is both {user.email} and {dbUser.email}</p>
                <p
                    style={{
                        display: "inline-block",
                        color: "blue",
                        textDecoration: "underline",
                        cursor: "pointer",
                    }}
                    onClick={() => logout()}
                >
                    Log out
                </p>
            </div>
        </div>
    );
};

export default Index;
