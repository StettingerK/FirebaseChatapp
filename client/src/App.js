import Register from './pages/Register';
import LoginPage from './pages/Login';
import BaseLayout from './pages/Home';
import Test from './pages/test.js';
import {BrowserRouter, Navigate, Route, Routes} from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/app" element={<BaseLayout/>} />
        <Route path="/register" element={<Register/>} />
        <Route path="*" element={<Navigate to="/register" />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
