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
      const formattedEvents = data.map((travel) => {
        const startDate = new Date(travel.startDate);
        const endDate = new Date(travel.endDate);

        startDate.setDate(startDate.getDate() + 1);
        endDate.setDate(endDate.getDate() + 1);

        return {
          title: travel.title,
          start: startDate.toISOString().split('T')[0],
          end: endDate.toISOString().split('T')[0],
          id: travel.id,
        };
      });

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
    <div className='travel-mypage'>
      <div className='travel-mypage__content'>
        <div className='travel-mypage__sidebar'>
          <img
            src={getProfileImage()}
            alt='프로필 이미지'
            className='travel-mypage__profile-image'
          />
          <nav className='travel-mypage__navigation'>
            <a
              href='/my-page/pwChange'
              className='travel-mypage__navigation-link'
            >
              계정관리
            </a>
            <a
              href='/my-page/mytravelboard'
              className='travel-mypage__navigation-link'
            >
              내 게시물
            </a>
            <a
              href='/my-page/mytravel'
              className='travel-mypage__navigation-link'
            >
              나의 여행
            </a>
            <a
              href='/my-page'
              className='travel-mypage__navigation-link travel-mypage__navigation-link--active'
            >
              여행일정
            </a>
            <a
              href='/my-page/favorite'
              className='travel-mypage__navigation-link'
            >
              좋아요한 게시물
            </a>
          </nav>
        </div>
        <div className='travel-mypage__calendar-container'>
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
