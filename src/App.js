import './App.css';
import Login from './pages/login/Login';
import Register from './pages/register/Register';
import Home from './pages/home/Home';
import Footer from './components/footer/Footer';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AuthProvider from './components/auth/AuthProvider';
import ToastProvider from './components/Toaster/ToastContext';
import ProtectedRoute from './components/auth/ProtectedRoute';
import Cart from './pages/cart/Cart';
import Deals from './pages/deals/Deals';
import Profile from './pages/profile/Profile';

function App() {
  return (
    <AuthProvider>
      <ToastProvider>
        <Router>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/" element={<Home />} />
            <Route path="/deals" element={<Deals />} />
            <Route
              path="/cart"
              element={
                <ProtectedRoute>
                  <Cart />
                </ProtectedRoute>
              }
            />

            <Route
              path="/profile"
              element={
                <ProtectedRoute>
                  <Profile />
                </ProtectedRoute>
              }
            />


          </Routes>
          <Footer />
        </Router>
      </ToastProvider>
    </AuthProvider>

  );
}

export default App;
