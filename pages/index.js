import Link from "next/link";
import Layout from "../components/layout";
import { useUser } from "../utils/firebase/auth/useUser";

const Index = () => {
    const { user, logout } = useUser();
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
                <p>You're signed in. Email: {user.email}</p>
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
