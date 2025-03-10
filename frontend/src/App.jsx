import { Routes, Route } from 'react-router-dom';
import SignIn from './components/SignIn';
import Navbar from './components/Navbar';
import View from './components/View';
import MockInterview from './components/MockInterview';
import Interface from './components/Interface';
import Welcome from './components/Welcome';

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Welcome />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/v" element={<View />} />
        <Route path="/mock-interview" element={<MockInterview />} />
        <Route path="/interface" element={<Interface />} />
      </Routes>
    </>
  );
}

export default App;
