import React, { useContext, useEffect, useState } from 'react';
import FullCalendar from '@fullcalendar/react'; // FullCalendar React component
import dayGridPlugin from '@fullcalendar/daygrid'; // for the day grid view // DayGrid CSS
import { login } from '../../context/UserContext';
import '../../styles/Mypage.css';
import axios from 'axios';
import { API_BASE_URL, MYPAGE } from '../../configs/host-config';
import { element } from 'prop-types';

const MyPage = ({ dtoList }) => {
  const { nickName, profile } = useContext(login);
  const [TravelList, setTravelList] = useState([]);
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const getTravelList = async () => {
      const res = await axios.get(`${API_BASE_URL}${MYPAGE}/my-page`, {
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

  useEffect(() => {
    // DTO 데이터로 이벤트 세팅
    // const formattedEvents = dtoList.map((dto) => ({
    //   title: dto.title,
    //   start: dto.startDate,
    //   end: dto.endDate,
    // }));
    // setEvents(formattedEvents);
  }, [dtoList]);

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
    <div className='container'>
      <div className='mypage_section'>
        <div className='mypage_section1'>
          <img
            src={getProfileImage()}
            alt='프사'
            className='profile-img'
            style={{
              width: '250px',
              borderRadius: '50%',
              marginBottom: '50px',
              marginTop: '30px',
            }}
          />
          <div className='manage_box'>
            <a href='/my-page/pwChange'>계정관리</a>
            <a href={`/my-page/mytravelboard/${nickName}`}>내 게시물</a>
            <a href={`/my-page/mytravel`}>나의 여행</a>
            <a href={`/my-page`} style={{ fontWeight: 'bold' }}>
              여행일정
            </a>
            <a href={`/my-page/favorite/`}>좋아요한 게시물</a>
          </div>
        </div>
        <div className='mypage_section2'>
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
