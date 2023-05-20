import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setPost } from "state";
import FlexBetween from "components/styleHelpers/FlexBetween";
import WidgetWrapper from "components/styleHelpers/WidgetWrapper"
import Friend from "./FriendWidget";
import {
    ChatBubbleOutlineOutlined,
    FavoriteBorderOutlined,
    FavoriteOutlined,
    ShareOutlined,
} from "@mui/icons-material";
import {
    Box,
    Divider,
    IconButton,
    Typography,
    useTheme
} from "@mui/material";

const PostWidget = ({
    postId,
    postUserId,
    name,
    description,
    location,
    picturePath,
    userPicturePath,
    likes,
    comments,
}) => {
    const [isComments, setIsComments] = useState(false); // toggle comments
    const dispatch = useDispatch(); // dispatch actions
    const token = useSelector((state) => state.token); // get token from state
    const loggedInUserId = useSelector((state) => state.user._id); // get user id from state
    const isLiked = Boolean(likes[loggedInUserId]); // check if user liked the post
    const likeCount = Object.keys(likes).length; // get number of likes

    const { palette } = useTheme(); // get theme palette
    const main = palette.neutral.main;
    const primary = palette.primary.main;

    const updateLike = async () => {
        const response = await fetch(`${process.env.REACT_APP_API_URL}/posts/${postId}/like`, {
            method: "PATCH",
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ userId: loggedInUserId }),
        }); // update like
        const updatedPost = await response.json();
        dispatch(setPost({ post: updatedPost }));
    };

    return (
        <WidgetWrapper m="2rem 0">
            {/* display friend info */}
            <Friend
                friendId={postUserId}
                name={name}
                subtitle={location}
                userPicturePath={userPicturePath}
            />

            {/* display post description */}
            <Typography color={main} sx={{ mt: "1rem" }}>
                {description}
            </Typography>

            {/* display post image */}
            {picturePath && (
                <img
                    width="100%"
                    height="auto"
                    alt="post"
                    style={{ borderRadius: "0.75rem", marginTop: "0.75rem" }}
                    src={`${process.env.REACT_APP_API_URL}/assets/${picturePath}`}
                />
            )}

            <FlexBetween mt="0.25rem">
                <FlexBetween gap="1rem">
                    <FlexBetween gap="0.3rem">
                        <IconButton onClick={updateLike}>
                            {/* display like icon */}
                            {isLiked ? (
                                <FavoriteOutlined sx={{ color: primary }} />
                            ) : (
                                <FavoriteBorderOutlined />
                            )}
                        </IconButton>
                        <Typography>{likeCount}</Typography>
                    </FlexBetween>

                    <FlexBetween gap="0.3rem">
                        {/* display comment icon */}
                        <IconButton onClick={() => setIsComments(!isComments)}>
                            <ChatBubbleOutlineOutlined />
                        </IconButton>
                        {/* display number of comments */}
                        <Typography>{comments.length}</Typography>
                    </FlexBetween>
                </FlexBetween>

                <IconButton>
                    <ShareOutlined />
                </IconButton>
            </FlexBetween>

            {/* display comments */}
            {isComments && (
                <Box mt="0.5rem">
                    {comments.map((comment, i) => (
                        <Box key={`${name}-${i}`}>
                            <Divider />
                            <Typography sx={{ color: main, m: "0.5rem 0", pl: "1rem" }}>
                                {comment}
                            </Typography>
                        </Box>
                    ))}
                    <Divider />
                </Box>
            )}
        </WidgetWrapper>
    );
};

export default PostWidget;