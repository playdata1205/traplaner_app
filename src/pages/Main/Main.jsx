import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { login } from '../../context/UserContext';
import { API_BASE_URL, MAIN } from '../../configs/host-config';
// import 'bootstrap/dist/css/bootstrap.min.css';

const MainPage = () => {
  const { isLoggedIn } = useContext(login); // 로그인 상태
  const [travelList, setTravelList] = useState([]); // 여행 리스트
  const [carouselData, setCarouselData] = useState([]); // 캐러셀 데이터
  const [currentPage, setCurrentPage] = useState(1); // 현재 페이지
  const cardsPerPage = 2;

  // 여행 리스트 및 캐러셀 데이터를 가져오는 함수
  useEffect(() => {
    const fetchData = async () => {
      try {
        if (isLoggedIn) {
          // 여행 리스트 데이터 가져오기
          const travelResponse = await axios.get(
            `${API_BASE_URL}${MAIN}/travelboard/list`,
          );
          setTravelList(travelResponse.data);

          // 캐러셀 데이터 가져오기
          const carouselResponse = await axios.get(
            `${API_BASE_URL}${MAIN}/carousel`,
          );
          setCarouselData(carouselResponse.data);
        } else {
          setTravelList([]);
          setCarouselData([]);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [isLoggedIn]);

  // 여행 카드를 페이지네이션으로 표시
  const displayCards = () => {
    const start = (currentPage - 1) * cardsPerPage;
    const end = start + cardsPerPage;
    return travelList.slice(start, end).map((card) => (
      <div className='col' key={card.id}>
        <div className='card p-1 mt-2'>
          <a href={`/travelboard/info/${card.id}`}>
            <img
              src={`/assets/img/${card.travelImg}`}
              alt={card.travelTitle}
              className='card-img-top img-fluid'
            />
          </a>
          <div className='pt-2'>
            <h6 className='card-title'>{card.travelTitle}</h6>
          </div>
        </div>
      </div>
    ));
  };

  // 페이지네이션 UI 표시
  const displayPagination = () => {
    const pageCount = Math.ceil(travelList.length / cardsPerPage);
    return Array.from({ length: pageCount }, (_, i) => i + 1).map((page) => (
      <li
        key={page}
        className={`page-item ${page === currentPage ? 'active' : ''}`}
      >
        <a
          className='page-link'
          href='#'
          onClick={(e) => {
            e.preventDefault();
            setCurrentPage(page);
          }}
        >
          {page}
        </a>
      </li>
    ));
  };

  return (
    <div className='container mt-5'>
      {/* 추천 여행지 슬라이드 */}
      <div id='demo' className='carousel slide' data-bs-ride='carousel'>
        <div className='carousel-inner'>
          {carouselData.map((travel, index) => (
            <div
              key={travel.id}
              className={`carousel-item ${index === 0 ? 'active' : ''}`}
            >
              <a href={`/travelboard/info/${travel.id}`}>
                <img
                  src={`/assets/img/${travel.travelImg}`}
                  className='d-block w-100'
                  alt={travel.travelTitle}
                />
              </a>
            </div>
          ))}
        </div>
        <button
          className='carousel-control-prev'
          type='button'
          data-bs-target='#demo'
          data-bs-slide='prev'
        >
          <span className='carousel-control-prev-icon'></span>
        </button>
        <button
          className='carousel-control-next'
          type='button'
          data-bs-target='#demo'
          data-bs-slide='next'
        >
          <span className='carousel-control-next-icon'></span>
        </button>
      </div>

      {/* My Travel List */}
      <div className='container mt-3'>
        <h5 className='card-title'>My Travel List</h5>
        <div id='card-container' className='row row-cols-1 row-cols-md-3'>
          <div className='col'>
            <div className='card p-1 mt-2'>
              <a href='/travelplan'>
                <img
                  src='/assets/img/add-800x320.jpg'
                  alt='여행 추가'
                  className='card-img-top img-fluid'
                />
              </a>
              <div className='pt-2'>
                <h6 className='card-title'>여행을 떠나요~</h6>
              </div>
            </div>
          </div>
          {displayCards()}
        </div>
        <nav aria-label='Page navigation example' className='mt-4'>
          <ul id='pagination' className='pagination justify-content-center'>
            {displayPagination()}
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default MainPage;
