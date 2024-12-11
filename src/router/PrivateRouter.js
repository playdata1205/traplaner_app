import React, { useContext } from 'react';
import { login } from '../context/UserContext';
import { Navigate } from 'react-router-dom';

// element prop을 받도록 수정
const PrivateRouter = ({ element }) => {
  const { isLoggedIn, isInit } = useContext(login);

  if (!isInit) return <div>Loading...</div>;

  if (!isLoggedIn) {
    alert('로그인이 필요합니다!');
    return <Navigate to='/members/sign-in' replace />;
  }

  // element를 직접 반환
  return element;
};

export default PrivateRouter;
