// import React from 'react';
// import { Navigate, useLocation } from 'react-router-dom';
// import { useAuth } from './AuthProvider';

// const ProtectedRoute = ({ children }) => {
//   const { isLoggedIn } = useAuth();
//   const location = useLocation();

//   console.log(isLoggedIn)

//   if (!isLoggedIn) {
//     return <Navigate to="/" state={{ from: location }} replace />;
//   }

//   return children;
// };

// export default ProtectedRoute;

import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from './AuthProvider';

const ProtectedRoute = ({ children }) => {
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (user === null) {
      navigate('/');
    }
  }, [user, navigate]);

  return user ? children : null;
};

export default ProtectedRoute;
