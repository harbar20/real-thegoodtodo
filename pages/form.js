import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { Box, Label, Input, Button, Select, Textarea } from "theme-ui";
import useUser from "../utils/firebase/auth/useUser";
import useRegisterUser from "../utils/firebase/firestore/useRegisterUser";
import useDbUserExists from "../utils/firebase/firestore/useDbUserExists";

const createAccount = () => {
    const router = useRouter();
    const { user } = useUser();
    const [inputs, setInputs] = useState({
        userType: "",
        name: user.displayName,
        desc: "",
    });

    const handleSubmit = async (e) => {
        await useRegisterUser(
            inputs.userType,
            user.email,
            inputs.name,
            inputs.desc
        );
        router.push(
            `/accounts/${inputs.userType}s/${inputs.name.replace(" ", "_")}`
        );
    };
    const handleInputChange = (e) => {
        setInputs({ ...inputs, [e.target.name]: e.target.value });
    };

    useEffect(async () => {
        const dbUser = await useDbUserExists();
        if (dbUser) {
            router.push(`/accounts/${dbUser.ref}/${dbUser.data().name.replace(" ", "_")}`);
        }
    })

    return (
        <Box as="form" onSubmit={handleSubmit}>
            {user.displayName ? (
                ""
            ) : (
                <div>
                    {" "}
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

            <Button type="submit" onClick={handleSubmit}>
                Submit
            </Button>
        </Box>
    );
};

export default createAccount;
