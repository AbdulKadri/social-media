import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import HomePage from 'scenes/homePage';
import LoginPage from 'scenes/loginPage';
import ProfilePage from 'scenes/profilePage';

const App = () => {

  return (
    <div className="app">
      <Router>
        <Routes>
          <Route path="/" element={<LoginPage />} /> {/* This is the default route */}
          <Route path="/home" element={<HomePage />} /> {/* Set homepage route*/}
          <Route path="/profile/:userId" element={<ProfilePage />} /> {/* Set profile page route */}
        </Routes>
      </Router>
    </div>
  );
}

export default App;
