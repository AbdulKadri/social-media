import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { Box, useMediaQuery } from "@mui/material";
import Navbar from "components/layout/Navbar";
import FriendListWidget from "components/widgets/FriendListWidget";
import MyPostWidget from "components/widgets/MyPostWidget";
import PostsWidget from "components/widgets/PostsWidget";
import UserWidget from "components/widgets/UserWidget";

const ProfilePage = () => {
    const [user, setUser] = useState(null); // state for user data
    const { userId } = useParams(); // get userId from url
    const token = useSelector((state) => state.token); // get token from redux store
    const isNonMobileScreens = useMediaQuery("(min-width:1000px)"); // check if screen is non-mobile

    const getUser = async () => {
        const response = await fetch(`${process.env.REACT_APP_API_URL}/users/${userId}`, {
            method: "GET",
            headers: { Authorization: `Bearer ${token}` },
        }); // get user data from server
        const data = await response.json();
        setUser(data);
    };

    useEffect(() => {
        getUser();
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    // TODO: add loading screen
    if (!user) return null;

    return (
        <Box>
            <Navbar />
            <Box
                width="100%"
                padding="2rem 6%"
                display={isNonMobileScreens ? "flex" : "block"}
                gap="2rem"
                justifyContent="center"
            >
                <Box flexBasis={isNonMobileScreens ? "26%" : undefined}>
                    <UserWidget userId={userId} picturePath={user.picturePath} />
                    <Box m="2rem 0" />
                    <FriendListWidget userId={userId} />
                </Box>
                <Box
                    flexBasis={isNonMobileScreens ? "42%" : undefined}
                    mt={isNonMobileScreens ? undefined : "2rem"}
                >
                    <MyPostWidget picturePath={user.picturePath} />
                    <Box m="2rem 0" />
                    <PostsWidget userId={userId} isProfile />
                </Box>
            </Box>
        </Box>
    );
};

export default ProfilePage;