import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { axiosInstance } from '../../configs/axios-config';
import { login } from '../../context/UserContext';
import { API_BASE_URL, MAIN } from '../../configs/host-config';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Main.css';


const MainPage = () => {
  const { isLoggedIn } = useContext(login); // 로그인 상태
  const [travelList, setTravelList] = useState([]); // 여행 리스트
  const [carouselData, setCarouselData] = useState([]); // 캐러셀 데이터
  const [currentPage, setCurrentPage] = useState(1); // 현재 페이지
  const cardsPerPage = 3;
  const [currentIndex, setCurrentIndex] = useState(0); // 현재 캐러셀 인덱스 추가

  // 여행 리스트 및 캐러셀 데이터를 가져오는 함수
  useEffect(() => {
    const fetchData = async () => {
      try {
        // 캐러셀 데이터 가져오기
        const carouselResponse = await axios.get(
          `${API_BASE_URL}${MAIN}/top3-favorite`,
        );
        console.log(carouselResponse.data.result);
        setCarouselData(carouselResponse.data.result);
        if (isLoggedIn) {
          // 여행 리스트 데이터 가져오기
          const travelResponse = await axiosInstance.get(
            `${API_BASE_URL}${MAIN}/mytravel-list`,
          );
          setTravelList(travelResponse.data.result);
          console.log(travelResponse.data.result);
        } else {
          setTravelList([]);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [isLoggedIn]);

  // 자동 슬라이드를 위한 useEffect 추가
  useEffect(() => {
    const autoSlideInterval = setInterval(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex === carouselData.length - 1 ? 0 : prevIndex + 1,
      );
    }, 5000); // 5초마다 실행

    // 컴포넌트가 언마운트되 인터벌 정리
    return () => clearInterval(autoSlideInterval);
  }, [carouselData.length]); // carouselData.length가 변경될 때마다 인터벌 재설정

  // 여행 카드를 페이지네이션으로 표시
  const displayCards = () => {
    const start = (currentPage - 1) * cardsPerPage;
    const end = start + cardsPerPage;
    return travelList.slice(start, end).map((card) => (
      <div className='col' key={card.id}>
        <div className='card shadow-sm'>
          <a
            href={`/travelboard/info/${card.id}`}
            style={{ textDecoration: 'none' }}
          >
            {card.travelImg ? (
              <img
                src={`https://traplaner-images.s3.ap-northeast-2.amazonaws.com/${card.travelImg}`}
                alt={card.title}
                className='card-img-top'
              />
            ) : (
              <div className='no-image-container'>
                <span>이미지 없음</span>
              </div>
            )}
            <div className='pt-2'>
              <h6 className='card-title'>{card.title}</h6>
            </div>
          </a>
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

  // 캐러셀 제어 함수 추가
  const handlePrevSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? carouselData.length - 1 : prevIndex - 1,
    );
  };

  const handleNextSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === carouselData.length - 1 ? 0 : prevIndex + 1,
    );
  };

  return (
    <div className='container custom-container mt-3'>
      {/* 추천 여행지 슬라이드 수정 */}
      <div className='recommended-section mb-3'>
        <h3 className='section-title mb-3'>
          추천 여행지 <span className='highlight'>TOP 3</span>
        </h3>
        <div id='demo' className='carousel slide custom-carousel'>
          <div className='carousel-inner rounded-4 shadow'>
            {carouselData.map((travel, index) => (
              <div
                key={travel.id}
                className={`carousel-item ${index === currentIndex ? 'active' : ''}`}
              >
                <a href={`/travelboard/info/${travel.id}`}>
                  <img
                    src={`https://traplaner-images.s3.ap-northeast-2.amazonaws.com/${travel.travelImg}`}
                    className='d-block w-100'
                    alt={travel.title}
                  />
                  <div className='carousel-caption d-flex flex-column justify-content-between'>
                    <h5 className='travel-title-top'>{travel.title}</h5>
                    <h5 className='travel-title'>{travel.title}</h5>
                  </div>
                </a>
              </div>
            ))}
          </div>
          <button
            className='carousel-control-prev custom-carousel-button'
            type='button'
            onClick={handlePrevSlide}
          >
            <span className='carousel-control-prev-icon'></span>
          </button>
          <button
            className='carousel-control-next custom-carousel-button'
            type='button'
            onClick={handleNextSlide}
          >
            <span className='carousel-control-next-icon'></span>
          </button>
        </div>
      </div>

      {/* My Travel List */}

      <div className='travel-list-section mt-3'>
        <h3 className='section-title mb-3'>나의 여행 목록</h3>
        <div
          id='card-container'
          className={`row row-cols-1 row-cols-md-3 g-3 ${isLoggedIn ? 'logged-in' : ''}`}
        >
          <div className='col'>
            <div className='card travel-card h-100 border-0 shadow-sm'>
              <a href='/travelplan' className='add-travel-link'>
                <div className='card-img-wrapper'>
                  <img
                    src='/assets/img/add-800x320.jpg'
                    alt='여행 추가'
                    className='card-img-top img-fluid'
                  />
                </div>
                <div className='card-body text-center'>
                  <h6 className='card-title'>새로운 여행 계획하기</h6>
                </div>
              </a>
            </div>
          </div>
          {isLoggedIn && displayCards()}
        </div>
        <nav aria-label='Page navigation' className='mt-3'>
          <ul className='pagination justify-content-center custom-pagination'>
            {displayPagination()}
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default MainPage;
