import React from 'react';
import { Route, Routes } from 'react-router-dom';
import TravelBoard from '../pages/TravelBoardList';
import MainPage from '../pages/Main';
import SignUp from '../pages/SignUp';
import SignIn from '../pages/SignIn';
import PasswordChangePage from '../pages/PwChange';
import MyPage from '../pages/MyPage';
import TravelDetail from '../pages/TravelBoardInfo';
import TravelPlan from '../pages/TravelPlan';
const AppRouter = () => {
  return (
    <Routes>
      <Route path='/' element={<MainPage />}></Route>
      <Route path='/member/sign-up' element={<SignUp />}></Route>
      <Route path='/member/sign-in' element={<SignIn />}></Route>
      <Route path='/member/password' element={<PasswordChangePage />}></Route>
      <Route path='/travelplan' element={<TravelPlan />}></Route>
      <Route path='/my-page' element={<MyPage />}></Route>
      {/* <Route path='/mypage/account' element={< />}></Route>
      <Route path='/mypage/travelboard' element={< />}></Route>
    <Route path='/mypage/mytravel' element={<Main />}></Route>
    <Route path='/mypage/mytravel/write' element={<Main />}></Route>
    <Route path='/mypage/favorite' element={<Main />}></Route> */}
      <Route path='/travelboard/list' element={<TravelBoard />}></Route>
      <Route path='/travelboard/info' element={<TravelDetail />}></Route>
    </Routes>
  );
};

export default AppRouter;
