import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import HomePage from 'pages/HomePage';
import SignupLoginPage from 'pages/SignupLoginPage';
import ProfilePage from 'pages/ProfilePage';
import { useMemo } from 'react'; // useMemo is used to prevent unnecessary re-renders
import { useSelector } from 'react-redux'; // useSelector is used to get data from redux store
import { CssBaseline, ThemeProvider } from '@mui/material'; // CssBaseline is used to set default CSS
import { createTheme } from '@mui/material/styles'; // createTheme is used to create a theme
import { themeSettings } from 'styles/theme'; // themeSettings is used to set theme settings
import { ToastContainer } from 'react-toastify'; // ToastContainer is used to display toast messages
import 'react-toastify/dist/ReactToastify.css'; // import CSS for toast messages

const App = () => {
  const mode = useSelector((state) => state.mode); // get mode from redux store
  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]); // create theme based on mode
  const isAuth = Boolean(useSelector((state) => state.token)); // check if user is authenticated or not (if token exists)

  return (
    <div className="app">
      <Router>
        <ThemeProvider theme={theme}> {/* Set theme */}
          <CssBaseline /> {/* Set default CSS */}
          <ToastContainer
            position="top-right"
            autoClose={3000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
          /> {/* Toast messages */}
          <Routes>
            <Route path="/" element={<SignupLoginPage />} /> {/* This is the default route which is the login page */}
            <Route
              path="/home"
              element={isAuth ? <HomePage /> : <Navigate to="/" />} /> {/* check if authenticated if so direct to homepage if not direct to login page */}
            <Route
              path="/profile/:userId"
              element={isAuth ? <ProfilePage /> : <Navigate to="/" />} /> {/* check if authenticated if so direct to profile page if not direct to login page */}
          </Routes>
        </ThemeProvider>
      </Router>
    </div>
  );
};

export default App;
