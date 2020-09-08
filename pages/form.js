import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { Box, Label, Input, Button, Select, Textarea } from "theme-ui";
import { useUser } from "../utils/firebase/auth/useUser";
import useDbUser from "../utils/firebase/firestore/useDbUser";
import firebase from "firebase/app";
import "firebase/firestore";

const registerUser = async (userType, email, name, description) => {
    const db = firebase.firestore();

    const docRef = db.collection(`${userType.toLowerCase()}s`).doc(email);
    await docRef
        .set({
            email: email,
            name: name,
            displayName: name.replace(" ", "_"),
            desc: description,
        })
        .catch((e) => console.error(e));
};

const createAccount = () => {
    const router = useRouter();
    const { user, updateProfile } = useUser();
    const [inputs, setInputs] = useState({
        userType: "",
        name: user ? user.displayName : "default",
        desc: "",   
    });
    const dbUser = useDbUser(user ? user.email : {email: "email"})
        .then((dbRes) => {
            return dbRes;
        })
        .catch((e) => console.error(e));

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log("final: ");
        await registerUser(
            inputs.userType,
            user.email,
            inputs.name,
            inputs.desc
        ).catch((e) => console.error(e));
        router.push(
            `/accounts/${inputs.userType.toLowerCase()}s/${inputs.name.replace(" ", "_")}`
        );
    };
    const handleInputChange = (e) => {
        setInputs({ ...inputs, [e.target.name]: e.target.value });
        console.log(inputs);
    };

    useEffect(() => {
        if (dbUser.exists) {
            console.log(dbUser);
            router.push(
                `/accounts/${dbUser.ref}/${dbUser
                    .data()
                    .name.replace(" ", "_")}`
            );
        }
    });
    if (!user) {
        return null;
    }

    return (
        <Box as="form" onSubmit={(e) => e.preventDefault()}>
            {user.displayName ? (
                ""
            ) : (
                <div>
                    <Label htmlFor="name">Full Name</Label>
                    <Input
                        name="name"
                        id="name"
                        placeholder="My name is..."
                        mb={3}
                        onChange={handleInputChange}
                    />
                </div>
            )}

            <Label htmlFor="userType">I am a(n)...</Label>
            <Select
                name="userType"
                id="userType"
                mb={3}
                onChange={handleInputChange}
            >
                <option></option>
                <option>Organizer</option>
                <option>Volunteer</option>
            </Select>

            <Label htmlFor="desc">Description</Label>
            <Textarea
                name="desc"
                id="desc"
                rows="6"
                mb={3}
                onChange={handleInputChange}
            />

            <Button onClick={handleSubmit}>
                Submit
            </Button>
        </Box>
    );
};

export default createAccount;
