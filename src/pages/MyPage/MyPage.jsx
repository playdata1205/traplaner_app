import React, { useContext, useEffect, useState } from 'react';
import FullCalendar from '@fullcalendar/react'; // FullCalendar React component
import dayGridPlugin from '@fullcalendar/daygrid'; // for the day grid view // DayGrid CSS
import { login } from '../../context/UserContext';
import '../../styles/Mypage.css';
import axiosInstance from '../../configs/axios-config';
import { API_BASE_URL, MYPAGE } from '../../configs/host-config';
import { element } from 'prop-types';

const MyPage = ({ dtoList }) => {
  const { nickName, profile } = useContext(login);
  const [TravelList, setTravelList] = useState([]);
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const getTravelList = async () => {
      const res = await axiosInstance.get(`${API_BASE_URL}${MYPAGE}/my-page`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('ACCESS_TOKEN')}`,
        },
      });
      console.log('asd', res);

      const data = res.data;
      const formattedEvents = data.map((travel) => ({
        title: travel.title,
        start: travel.startDate,
        end: travel.endDate,
        id: travel.id,
      }));

      setEvents(formattedEvents);
    };

    getTravelList();
  }, []);

  const getProfileImage = () => {
    if (!login.profile) {
      return '/assets/img/anonymous.jpg';
    }
    if (login.loginMethod === 'KAKAO') {
      return login.profile;
    }
    return `/display/${profile}`;
  };

  return (
    <div className='mypage'>
      <div className='mypage__content'>
        <div className='mypage__sidebar'>
          <img
            src={getProfileImage()}
            alt='프로필 이미지'
            className='mypage__profile'
          />
          <nav className='mypage__nav'>
            <a href='/my-page/pwChange' className='mypage__nav-link'>
              계정관리
            </a>
            <a href='/my-page/mytravelboard' className='mypage__nav-link'>
              내 게시물
            </a>
            <a href='/my-page/mytravel' className='mypage__nav-link'>
              나의 여행
            </a>
            <a
              href='/my-page'
              className='mypage__nav-link mypage__nav-link--active'
            >
              여행일정
            </a>
            <a href='/my-page/favorite' className='mypage__nav-link'>
              좋아요한 게시물
            </a>
          </nav>
        </div>
        <div className='mypage__calendar'>
          <FullCalendar
            plugins={[dayGridPlugin]}
            initialView='dayGridMonth'
            locale='ko'
            events={events}
          />
        </div>
      </div>
    </div>
  );
};

export default MyPage;
