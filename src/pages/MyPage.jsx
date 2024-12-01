import React, { useEffect, useState } from 'react';
import FullCalendar from '@fullcalendar/react'; // FullCalendar React component
import dayGridPlugin from '@fullcalendar/daygrid'; // for the day grid view
import '@fullcalendar/common/main.css'; // Core CSS
import '@fullcalendar/daygrid/main.css'; // DayGrid CSS

const MyPage = ({ login, dtoList }) => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    // DTO 데이터로 이벤트 세팅
    const formattedEvents = dtoList.map((dto) => ({
      title: dto.title,
      start: dto.startDate,
      end: dto.endDate,
    }));
    setEvents(formattedEvents);
  }, [dtoList]);

  const getProfileImage = () => {
    if (!login.profile) {
      return '/assets/img/anonymous.jpg';
    }
    if (login.loginMethod === 'KAKAO') {
      return login.profile;
    }
    return `/display/${login.profile}`;
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
            <a href={`/my-page/mytravelboard/${login.nickName}`}>내 게시물</a>
            <a href={`/my-page/mytravel/${login.id}`}>나의 여행</a>
            <a href={`/my-page/${login.id}`} style={{ fontWeight: 'bold' }}>
              여행일정
            </a>
            <a href={`/my-page/favorite/${login.id}`}>좋아요한 게시물</a>
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
