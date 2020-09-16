import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { Box, Label, Input, Button, Select, Textarea } from "theme-ui";
import { useUser } from "../utils/firebase/auth/useUser";
import useDbUser from "../utils/firebase/firestore/useDbUser";
import firebase from "firebase/app";
import "firebase/firestore";

const registerUser = async (username, email, name, description) => {
    const db = firebase.firestore();

    const docRef = db.collection("users").doc(email);
    await docRef
        .set({
            email: email,
            name: name,
            username: username,
            desc: description,
        })
        .catch((e) => console.error(e));
};

const Form = (props) => {
    const router = useRouter();
    const [inputs, setInputs] = useState({
        name: "",
        username: "default" + Math.random() * 100000,
        desc: "",
    });
    //Getting static props
    const { user, update } = useUser();
    const dbUser = useDbUser(user ? user.email : "default").then((response) => response).catch(
        (e) => {
            console.log("Error with getting dbUser in login.js: " + e);
        }
    );

    const handleSubmit = async (e) => {
        e.preventDefault();
        await update({ displayName: inputs.username });
        await registerUser(
            inputs.username,
            user.email,
            inputs.name,
            inputs.desc
        ).catch((e) => console.error(e));
        router.push(`/accounts/users/${inputs.username}`);
    };
    const handleInputChange = (e) => {
        setInputs({ ...inputs, [e.target.name]: e.target.value });
    };

    if (!user) {
        return <p>No user. Sorry.</p>;
    }

    if (dbUser && dbUser.exists) {
        router.push(`/accounts/users/${dbUser.data().username}`);
    }
    console.log("exists: " + dbUser);
    console.log("username: " + user.displayName);

    return (
        <div>
            <h2>Welcome, {user.displayName || "user"}!</h2>
            <Box as="form" onSubmit={(e) => e.preventDefault()}>
                <Label htmlFor="name">Full Name</Label>
                <Input
                    name="name"
                    id="name"
                    placeholder="My name is..."
                    mb={3}
                    onChange={handleInputChange}
                />

                <Label htmlFor="username">Username</Label>
                <Input
                    name="username"
                    id="username"
                    placeholder="johnnyappleseed321"
                    mb={3}
                    onChange={handleInputChange}
                />

                <Label htmlFor="desc">Description</Label>
                <Textarea
                    name="desc"
                    id="desc"
                    rows="6"
                    mb={3}
                    onChange={handleInputChange}
                />

                <Button onClick={handleSubmit}>Submit</Button>
            </Box>
        </div>
    );
};

export default Form;
