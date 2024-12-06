import React, { useState, useEffect } from 'react';
import '../../styles/TravelPlan.css';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';

const TravelPlan = () => {
  const [travelData, setTravelData] = useState({
    title: '',
    startDate: null,
    endDate: null,
    journeys: [],
  });
  const [currentDay, setCurrentDay] = useState(null);
  const [journeyForm, setJourneyForm] = useState({
    startTime: '',
    endTime: '',
    title: '',
    location: '',
    budget: 0,
    reservation: null,
  });
  const [selectedDay, setSelectedDay] = useState(null);

  const handleDateSelect = (info) => {
    setTravelData((prev) => ({
      ...prev,
      startDate: info.start,
      endDate: info.end,
    }));
  };

  const handleAddJourney = () => {
    setTravelData((prev) => ({
      ...prev,
      journeys: [...prev.journeys, { ...journeyForm, day: currentDay }],
    }));
    setJourneyForm({
      startTime: '',
      endTime: '',
      title: '',
      location: '',
      budget: 0,
      reservation: null,
    });
  };

  const handleSaveTravel = async () => {
    const formData = new FormData();
    formData.append('data', JSON.stringify(travelData));
    travelData.journeys.forEach((journey, index) => {
      if (journey.reservation) {
        formData.append(`reservation_${index}`, journey.reservation);
      }
    });

    try {
      const response = await fetch('/travelplan', {
        method: 'POST',
        body: formData,
      });
      const result = await response.json();
      window.location.href = `/my-page/${result}`;
    } catch (error) {
      console.error('Error saving travel plan:', error);
    }
  };

  return (
    <div className='container'>
      <div id='travel-info'>
        <div id='travel-info-container'>
          <div id='travel-name'>
            <input
              type='text'
              placeholder='이번 여행의 이름을 지어주세요!'
              value={travelData.title}
              onChange={(e) =>
                setTravelData((prev) => ({ ...prev, title: e.target.value }))
              }
            />
          </div>
          <div id='calendar'>
            <FullCalendar
              plugins={[dayGridPlugin]}
              initialView='dayGridMonth'
              selectable
              select={handleDateSelect}
            />
          </div>
          <div id='travel-period'>
            <h3>
              여행기간 &nbsp; <i className='fas fa-calendar'></i>
            </h3>
            <p>
              {travelData.startDate &&
                `${travelData.startDate.toLocaleDateString()} ~ ${travelData.endDate.toLocaleDateString()}`}
            </p>
          </div>
          <select
            id='day-select'
            onChange={(e) => setCurrentDay(e.target.value)}
          >
            {travelData.startDate &&
              Array.from(
                {
                  length:
                    (travelData.endDate - travelData.startDate) /
                      (1000 * 60 * 60 * 24) +
                    1,
                },
                (_, i) => (
                  <option key={i} value={i + 1}>
                    Day {i + 1}
                  </option>
                ),
              )}
          </select>
          {/* 추가 코드 */}
          <button onClick={handleAddJourney}>일정 추가</button>
        </div>
      </div>
      <button id='save-travel' onClick={handleSaveTravel}>
        저장
      </button>
    </div>
  );
};

export default TravelPlan;
