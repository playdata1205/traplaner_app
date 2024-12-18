import React, { useState, useEffect, useContext } from 'react';
import { login } from '../../context/UserContext';
import axios from 'axios';
import axiosInstance from '../../configs/axios-config';
import { API_BASE_URL, TRAVELBOARD } from '../../configs/host-config';
import '../../styles/TravelBoardInfo.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import { useParams } from 'react-router-dom';

const TravelBoardDetail = () => {
  const { boardId } = useParams();
  const { isLoggedIn } = useContext(login);
  const [isLoading, setIsLoading] = useState(false);
  const [travelData, setTravelData] = useState({});
  const [journey, setJourney] = useState([]);
  const [isLiked, setIsLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(0);
  const [groupedJourneys, setGroupedJourneys] = useState({});

  // 좋아요 상태 확인 API 호출
  const fetchLikeStatus = async () => {
    try {
      const token = localStorage.getItem('ACCESS_TOKEN');
      const response = await axiosInstance.get(
        `${API_BASE_URL}${TRAVELBOARD}/toggle-like/status/${boardId}`,
        {
          headers: token
            ? {
                Authorization: `Bearer ${token}`,
              }
            : {},
        },
      );

      const isLiked = response.data.result;
      setIsLiked(isLiked);
      console.log('좋아요 상태: ', isLiked);
    } catch (error) {
      console.error('좋아요 상태 확인 실패: ', error);
    }
  };

  // 게시글 데이터 로드
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const token = localStorage.getItem('ACCESS_TOKEN');
        const response = await axiosInstance.get(
          `${API_BASE_URL}${TRAVELBOARD}/info/${boardId}`,
          {
            headers: token
              ? {
                  Authorization: `Bearer ${token}`,
                }
              : {},
          },
        );
        const data = response.data.result;
        console.log(data);
        setTravelData(data);
        setJourney(data.journeys || []);
        setLikeCount(data.likeCount || 0);

        // 일정을 day별로 그룹화
        const grouped = (data.journeys || []).reduce((acc, journey) => {
          const day = journey.day;
          if (!acc[day]) {
            acc[day] = [];
          }
          acc[day].push(journey);
          return acc;
        }, {});
        setGroupedJourneys(grouped);

        // 좋아요 상태 확인
        if (isLoggedIn) {
          await fetchLikeStatus();
        }
      } catch (error) {
        console.error('데이터를 불러오는데 실패했습니다:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [boardId, isLoggedIn]);

  const toggleLike = async () => {
    if (!isLoggedIn) {
      alert('로그인 하지 않은 사용자는 좋아요를 할 수 없습니다.');
      return;
    }

    try {
      const token = localStorage.getItem('ACCESS_TOKEN');
      const response = await axiosInstance.post(
        `${API_BASE_URL}${TRAVELBOARD}/toggle-like/${boardId}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      // 서버에서 반환된 실제 좋아요 수로 업데이트
      const serverLikeCount = response.data.result;
      setLikeCount(serverLikeCount);

      // 좋아요 상태 다시 확인
      await fetchLikeStatus();
    } catch (error) {
      console.error('좋아요 토글 실패:', error.response || error);
      alert('좋아요 처리 중 오류가 발생했습니다.');
    }
  };

  // 지도 URL 생성
  const generateMapUrl = () => {
    if (!journey || journey.length === 0) return null;

    // 장소가 하나일 경우
    if (journey.length === 1) {
      const location = encodeURIComponent(
        journey[0].accommodationName || journey[0].journeyName,
      );
      return `https://www.google.com/maps/embed/v1/place?key=AIzaSyBY7CGNgsIdVaut54UGlivQkiCYAyoS19I&q=${location}`;
    }

    // 여러 장소가 있는 경우
    const locations = journey.map((j) =>
      encodeURIComponent(j.accommodationName || j.journeyName),
    );
    const origin = locations[0];
    const destination = locations[locations.length - 1];
    const waypoints = locations.slice(1, -1).join('|');

    return `https://www.google.com/maps/embed/v1/directions?key=AIzaSyBY7CGNgsIdVaut54UGlivQkiCYAyoS19I
      &origin=${origin}
      &destination=${destination}
      ${waypoints ? `&waypoints=${waypoints}` : ''}
      &mode=driving`.replace(/\s+/g, '');
  };

  return isLoading ? (
    <div>Loading...</div>
  ) : (
    <div className='traplan-board-detail'>
      <h1 className='traplan-board-detail__title'>{travelData.title}</h1>
      <div className='traplan-board-detail__metadata'>
        {travelData.writer} {travelData.writeDate}
        <span className='traplan-board-detail__heart-container'>
          <button
            className='traplan-board-detail__like-button'
            onClick={toggleLike}
          >
            <FontAwesomeIcon
              className={`traplan-board-detail__like-icon ${isLiked ? 'traplan-board-detail__like-icon--active' : ''}`}
              icon={faHeart}
            />
            <span className='traplan-board-detail__like-count'>
              {likeCount}
            </span>
          </button>
        </span>
      </div>
      <div className='traplan-board-detail__content-section traplan-board-detail__image-wrapper'>
        <img
          src={`https://traplan-img.s3.ap-northeast-2.amazonaws.com/${travelData.travelImg}`}
          alt='Travel'
          style={{ width: '700px', height: '500px' }}
        />
      </div>
      <div className='traplan-board-detail__content-section traplan-board-detail__text-content'>
        {travelData.content}
      </div>

      {journey.length > 0 && (
        <iframe
          className='traplan-board-detail__map-container'
          height='450'
          src={generateMapUrl()}
          allowFullScreen
        ></iframe>
      )}

      {Object.entries(groupedJourneys).map(([day, dayJourneys]) => (
        <div key={day} className='traplan-board-detail__day-section'>
          <h1 className='traplan-board-detail__title'>DAY {day}</h1>
          {dayJourneys.map((journey, index) => (
            <div key={index} className='traplan-board-detail__journey-item'>
              <h4 className='traplan-board-detail__metadata'>
                {journey.startTime}
              </h4>
              <div className='traplan-board-detail__content-section traplan-board-detail__image-wrapper'>
                <img
                  src={`https://traplan-img.s3.ap-northeast-2.amazonaws.com/${journey.journeyImg}`}
                  alt='Journey'
                />
              </div>
              <div className='traplan-board-detail__content-section'>
                {journey.accommodationName} {journey.journeyName}
              </div>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default TravelBoardDetail;
