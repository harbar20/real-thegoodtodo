import { useEffect } from "react";
import { useRouter } from "next/router";
import Layout from "../../../components/layout";
import { useUser } from "../../../utils/firebase/auth/useUser";
import useDbUser from "../../../utils/firebase/firestore/useDbUser";

const UserPage = () => {
    const router = useRouter();
    const {user} = useUser();
    const dbUser = useDbUser(user ? user.displayName : "default")
        .then((response) => {
            return response;
        })
        .catch((e) => console.error("Error with dbUser in [name].js: " + e));
    const username = router.query.name;
    const pageUser = useDbUser(username)
        .then((response) => {
            return response;
        })
        .catch((e) => console.error("Error with pageUser in [name].js: " + e));
    console.log(pageUser);
    const realName = pageUser ? pageUser.data().name.split(" ")[0] : "invalid";

    if (dbUser.data().email === pageUser.data().email) {
        return (
            <Layout>
                <h1>Welcome to your page, {realName}!</h1>
            </Layout>
        );
    }

    if (!pageUser.exists) {
        return <p>This is not a valid user. Please try again.</p>;
    }

    return (
        <Layout>
            <h1>Welcome to {realName}'s page!</h1>
        </Layout>
    );
};

export default UserPage;
