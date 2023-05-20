import { useState } from 'react';
import {
    Box,
    Button,
    Typography,
    TextField,
    useMediaQuery,
    useTheme
} from '@mui/material';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import { Formik } from 'formik';
import * as yup from 'yup';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setLogin } from 'state'
import Dropzone from 'react-dropzone';
import FlexBetween from 'components/styleHelpers/FlexBetween';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const registerSchema = yup.object().shape({
    firstName: yup.string().required("First name is required"),
    lastName: yup.string().required("Last name is required"),
    email: yup.string().email("Invalid email").required("Email is required"),
    password: yup.string().required("Password is required"),
    location: yup.string().required("Location is required"),
    occupation: yup.string().required("Occupation is required"),
    picture: yup.string().required("Picture is required"),
}); // yup validation schema

const loginSchema = yup.object().shape({
    email: yup.string().email("Invalid email").required("Email is required"),
    password: yup.string().required("Password is required"),
}); // yup validation schema

const initialValuesRegister = {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    location: "",
    occupation: "",
    picture: "",
}; // initial values for register form

const initialValuesLogin = {
    email: "",
    password: "",
}; // initial values for login form

const Form = () => {
    const [pageType, setPageType] = useState("login"); // page type (login or register)
    const { palette } = useTheme(); // mui theme
    const dispatch = useDispatch(); // redux dispatch
    const navigate = useNavigate(); // react router
    const isNonMobileScreens = useMediaQuery("(min-width: 600px)"); // media query for non-mobile screens
    const isLogin = pageType === "login"; // check if the page type is login or not
    const isRegister = pageType === "register"; // check if the page type is register or not

    const register = async (values, onSubmitProps) => {
        const formData = new FormData(); // allows us to send form info with image
        for (let value in values) {
            formData.append(value, values[value]);
        } // append all values to form data
        formData.append("picture", values.picture.name); // append picture to form data

        const saveUserResponse = await fetch(`${process.env.REACT_APP_API_URL}/auth/register`, {
            method: "POST",
            body: formData,
        }); // send form data to backend

        const savedUser = await saveUserResponse.json(); // get saved user from backend
        onSubmitProps.resetForm(); // reset form

        if (savedUser) {
            setPageType("login"); // change page type to login
            toast.success("Registration successful.", {
                position: toast.POSITION.BOTTOM_CENTER
            }); // show success toast
        } else {
            toast.error("Registration failed. Please try again.", {
                position: toast.POSITION.BOTTOM_CENTER
            }); // show error toast
        }
    }; // register user

    const login = async (values, onSubmitProps) => {
        const loggedInResponse = await fetch(`${process.env.REACT_APP_API_URL}/auth/login`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(values),
        }); // send form data to backend

        const loggedIn = await loggedInResponse.json(); // get logged in user from backend
        onSubmitProps.resetForm(); // reset form

        if (loggedIn) {
            dispatch(setLogin({
                user: loggedIn.user,
                token: loggedIn.token,
            })); // set user in redux store

            navigate("/home"); // navigate to home page
            toast.success("Login successful.", {
                position: toast.POSITION.BOTTOM_CENTER
            }); // show success toast
        } else {
            toast.error("Login failed. Please try again.", {
                position: toast.POSITION.BOTTOM_CENTER
            }); // show error toast
        }
    }; // login user

    const handleFormSubmit = async (values, onSubmitProps) => {
        if (isLogin) await login(values, onSubmitProps); // handle login
        if (isRegister) await register(values, onSubmitProps); // handle register
    }; // handle form submit

    return (
        <Formik
            onSubmit={handleFormSubmit} // form submit handler
            initialValues={isLogin ? initialValuesLogin : initialValuesRegister} // use login initial values if the page type is login, otherwise use register initial values
            validationSchema={isLogin ? loginSchema : registerSchema} // use login schema if the page type is login, otherwise use register schema
        >
            {({
                values, // form values
                errors, // form errors
                touched, // form touched fields
                handleBlur, // formik event handler for onBlur event on form fields 
                handleChange, // formik event handler for onChange event on form fields
                handleSubmit, // formik event handler for onSubmit event on form
                setFieldValue, // formik event handler for setting form field value
                resetForm, // formik event handler for resetting form
            }) => (
                <form onSubmit={handleSubmit}>
                    <Box
                        display="grid"
                        gap="30px"
                        gridTemplateColumns="repeat(4, minmax(0, 1fr))"
                        sx={{
                            "& > div": {
                                gridColumn: isNonMobileScreens ? undefined : "span 4",
                            }
                        }}
                    >
                        {/* REGISTER FORM */}
                        {isRegister && (
                            <>
                                {/* FIRST NAME */}
                                <TextField
                                    label="First Name"
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    value={values.firstName}
                                    name="firstName"
                                    error={Boolean(touched.firstName) && Boolean(errors.firstName)}
                                    helperText={touched.firstName && errors.firstName}
                                    sx={{ gridColumn: "span 2" }}
                                />

                                {/* LAST NAME */}
                                <TextField
                                    label="Last Name"
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    value={values.lastName}
                                    name="lastName"
                                    error={Boolean(touched.lastName) && Boolean(errors.lastName)}
                                    helperText={touched.lastName && errors.lastName}
                                    sx={{ gridColumn: "span 2" }}
                                />

                                {/* LOCATION */}
                                <TextField
                                    label="Location"
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    value={values.location}
                                    name="location"
                                    error={Boolean(touched.location) && Boolean(errors.location)}
                                    helperText={touched.location && errors.location}
                                    sx={{ gridColumn: "span 4" }}
                                />

                                {/* OCCUPATION */}
                                <TextField
                                    label="Occupation"
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    value={values.occupation}
                                    name="occupation"
                                    error={Boolean(touched.occupation) && Boolean(errors.occupation)}
                                    helperText={touched.occupation && errors.occupation}
                                    sx={{ gridColumn: "span 4" }}
                                />

                                {/* PICTURE */}
                                <Box
                                    gridColumn="span 4"
                                    border={`1px solid ${palette.neutral.medium}`}
                                    borderRadius="5px"
                                    p="1rem">
                                    <Dropzone
                                        acceptedFiles=".jpg,.jpeg,.png"
                                        multiple={false}
                                        onDrop={(acceptedFiles =>
                                            setFieldValue("picture", acceptedFiles[0]))}
                                    >
                                        {({ getRootProps, getInputProps }) => (
                                            <Box
                                                {...getRootProps()}
                                                border={`2ps dashed ${palette.primary.main}`}
                                                p="1rem"
                                                sx={{
                                                    "&:hover": { cursor: "pointer" }
                                                }}
                                            >
                                                <input {...getInputProps()} />
                                                {!values.picture ? (
                                                    <p>Add Picutre Here</p>
                                                ) : (
                                                    <FlexBetween>
                                                        <Typography>{values.picture.name}</Typography>
                                                        <EditOutlinedIcon />
                                                    </FlexBetween>
                                                )}
                                            </Box>
                                        )}
                                    </Dropzone>
                                </Box>
                            </>
                        )}
                        {/* EMAIL */}
                        <TextField
                            label="Email"
                            onBlur={handleBlur}
                            onChange={handleChange}
                            value={values.email}
                            name="email"
                            error={Boolean(touched.email) && Boolean(errors.email)}
                            helperText={touched.email && errors.email}
                            sx={{ gridColumn: "span 4" }}
                        />

                        {/* PASSWORD */}
                        <TextField
                            label="Password"
                            type="password"
                            onBlur={handleBlur}
                            onChange={handleChange}
                            value={values.password}
                            name="password"
                            error={Boolean(touched.password) && Boolean(errors.password)}
                            helperText={touched.password && errors.password}
                            sx={{ gridColumn: "span 4" }}
                        />
                    </Box>

                    {/* BUTTONS */}
                    <Box>
                        <Button
                            fullWidth
                            type="submit"
                            sx={{
                                m: "2rem 0",
                                p: "1rem",
                                backgroundColor: palette.primary.main,
                                color: palette.background.alt,
                                "&:hover": { color: palette.primary.main }
                            }}
                        >
                            {isLogin ? "LOGIN" : "REGISTER"}
                        </Button>
                        <Typography
                            onClick={() => {
                                setPageType(isLogin ? "register" : "login");
                                resetForm();
                            }}
                            sx={{
                                textDecoration: "underline",
                                color: palette.primary.main,
                                "&:hover": {
                                    cursor: "pointer",
                                    color: palette.primary.light,
                                }
                            }}
                        >
                            {isLogin
                                ? "Don't have an account? Sign up here."
                                : "Already have an account? Login here."
                            } {/* toggle between login and register */}
                        </Typography>
                    </Box>
                </form>
            )}
        </Formik>
    )
}

export default Form