import React, { useState, useEffect, useRef } from 'react';
import '../../styles/TravelPlan.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendar } from '@fortawesome/free-solid-svg-icons';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import { API_BASE_URL, TRAVELPLAN } from '../../configs/host-config';
import { createRoot } from 'react-dom/client';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';
import { useNavigate } from 'react-router-dom';
import { login } from '../../context/UserContext';
import axios from 'axios';
import { axiosInstance } from '../../configs/axios-config';

const TravelPlan = () => {
  const JourneyView = ({ selectedDay, journeys }) => {
    const filteredJourneys = journeys.filter(
      (journey) => journey.day === selectedDay,
    );

    const totalBudget = filteredJourneys.reduce(
      (sum, journey) => sum + (Number(journey.budget) || 0),
      0,
    );

    return (
      <div className='journey-view'>
        {filteredJourneys.length === 0 ? (
          <div className='journey-view__empty'>일정이 없습니다.</div>
        ) : (
          <>
            {filteredJourneys.map((journey) => (
              <div key={journey.id} className='journey-view__item'>
                <p className='journey-view__info'>
                  <strong>시간</strong> {journey.startTime} ~ {journey.endTime}
                </p>
                <p className='journey-view__info'>
                  <strong>일정 제목</strong> {journey.title}
                </p>
                <p className='journey-view__info'>
                  <strong>장소</strong> {journey.location}
                </p>
                <p className='journey-view__info'>
                  <strong>예산</strong> ₩
                  {Number(journey.budget).toLocaleString()}
                </p>
                <p className='journey-view__info'>
                  <strong>예약</strong>{' '}
                  {journey.reservation ? journey.reservation.name : '없음'}
                </p>
                <button
                  className='journey-view__delete-btn'
                  onClick={() => handleDeleteJourney(journey.id)}
                >
                  삭제
                </button>
              </div>
            ))}
            <div className='journey-view__total-budget'>
              총 예산: ₩{totalBudget.toLocaleString()}
            </div>
          </>
        )}
      </div>
    );
  };

  const [travelData, setTravelData] = useState({
    title: '',
    startDate: null,
    endDate: null,
    journeys: [],
  });
  const [journeyForm, setJourneyForm] = useState({
    id: '',
    day: 1,
    startTime: '',
    endTime: '',
    title: '',
    location: '',
    locationId: '',
    address: '',
    budget: '',
    reservation: null,
  });
  const [selectedDay, setSelectedDay] = useState(1);

  // 구글 맵 관련 상태와 설정
  const [map, setMap] = useState(null);
  const [marker, setMarker] = useState(null);
  const [searchPlace, setSearchPlace] = useState('');
  const [center, setCenter] = useState({
    lat: 37.5665, // 서울의 위도
    lng: 126.978, // 서울의 경도
  });

  // 맵 스타일 설정
  const mapContainerStyle = {
    width: '100%',
    height: '100%',
  };

  // 맵 옵션 설정
  const mapOptions = {
    zoomControl: true,
    mapTypeControl: true,
    streetViewControl: true,
    fullscreenControl: true,
  };

  const handleDateSelect = (info) => {
    setIsRenderCalendar(false);
    setTravelData((prev) => ({
      ...prev,
      startDate: info.start,
      endDate: new Date(info.end.getTime() - 24 * 60 * 60 * 1000),
    }));
  };

  const handleAddjourney = (e) => {
    e.preventDefault();

    if (
      !journeyForm.startTime ||
      !journeyForm.endTime ||
      !journeyForm.title ||
      !journeyForm.location
    ) {
      alert('모든 필수 항목을 입력해주세요!');
      return;
    }

    const newJourney = {
      ...journeyForm,
      day: selectedDay,
      budget: Number(journeyForm.budget) || 0,
      id: Date.now().toString(),
    };

    setTravelData((prev) => ({
      ...prev,
      journeys: [...prev.journeys, newJourney],
    }));

    // 폼 초기화
    setJourneyForm({
      id: '',
      day: selectedDay,
      startTime: '',
      endTime: '',
      title: '',
      location: '',
      locationId: '',
      address: '',
      budget: '',
      reservation: null,
    });
  };

  const handleSaveTravel = async () => {
    console.log(travelData);
    try {
      if (!travelData.title || !travelData.startDate || !travelData.endDate) {
        alert('여행 제목과 기간을 설정해주세요!');
        return;
      }

      // 여행 데이터 포맷팅
      const formattedData = {
        travel: {
          title: travelData.title,
          startDate: travelData.startDate.toISOString(),
          endDate: travelData.endDate.toISOString(),
        },
        journeys: travelData.journeys.map((journey, index) => ({
          id: index,
          day: journey.day,
          date: new Date(
            travelData.startDate.getTime() +
              (journey.day - 1) * 24 * 60 * 60 * 1000,
          ).toISOString(),
          location: journey.location,
          title: journey.title,
          address: journey.address,
          startTime: journey.startTime,
          endTime: journey.endTime,
          locationId: journey.locationId,
          budget: Number(journey.budget),
        })),
      };
      console.log(formattedData);

      const formData = new FormData();
      formData.append('data', JSON.stringify(formattedData));

      // 예약 파일 추가
      travelData.journeys.forEach((journey, index) => {
        if (journey.reservation) {
          formData.append(`reservation_${index}`, journey.reservation);
        }
      });

      const response = await axiosInstance.post(
        `${API_BASE_URL}${TRAVELPLAN}/create`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        },
      );

      const result = response.data;
      window.location.href = `/mypage/mytravel`;
    } catch (error) {
      console.error('여행 계획 저장 중 오류 발생:', error);
      alert('여행 계획 저장에 실패했습니다. 다시 시도해주세요.');
    }
  };
  const [isRenderCalendar, setIsRenderCalendar] = useState(true);

  const handleLocationSearch = async (e) => {
    e.preventDefault();
    if (!journeyForm.location) return;

    try {
      const { Place } = await window.google.maps.importLibrary('places');
      const { Marker } = await window.google.maps.importLibrary('marker');
      const { LatLngBounds } = await window.google.maps.importLibrary('core');

      const request = {
        textQuery: journeyForm.location,
        fields: ['displayName', 'location', 'id', 'formattedAddress'],
        language: 'ko',
        maxResultCount: 1,
      };

      const { places } = await Place.searchByText(request);

      if (places.length) {
        const place = places[0];
        const bounds = new LatLngBounds();

        setJourneyForm((prev) => ({
          ...prev,
          address: place.formattedAddress,
          locationId: place.id,
        }));

        bounds.extend(place.location);
        setCenter(place.location);

        if (marker) {
          marker.setMap(null);
        }

        const newMarker = new Marker({
          map,
          position: place.location,
          title: place.displayName,
        });

        setMarker(newMarker);
      }
    } catch (error) {
      console.error('장소 검색 중 오류 발생:', error);
    }
  };

  const handleDaySelect = (e) => {
    const selectedValue = parseInt(e.target.value.replace('Day ', ''));
    setSelectedDay(selectedValue);

    setJourneyForm((prev) => ({
      ...prev,
      day: selectedValue,
    }));
  };

  const handleDeleteJourney = (journeyId) => {
    setTravelData((prev) => ({
      ...prev,
      journeys: prev.journeys.filter((journey) => journey.id !== journeyId),
    }));
  };

  return (
    <div className='travel-plan__container'>
      <div className='travel-plan__info'>
        <div className='travel-plan__content-container'>
          <div className='travel-plan__title-section'>
            <input
              type='text'
              className='travel-plan__title-input'
              placeholder='이번 여행의 이름을 지어주세요!'
              value={travelData.title}
              onChange={(e) =>
                setTravelData((prev) => ({ ...prev, title: e.target.value }))
              }
            />
          </div>

          <div className='travel-plan__period'>
            <h3 className='travel-plan__period-title'>
              여행기간 &nbsp;{''}
              {!isRenderCalendar ? (
                <FontAwesomeIcon
                  icon={faCalendar}
                  className='travel-plan__icon'
                  onClick={() => setIsRenderCalendar(!isRenderCalendar)}
                />
              ) : (
                ''
              )}
            </h3>
            <p>
              {travelData.startDate &&
                `${travelData.startDate.toLocaleDateString()} ~ ${travelData.endDate.toLocaleDateString()}`}
            </p>
          </div>
          <div className='travel-plan__calendar'>
            {isRenderCalendar && (
              <FullCalendar
                plugins={[dayGridPlugin, interactionPlugin]}
                initialView='dayGridMonth'
                locale='ko'
                selectable={true}
                select={handleDateSelect}
              />
            )}
          </div>
          {!isRenderCalendar && (
            <div>
              <select
                className='travel-plan__day-select'
                onChange={handleDaySelect}
                value={selectedDay ? `Day ${selectedDay}` : 'Day 1'}
              >
                {Array.from(
                  {
                    length:
                      (travelData.endDate - travelData.startDate) /
                        (1000 * 60 * 60 * 24) +
                      1,
                  },
                  (_, i) => (
                    <option key={i + 1} value={`Day ${i + 1}`}>
                      Day {i + 1}
                    </option>
                  ),
                )}
              </select>
              {selectedDay && (
                <JourneyView
                  selectedDay={selectedDay}
                  journeys={travelData.journeys}
                />
              )}
            </div>
          )}
          {!isRenderCalendar && (
            <div className='travel-plan__layout'>
              <div className='travel-plan__form'>
                <form>
                  <div className='travel-plan__form-group'>
                    <label htmlFor='start-time'>시간</label>
                    <input
                      type='time'
                      id='start-time'
                      name='time'
                      required
                      value={journeyForm.startTime}
                      onChange={(e) =>
                        setJourneyForm((prev) => ({
                          ...prev,
                          startTime: e.target.value,
                        }))
                      }
                    />
                    <input
                      type='time'
                      id='end-time'
                      required
                      value={journeyForm.endTime}
                      onChange={(e) =>
                        setJourneyForm((prev) => ({
                          ...prev,
                          endTime: e.target.value,
                        }))
                      }
                    />
                  </div>
                  <div className='travel-plan__form-group'>
                    <label htmlFor='schedule'>일정 제목</label>
                    <input
                      type='text'
                      id='schedule'
                      name='schedule'
                      required
                      value={journeyForm.title}
                      onChange={(e) =>
                        setJourneyForm((prev) => ({
                          ...prev,
                          title: e.target.value,
                        }))
                      }
                    />
                  </div>
                  <div className='travel-plan__form-group'>
                    <label htmlFor='location'>장소</label>
                    <div className='input-button-wrapper'>
                      <input
                        type='text'
                        id='location'
                        name='location'
                        value={journeyForm.location}
                        onChange={(e) =>
                          setJourneyForm((prev) => ({
                            ...prev,
                            location: e.target.value,
                          }))
                        }
                        required
                      />
                      <button
                        type='button'
                        id='location-btn'
                        onClick={handleLocationSearch}
                      >
                        검색
                      </button>
                    </div>
                  </div>
                  <div className='travel-plan__form-group'>
                    <label htmlFor='budget'>예산</label>
                    <div className='budget-wrapper'>
                      <input
                        type='number'
                        id='budget'
                        name='budget'
                        required
                        value={journeyForm.budget}
                        onChange={(e) =>
                          setJourneyForm((prev) => ({
                            ...prev,
                            budget: e.target.value,
                          }))
                        }
                      />
                      <span className='currency-symbol'>₩</span>
                    </div>
                  </div>
                  <div className='travel-plan__form-group'>
                    <label htmlFor='reservation'>예약</label>
                    <input
                      type='file'
                      id='reservation'
                      name='reservation'
                      onChange={(e) =>
                        setJourneyForm((prev) => ({
                          ...prev,
                          reservation: e.target.files[0],
                        }))
                      }
                    />
                  </div>
                </form>
                <button className='travel-plan__btn' onClick={handleAddjourney}>
                  일정 추가
                </button>
                <button
                  className='travel-plan__save-btn'
                  onClick={handleSaveTravel}
                >
                  저장
                </button>
              </div>
            </div>
          )}
        </div>
        <div className='travel-plan__map'>
          <LoadScript googleMapsApiKey='AIzaSyBY7CGNgsIdVaut54UGlivQkiCYAyoS19I'>
            <GoogleMap
              mapContainerStyle={mapContainerStyle}
              center={center}
              zoom={13}
              options={mapOptions}
              onLoad={(map) => setMap(map)}
            >
              {marker && <Marker position={center} />}
            </GoogleMap>
          </LoadScript>
        </div>
      </div>
    </div>
  );
};

export default TravelPlan;
