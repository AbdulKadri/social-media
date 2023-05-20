import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setFriends } from "state";
import FlexBetween from "components/styleHelpers/FlexBetween";
import UserImage from "components/styleHelpers/UserImage";
import {
    PersonAddOutlined,
    PersonRemoveOutlined
} from "@mui/icons-material";
import {
    Box,
    IconButton,
    Typography,
    useTheme
} from "@mui/material";

const FriendWidget = ({ friendId, name, subtitle, userPicturePath }) => {
    const dispatch = useDispatch(); // dispatch action to update friends
    const navigate = useNavigate(); // navigate to friend's profile
    const { _id } = useSelector((state) => state.user); // logged in user
    const token = useSelector((state) => state.token); // token for auth
    const friends = useSelector((state) => state.user.friends); // friends list

    const { palette } = useTheme(); // get theme colors
    const primaryLight = palette.primary.light;
    const primaryDark = palette.primary.dark;
    const main = palette.neutral.main;
    const medium = palette.neutral.medium;

    const isFriend = friends.find((friend) => friend._id === friendId); // check if friend is in friends list

    const updateFriend = async () => {
        const response = await fetch(
            `${process.env.REACT_APP_API_URL}/users/${_id}/${friendId}`,
            {
                method: "PATCH",
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
            }
        );
        const data = await response.json();
        dispatch(setFriends({ friends: data }));
    };

    return (
        <FlexBetween>
            <FlexBetween gap="1rem">
                <UserImage image={userPicturePath} size="55px" />
                <Box
                    onClick={() => {
                        navigate(`/profile/${friendId}`);
                        navigate(0);
                    }}
                >
                    <Typography
                        color={main}
                        variant="h5"
                        fontWeight="500"
                        sx={{
                            "&:hover": {
                                color: palette.primary.light,
                                cursor: "pointer",
                            },
                        }}
                    >
                        {name}
                    </Typography>
                    <Typography color={medium} fontSize="0.75rem">
                        {subtitle}
                    </Typography>
                </Box>
            </FlexBetween>
            <IconButton
                onClick={() => updateFriend()}
                sx={{ backgroundColor: primaryLight, p: "0.6rem" }}
            >
                {isFriend ? (
                    <PersonRemoveOutlined sx={{ color: primaryDark }} />
                ) : (
                    <PersonAddOutlined sx={{ color: primaryDark }} />
                )}
            </IconButton>
        </FlexBetween>
    );
};


export default FriendWidget