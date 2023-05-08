import { Box, Typography, useTheme, useMediaQuery } from "@mui/material"
import Form from "../components/forms/SignupLoginForms"

const LoginPage = () => {
    const theme = useTheme(); // use the themes we have defined in theme.js
    const isNonMobileScreens = useMediaQuery("min-width: 1000px"); // check if the screen is mobile or not

    return (
        <Box>
            <Box
                width="100%"
                backgroundColor={theme.palette.background.alt}
                p="1rem 6%"
                textAlign="center">
                {/* LOGO */}
                <Typography
                    fontWeight="bold"
                    fontSize="32px"
                    color="primary"
                >
                    SportNexus
                </Typography>
            </Box>

            <Box
                width={isNonMobileScreens ? "50%" : "93%"}
                p="2rem"
                m="2rem auto"
                borderRadius="1.5rem"
                backgroundColor={theme.palette.background.alt}>
                {/* LOGIN */}
                <Typography
                    fontWeight="500"
                    variant="h5"
                    sx={{ mb: "1.5rem" }}
                >
                    Welcome to SportNexus, The Social Network for Sports Fans!
                </Typography>

                {/* REGISTER/LOGIN FORM */}
                <Form />
            </Box>
        </Box>
    )
}

export default LoginPage