import React, { useContext } from 'react';
import { login } from '../context/UserContext';
import { Navigate } from 'react-router-dom';

// children prop을 받도록 수정
const PrivateRouter = ({ children }) => {
  const { isLoggedIn, isInit } = useContext(login);

  if (!isInit) return <div>Loading...</div>;

  if (!isLoggedIn) {
    alert('로그인 안함!');
    return <Navigate to='/members/sign-in' replace />;
  }

  // children을 직접 반환
  return children;
};

export default PrivateRouter;
