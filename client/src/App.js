import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import HomePage from 'scenes/homePage';
import LoginPage from 'scenes/loginPage';
import ProfilePage from 'scenes/profilePage';
import { useMemo } from 'react'; // useMemo is used to prevent unnecessary re-renders
import { useSelector } from 'react-redux'; // useSelector is used to get data from redux store
import { CssBaseline, ThemeProvider } from '@mui/material'; // CssBaseline is used to set default CSS
import { createTheme } from '@mui/material/styles'; // createTheme is used to create a theme
import { themeSettings } from 'theme'; // themeSettings is used to set theme settings

const App = () => {
  const mode = useSelector((state) => state.mode); // get mode from redux store
  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]); // create theme based on mode

  return (
    <div className="app">
      <Router>
        <ThemeProvider theme={theme}> {/* Set theme */}
          <CssBaseline /> {/* Set default CSS */}
          <Routes>
            <Route path="/" element={<LoginPage />} /> {/* This is the default route */}
            <Route path="/home" element={<HomePage />} /> {/* Set homepage route*/}
            <Route path="/profile/:userId" element={<ProfilePage />} /> {/* Set profile page route */}
          </Routes>
        </ThemeProvider>
      </Router>
    </div>
  );
};

export default App;
