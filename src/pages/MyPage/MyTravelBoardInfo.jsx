import React, { useEffect, useState } from 'react';
import { API_BASE_URL, MYPAGE } from '../../configs/host-config';
import axios from 'axios';
import { Navigate, useLocation } from 'react-router-dom';
import moment from 'moment';
import '../../styles/MyTravelBoardInfo.css';
import axiosInstance from '../../configs/axios-config';

const TravelBoardInfo = () => {
  const [travel, setTravel] = useState({});
  const [journey, setJourney] = useState([]);
  const [travelBoard, setTravelBoard] = useState({});
  const [content, setContent] = useState('');
  const location = useLocation();
  const [travelImg, setTravelImg] = useState(null);
  const [journeyImg, setJourneyImg] = useState({});
  const [journeyId, setJourneyId] = useState([]);
  const [TravelTumbnail, setTravelTumbnail] = useState('');
  const [JourneyTumbnail, setJourneyTumbnail] = useState('');

  useEffect(() => {
    const travelId = location.state?.travelId;
    if (travelId) {
      fetchData(travelId);
    }
  }, [location]);

  const fetchData = async (travelId) => {
    console.log(localStorage.getItem('ACCESS_TOKEN'));

    const response = await axios.get(
      `${API_BASE_URL}${MYPAGE}/my-page/board-info/${travelId}`,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('ACCESS_TOKEN')}`,
        },
      },
    );
    console.log('응답 데이터:', response.data);

    setTravel(response.data.travel);
    setJourney(response.data.Journey || []);
    setTravelBoard(response.data.TravelBoard, []);
    setContent(response.data.TravelBoard?.content || '');

    // const journeyIds = (response.data.Journey || []).map(
    //   (journey) => journey.id,
    // );
    // setJourneyId(journeyIds);
    // console.log('Journey IDs:', journeyIds);
  };

  const handleTravelImgChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      setTravelImg(file);
      reader.readAsDataURL(file);

      reader.onloadend = () => {
        setTravelTumbnail(reader.result);
      };
    }
  };

  const handleJourneyImgChange = (id, e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      setJourneyImg(file);
      setJourneyId((journeyId) => [...journeyId, id]);
      reader.onload = (event) => {
        setJourneyTumbnail((prevImages) => {
          const newImages = {
            ...prevImages,
            [id]: event.target.result,
          };
          console.log('새로운 이미지 상태:', newImages);
          return newImages;
        });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleContentChange = (e) => {
    setContent(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Submit form logic
    const data = new FormData();

    data.append('travelId', travel.id);

    if (travelImg !== null) {
      data.append('travelImg', travelImg);
    } else {
      console.log('여행 이미지 없음');
    }

    data.append('content', content);
    data.append('journeyId', journeyId);

    if (journeyImg !== null) {
      console.log('여정 이미지 있음');
      console.log(journeyImg);
      data.append('journeyImage', journeyImg);
    } else {
      console.log('여정 이미지 없음');
      console.log(journeyImg);
      console.log(Object.keys(journeyImg).length);
    }

    const response = await axiosInstance.post(
      `${API_BASE_URL}${MYPAGE}/my-page/insert-board`,
      data,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('ACCESS_TOKEN')}`,
          'Content-type': 'multipart/formdata',
        },
      },
    );

    if (response.status === 200) {
      alert('게시글 등록 완료');
      Navigate('/my-page/mytravel');
    } else {
      alert('게시글 등록 실패');
    }
  };

  return (
    <div className='tb_body'>
      <div className='tb_container'>
        <h1>{travel.title}</h1>
        <form onSubmit={handleSubmit}>
          <input type='hidden' value={travel.id} name='travelId' />
          <p className='author-date'>
            {moment(travel.startDate).format('YYYY-MM-DD')} ~
            {moment(travel.endDate).format('YYYY-MM-DD')}
          </p>
          <div style={{ textAlign: 'center' }}></div>
          <div
            className='section photo travelpt'
            style={{
              backgroundImage: TravelTumbnail
                ? `url(${TravelTumbnail})`
                : travel.travelImg
                  ? `url('/display/${travel.travelImg}')`
                  : 'none',
              backgroundColor: '#f0f0f0',
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              backgroundRepeat: 'no-repeat',
            }}
            onClick={() => document.getElementById('travelImgInput').click()}
          >
            {!travelImg && !travel.travelImg && '여행의 사진을 등록해주세요!!'}
          </div>
          <input
            type='file'
            id='travelImgInput'
            accept='image/*'
            style={{ display: 'none' }}
            onChange={handleTravelImgChange}
          />
          <div className='journey-wrap'>
            {journey && journey.length > 0 ? (
              journey.map((item) => (
                <div key={item.id}>
                  <input type='hidden' value={item.id} name='journeyId' />
                  <h2 className='day-title'>
                    {item.journeyName}{' '}
                    <span className='day-date'>
                      {moment(item.startTime).format('YYYY-MM-DD HH:mm')} -{' '}
                      {moment(item.endTime).format('YYYY-MM-DD HH:mm')}
                    </span>
                  </h2>
                  <div style={{ textAlign: 'center' }}>
                    <img
                      src={journey.journeyImg || ''}
                      alt={`Journey ${item.id}`}
                      style={{
                        display: journey.journeyImg ? 'block' : 'none',
                      }}
                      className={`journeyImg-box${item.id}`}
                    />
                  </div>
                  <div
                    className='section photo journey-photo'
                    style={{
                      backgroundImage: JourneyTumbnail[item.id]
                        ? `url(${JourneyTumbnail[item.id]})`
                        : item.journeyImg
                          ? `url('/display/${item.journeyImg}')`
                          : 'none',
                      backgroundColor: '#f0f0f0',
                      backgroundSize: 'cover',
                      backgroundPosition: 'center',
                      backgroundRepeat: 'no-repeat',
                    }}
                    onClick={() =>
                      document
                        .getElementById(`journeyImgInput-${item.id}`)
                        .click()
                    }
                  >
                    {!journeyImg[item.id] &&
                      !item.journeyImg &&
                      '여정의 사진을 등록해주세요!!'}
                  </div>
                  <input
                    type='file'
                    id={`journeyImgInput-${item.id}`}
                    accept='image/*'
                    style={{ display: 'none' }}
                    onChange={(e) => handleJourneyImgChange(item.id, e)}
                  />
                </div>
              ))
            ) : (
              <p>등록된 여정이 없습니다.</p>
            )}
          </div>
          <div className='content-box'>
            <textarea
              name='content'
              rows='15'
              cols='100'
              value={content}
              onChange={handleContentChange}
            ></textarea>
          </div>
          <div className='button-box'>
            <button type='submit'>게시글 저장</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TravelBoardInfo;
