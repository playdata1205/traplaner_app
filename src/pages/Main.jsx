import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const MainPage = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [profile, setProfile] = useState(null);
  const [nickName, setNickName] = useState('');
  const [travelList, setTravelList] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  const cardsPerPage = 2;

  useEffect(() => {
    // 예시로 사용자 로그인 상태와 여행 리스트를 로드
    const mockLoginData = {
      isLoggedIn: true,
      profile: '/assets/img/profile.jpg',
      nickName: '사용자 이름',
    };
    const mockTravelList = [
      {
        id: 1,
        travelImg: '/assets/img/경주-800x320.jpg',
        travelTitle: '경주 여행',
      },
      {
        id: 2,
        travelImg: '/assets/img/부산-800x320.jpg',
        travelTitle: '부산 여행',
      },
    ];

    setIsLoggedIn(mockLoginData.isLoggedIn);
    setProfile(mockLoginData.profile);
    setNickName(mockLoginData.nickName);
    setTravelList(mockTravelList);
  }, []);

  const displayCards = () => {
    const start = (currentPage - 1) * cardsPerPage;
    const end = start + cardsPerPage;
    return travelList.slice(start, end).map((travel) => (
      <div className='col' key={travel.id}>
        <div className='card p-1 mt-2'>
          <a href={`/my-page/mytravel/${travel.id}`}>
            <img
              style={{ height: '165px' }}
              src={travel.travelImg}
              className='card-img-top img-fluid'
              alt='여행 이미지'
            />
          </a>
          <div className='pt-2'>
            <h6 className='card-title'>{travel.travelTitle}</h6>
          </div>
        </div>
      </div>
    ));
  };

  const displayPagination = () => {
    const pageCount = Math.ceil(travelList.length / cardsPerPage);
    const pages = [];
    for (let i = 1; i <= pageCount; i++) {
      pages.push(
        <li
          className={`page-item ${i === currentPage ? 'active' : ''}`}
          key={i}
        >
          <button className='page-link' onClick={() => setCurrentPage(i)}>
            {i}
          </button>
        </li>,
      );
    }
    return pages;
  };

  return (
    <div>
      <nav className='navbar navbar-expand-sm bg-body-tertiary fixed-top'>
        <div className='container-fluid'>
          <a className='navbar-brand' href='/'>
            TRAPLAN
          </a>
          <img
            src={profile || '/assets/img/anonymous.jpg'}
            alt='프사'
            className='profile-img'
          />
          <span className='navbar-text'>&nbsp;&nbsp;Welcome {nickName}</span>
          <div className='collapse navbar-collapse' id='navbarNav'>
            <ul className='navbar-nav ms-auto'>
              <li className='nav-item'>
                <a className='nav-link active' href='/travelboard/list'>
                  게시판
                </a>
              </li>
              {isLoggedIn ? (
                <>
                  <li className='nav-item'>
                    <a className='nav-link' href='/my-page/1'>
                      마이페이지
                    </a>
                  </li>
                  <li className='nav-item'>
                    <a className='nav-link' href='/members/sign-out'>
                      로그아웃
                    </a>
                  </li>
                </>
              ) : (
                <>
                  <a className='nav-link' href='/members/sign-in'>
                    로그인
                  </a>
                  <a className='nav-link' href='/members/sign-up'>
                    회원가입
                  </a>
                </>
              )}
            </ul>
          </div>
        </div>
      </nav>

      <div className='container mt-3'>
        <h5 className='card-title'>My Travel List</h5>
        <div id='card-container' className='row row-cols-1 row-cols-md-3'>
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
