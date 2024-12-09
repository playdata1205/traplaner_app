import React from 'react';
import { Route, Routes } from 'react-router-dom';
import PrivateRouter from './PrivateRouter';
import TravelPlan from '../pages/TravelPlan/TravelPlan';
import TravelBoardList from '../pages/TravelBoard/TravelBoardList';
import TravelBoardDetail from '../pages/TravelBoard/TravelBoardInfo';
import MainPage from '../pages/Main/Main';
import SignUp from '../pages/Member/SignUp';
import SignIn from '../pages/Member/SignIn';
import PasswordChangePage from '../pages/Member/PwChange';
import MyPage from '../pages/MyPage/MyPage';
import MyPageTravelPlan from '../pages/MyPage/MyPageTravelPlan';
import MyPageFavorite from '../pages/MyPage/MyPageFavorite';
import MyTravelBoard from '../pages/MyPage/MyPageTravelBoard';
import TravelBoardInfo from '../pages/MyPage/MyTravelBoardInfo';
const AppRouter = () => {
  return (
    <Routes>
      <Route path='/' element={<MainPage />}></Route>
      <Route path='/members/sign-up' element={<SignUp />}></Route>
      <Route path='/members/sign-in' element={<SignIn />}></Route>
      <Route path='/members/pw-change' element={<PasswordChangePage />}></Route>

      <Route path='/my-page' element={<MyPage />}></Route>
      <Route path='/my-page/mytravel' element={<MyPageTravelPlan />}></Route>
      <Route path='/my-page/favorite' element={<MyPageFavorite />}></Route>
      <Route path='/my-page/mytravelboard' element={<MyTravelBoard />}></Route>
      <Route
        path='/my-page/mytravelboard/info/'
        element={<TravelBoardInfo />}
      ></Route>
      <Route path='/travelboard/list' element={<TravelBoardList />}></Route>
      <Route
        path='/travelboard/info/:boardId'
        element={<TravelBoardDetail />}
      ></Route>
      <Route
        path='/travelboard/toggle-like/:boardId'
        element={<TravelBoardDetail />}
      ></Route>
      <Route
        path='/travelboard/toggle-like/status/:boardId'
        element={<TravelBoardDetail />}
      ></Route>

      {/* <Route
      
      
      <Route
        path='/travelplan'
        element={<PrivateRouter element={<TravelPlan />} />}
      ></Route>
      {/* 
      <Route path='/travelplan' element={<TravelPlan />}></Route>
     
      <Route path='/mypage/account' element={< />}></Route>
      <Route path='/mypage/travelboard' element={< />}></Route>
    
    <Route path='/mypage/mytravel/write' element={<Main />}></Route>
    <Route path='/mypage/favorite' element={<Main />}></Route>
*/}
    </Routes>
  );
};

export default AppRouter;
