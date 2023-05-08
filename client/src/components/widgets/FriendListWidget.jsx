import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setFriends } from "state";
import FriendWidget from "components/widgets/FriendWidget";
import WidgetWrapper from "components/styleHelpers/WidgetWrapper";
import { Box, Typography, useTheme } from "@mui/material";

const FriendListWidget = ({ userId }) => {
    const dispatch = useDispatch(); // dispatch actions
    const { palette } = useTheme(); // get theme palette
    const token = useSelector((state) => state.token); // get token from state
    const friends = useSelector((state) => state.user.friends); // get friends from state

    const getFriends = async () => {
        const response = await fetch(
            `http://localhost:3001/users/${userId}/friends`,
            {
                method: "GET",
                headers: { Authorization: `Bearer ${token}` },
            }
        ); // get friends
        const data = await response.json();
        dispatch(setFriends({ friends: data }));
    };

    useEffect(() => {
        getFriends();
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    return (
        <WidgetWrapper>
            {/* display friend list */}
            <Typography
                color={palette.neutral.dark}
                variant="h5"
                fontWeight="500"
                sx={{ mb: "1.5rem" }}
            >
                Friend List
            </Typography>
            <Box display="flex" flexDirection="column" gap="1.5rem">
                {friends.map((friend) => (
                    <FriendWidget
                        key={friend._id}
                        friendId={friend._id}
                        name={`${friend.firstName} ${friend.lastName}`}
                        subtitle={friend.occupation}
                        userPicturePath={friend.picturePath}
                    />
                ))}
            </Box>
        </WidgetWrapper>
    );
};

export default FriendListWidget;