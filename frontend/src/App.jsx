import { useState, useEffect } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
import SignIn from './components/SignIn';
import Navbar from './components/Navbar';
// import Add from './components/Add';
import View from './components/View';
import MockInterview from './components/MockInterview';
import Interface from './components/Interface';
// import aivideao from './components/Aivideao';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  const handleLogin = () => {
    setIsLoggedIn(true);
    localStorage.setItem('isLoggedIn', 'true');
    navigate('/v');
  };

  useEffect(() => {
    const loggedIn = localStorage.getItem('isLoggedIn') === 'true';
    setIsLoggedIn(loggedIn);

    if (loggedIn && window.location.pathname === '/') {
      navigate('/v');
    }
  }, [navigate]);

  return (
    <>
      {/* Pass setIsLoggedIn to Navbar to handle logout */}
      {isLoggedIn && <Navbar setIsLoggedIn={setIsLoggedIn} />}

      <Routes>
        <Route path="/" element={<SignIn onLogin={handleLogin} />} />
        {isLoggedIn && (
          <>
            <Route path="/v" element={<View />} />
            {/* <Route path="/start" element={<StartInterview />} /> */}
            <Route path="/mock-interview" element={<MockInterview />} />
            <Route path="/interface" element={<Interface/>} />
            <Route path="/a" element={<Navbar />} />
            {/* <Route path="/Aivideao" element={<Aivideao />} /> */}
          </>
        )}
      </Routes>
    </>
  );
}

export default App;