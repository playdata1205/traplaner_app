import React, { useState, useEffect, useContext } from 'react';
import { login } from '../../context/UserContext';
const TravelDetail = ({ travelData }) => {
  const { isLoggedIn } = useContext(login);
  const [likeCount, setLikeCount] = useState(travelData.likeCount);
  const [isLiked, setIsLiked] = useState(travelData.likeFlag);
  const [journey, setJourney] = useState(travelData.journey);

  // 좋아요 버튼 토글 핸들러
  const toggleLike = async () => {
    if (!isLoggedIn) {
      alert('로그인 하지 않은 사용자는 좋아요를 할 수 없습니다.');
      return;
    }

    try {
      const response = await fetch(
        `http://localhost:8181/travelboard/${travelData.boardId}/toggle-like`,
        { method: 'POST' },
      );
      const updatedCount = await response.text();
      setLikeCount(Number(updatedCount));
      setIsLiked((prev) => !prev);
    } catch (error) {
      console.error('Error toggling like:', error);
    }
  };

  // 지도 URL 생성
  const generateMapUrl = () => {
    if (!journey || journey.length === 0) return null;

    if (journey.length === 1) {
      return `https://www.google.com/maps/embed/v1/place?key=AIzaSyBY7CGNgsIdVaut54UGlivQkiCYAyoS19I&q=place_id:${journey[0].locationPin}`;
    }

    const origin = `place_id:${journey[0].locationPin}`;
    const destination = `place_id:${journey[journey.length - 1].locationPin}`;
    const waypoints = journey
      .slice(1, -1)
      .map((j) => `place_id:${j.locationPin}`)
      .join('|');

    return `https://www.google.com/maps/embed/v1/directions?key=AIzaSyBY7CGNgsIdVaut54UGlivQkiCYAyoS19I&origin=${origin}&destination=${destination}${
      waypoints ? `&waypoints=${waypoints}` : ''
    }`;
  };

  return (
    <div className='container'>
      <h1>{travelData.title}</h1>
      <p className='author-date'>
        {travelData.writer} {travelData.writeDate}
        <span className='heart'>
          <button id='like-button' onClick={toggleLike}>
            <i
              id='like-icon'
              className={`fa-solid fa-heart ${isLiked ? 'liked' : ''}`}
            ></i>
            <span id='like-count'>{likeCount}</span>
          </button>
        </span>
      </p>

      <div className='section photo'>
        <img
          src={`/display/${travelData.img}`}
          alt='Travel'
          style={{ width: '700px', height: '500px' }}
        />
      </div>
      <div className='section text' id='content'>
        {travelData.content}
      </div>

      {journey && journey.length > 0 && (
        <iframe
          className='map-top'
          allowFullScreen
          height='450'
          width='598'
          src={generateMapUrl()}
        ></iframe>
      )}

      {journey.map((j, index) => (
        <div key={index}>
          <div className='section photo'>
            <img src={`/display/${j.journeyImg}`} alt='Journey' />
          </div>
          <h2 className='day-date'>{j.journeyStartTime}</h2>
          <div className='section schedule'>
            {j.placeName} {j.journeyName}
          </div>
        </div>
      ))}
    </div>
  );
};

export default TravelDetail;
