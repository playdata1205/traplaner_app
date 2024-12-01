import React, { useState, useEffect } from 'react';
import { GoogleMap, useJsApiLoader, Marker } from '@react-google-maps/api';
import '../styles/TravelPlan.css'; // 기존 스타일을 분리하여 관리

const TravelPlan = () => {
  const [map, setMap] = useState(null);
  const [travelTitle, setTravelTitle] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [journeys, setJourneys] = useState([]);
  const [budget, setBudget] = useState(0);
  const [formData, setFormData] = useState({
    startTime: '',
    endTime: '',
    schedule: '',
    location: '',
    budget: '',
    reservation: null,
  });

  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: 'YOUR_GOOGLE_MAPS_API_KEY',
    libraries: ['places'],
  });

  const handleAddJourney = () => {
    setJourneys((prev) => [
      ...prev,
      {
        ...formData,
        id: Date.now(),
      },
    ]);
    setBudget((prev) => prev + parseInt(formData.budget, 10));
    setFormData({
      startTime: '',
      endTime: '',
      schedule: '',
      location: '',
      budget: '',
      reservation: null,
    });
  };

  const handleDeleteJourney = (id) => {
    setJourneys((prev) => prev.filter((journey) => journey.id !== id));
  };

  const handleSubmit = async () => {
    const travelData = {
      travel: { title: travelTitle, startDate, endDate },
      journeys,
    };
    const formDataToSend = new FormData();
    formDataToSend.append('data', JSON.stringify(travelData));
    journeys.forEach((journey, index) => {
      if (journey.reservation) {
        formDataToSend.append(`reservation_${index}`, journey.reservation);
      }
    });

    const response = await fetch('/travelplan', {
      method: 'POST',
      body: formDataToSend,
    });
    const result = await response.json();
    window.location.href = `/my-page/${result}`;
  };

  return (
    <div className='container'>
      <div id='travel-info'>
        <div id='travel-info-container'>
          <div id='travel-name'>
            <input
              type='text'
              placeholder='이번 여행의 이름을 지어주세요!'
              value={travelTitle}
              onChange={(e) => setTravelTitle(e.target.value)}
            />
          </div>
          {/* 캘린더 라이브러리로 대체 */}
          <div id='calendar'>{/* 캘린더 구현 */}</div>
          <div id='journey-display'>
            {journeys.map((journey) => (
              <div key={journey.id} style={{ borderBottom: '1px solid black' }}>
                <p>
                  <strong>시간:</strong> {journey.startTime} ~ {journey.endTime}
                </p>
                <p>
                  <strong>일정 제목:</strong> {journey.schedule}
                </p>
                <p>
                  <strong>장소:</strong> {journey.location}
                </p>
                <p>
                  <strong>예산:</strong> ₩{journey.budget}
                </p>
                <button onClick={() => handleDeleteJourney(journey.id)}>
                  x
                </button>
              </div>
            ))}
          </div>
          <div id='travel-info-footer'>
            <span>총 예산: {budget}</span>
            <button onClick={handleSubmit}>저장</button>
          </div>
        </div>
      </div>
      <div id='map-info'>
        {isLoaded && (
          <GoogleMap
            center={{ lat: 37.564214, lng: 127.001699 }}
            zoom={10}
            onLoad={(map) => setMap(map)}
            mapContainerStyle={{ width: '100%', height: '100%' }}
          >
            {/* 마커 또는 추가 요소 */}
          </GoogleMap>
        )}
      </div>
    </div>
  );
};

export default TravelPlan;
