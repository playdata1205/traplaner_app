import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { API_BASE_URL, MYPAGE } from '../../configs/host-config';
import axios from 'axios';
import login from '../../context/UserContext';
import moment from 'moment';

const MyPageFavorite = () => {
  const { nickName, profile } = useContext(login);
  const [favorites, setFavorites] = useState([]);
  const [travelBoards, setTravelBoards] = useState([]);
  const [travels, setTravels] = useState([]);
  const [pageInfo, setPageInfo] = useState({});
  const [order, setOrder] = useState('pastOrder');

  const navigate = useNavigate();

  // API 호출하여 게시물 목록 및 페이지 정보 가져오기
  useEffect(() => {
    fetchFavorite();
  }, []);

  const fetchFavorite = async (pageNo, amount) => {
    const response = await axios.get(
      `${API_BASE_URL}${MYPAGE}/my-page/favorite?page=pageNo&size=amount`,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('ACCESS_TOKEN')}`,
        },
      },
    );

    console.log('favorites', response.data.favorites);
    console.log('travelBoards', response.data.travelBoards);
    console.log('travels', response.data.travels);

    const responseData = response.data;
    setFavorites(responseData.favorites.content);
    setTravelBoards(responseData.travelBoards);
    setTravels(responseData.travels);
    setPageInfo({
      begin: 1,
      end: Math.ceil(responseData.totalElements / amount),
    });
  };

  const handlePageChange = (pageNo) => {
    navigate(`/my-page/favorite?pageNo=${pageNo}&amount=${pageInfo.amount}`);
  };

  const getProfileImage = () => {
    if (!login.profile) {
      return '/assets/img/anonymous.jpg';
    }
    if (login.loginMethod === 'KAKAO') {
      return login.profile;
    }
    return `/display/${profile}`;
  };

  return (
    <div className='container'>
      <div className='mypage_section'>
        {/* 왼쪽 섹션 */}
        <div className='mypage_section1'>
          {profile ? (
            <img
              src={getProfileImage()}
              alt='Profile'
              style={{
                width: '250px',
                borderRadius: '50%',
                marginBottom: '50px',
                marginTop: '30px',
              }}
            />
          ) : (
            <img
              src={getProfileImage()}
              alt='Default Profile'
              style={{ width: '30px', borderRadius: '50%' }}
            />
          )}
          <div className='manage_box'>
            <a href='#'>계정관리</a>
            <a href={`/my-page/mytravelboard`}>내 게시물</a>
            <a href={`/my-page/mytravel`}>나의 여행</a>
            <a href={`/my-page`}>여행일정</a>
            <a href={`/my-page/favorite`} style={{ fontWeight: 'bold' }}>
              좋아요한 게시물
            </a>
          </div>
        </div>

        {/* 오른쪽 섹션 */}
        <div className='mypage_section2'>
          <div className='con22'>
            <select
              name='searchOption'
              className='searchOption'
              value={order}
              onChange={(e) => setOrder(e.target.value)}
            >
              <option value='pastOrder'>과거순</option>
              <option value='up-to-date-order'>최신순</option>
            </select>
            <table>
              <thead>
                <tr>
                  <th style={{ width: '5%' }}>번호</th>
                  <th style={{ width: '70%' }}>게시글 제목</th>
                  <th style={{ width: '10%' }}>작성자</th>
                  <th style={{ width: '15%' }}>작성일</th>
                </tr>
              </thead>
              <tbody>
                {favorites.map((favorite, index) => (
                  <tr key={index}>
                    <td>{favorite.id} </td>
                    <td>{travels[index].title}</td>
                    <td>{travelBoards[index].memberNickName}</td>
                    <td>
                      {moment(travelBoards[index].writeDate).format(
                        'YYYY-MM-DD',
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {/* 페이지네이션 */}
            <div className='bottom-section'>
              <nav aria-label='Page navigation example'>
                <ul className='pagination pagination-lg pagination-custom'>
                  {pageInfo.prev && (
                    <li className='page-item'>
                      <button
                        className='page-link'
                        onClick={() => handlePageChange(pageInfo.begin - 1)}
                      >
                        &lt;&lt;
                      </button>
                    </li>
                  )}
                  {Array.from(
                    { length: pageInfo.end - pageInfo.begin + 1 },
                    (_, i) => pageInfo.begin + i,
                  ).map((pageNum) => (
                    <li key={pageNum} className='page-item'>
                      <button
                        className='page-link'
                        onClick={() => handlePageChange(pageNum)}
                      >
                        {pageNum}
                      </button>
                    </li>
                  ))}
                  {pageInfo.next && (
                    <li className='page-item'>
                      <button
                        className='page-link'
                        onClick={() => handlePageChange(pageInfo.end + 1)}
                      >
                        &gt;&gt;
                      </button>
                    </li>
                  )}
                </ul>
              </nav>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyPageFavorite;
