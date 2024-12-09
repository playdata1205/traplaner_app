import axios from 'axios';
import React, { useState, useEffect, useContext } from 'react';
import { API_BASE_URL, MYPAGE } from '../../configs/host-config';
import login from '../../context/UserContext';
// import './MyPage.css'; // CSS 파일로 스타일을 분리합니다.

function MyPageTravelBoard() {
  const { nickName, profile } = useContext(login);
  const [boardList, setBoardList] = useState([]);

  const handleOptionChange = (event) => {
    // setSearchOption(event.target.value);
    // 검색 옵션 변경 시 필요한 동작 추가
  };

  const navigateToPost = (id) => {
    window.location.href = `/travelboard/info/${id}`;
  };

  const handlePageChange = (pageNo) => {
    window.location.href = `/my-page/mytravelboard/?page=${pageNo}`;
  };

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async (pageNo) => {
    const response = await axios.get(
      `${API_BASE_URL}${MYPAGE}/my-page/mytravelboard?page=${pageNo}`,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('ACCESS_TOKEN')}`,
        },
      },
    );
    console.log(response);

    setBoardList(response.data.content);
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
        <div className='mypage_section1'>
          {login?.profile ? (
            <img
              src={login.profile}
              alt='프사'
              className='profile-img rounded-pill'
            />
          ) : (
            <img
              src={getProfileImage()}
              alt='프사'
              className='profile-img'
              style={{
                width: '250px',
                borderRadius: '50%',
                marginBottom: '50px',
                marginTop: '30px',
              }}
            />
          )}
          <div className='manage_box'>
            <a href='/my-page/pwChange'>계정관리</a>
            <a href={`/my-page/mytravelboard`} style={{ fontWeight: 'bold' }}>
              내 게시물
            </a>
            <a href={`/my-page/mytravel`}>나의 여행</a>
            <a href={`/my-page`}>여행일정</a>
            <a href={`/my-page/favorite`}>좋아요한 게시물</a>
          </div>
        </div>
        <div className='mypage_section2'>
          <div className='con22'>
            {/* <select
              name='searchOption'
              className='searchOption'
              value={searchOption}
              onChange={handleOptionChange}
            >
              <option value='pastOrder'>과거순</option>
              <option value='up-to-date-order'>최신순</option>
            </select> */}
            <table>
              <thead>
                <tr>
                  <th style={{ width: '5%' }}>번호</th>
                  <th style={{ width: '60%' }}>게시글 제목</th>
                  <th style={{ width: '10%' }}>작성일</th>
                </tr>
              </thead>
              <tbody>
                {boardList.map((dto) => (
                  <tr key={dto.id} onClick={() => navigateToPost(dto.travelId)}>
                    <td>{dto.id}</td>
                    <td>
                      <input
                        type='text'
                        value={dto.content}
                        readOnly
                        className='readonly-input'
                      />
                    </td>
                    <td>{dto.writeDate}</td>
                  </tr>
                ))}
              </tbody>
            </table>

            {/* <div className='bottom-section'>
              <nav aria-label='Page navigation'>
                <ul className='pagination'>
                  {pagination.prev && (
                    <li className='page-item'>
                      <button
                        className='page-link'
                        onClick={() => handlePageChange(pagination.begin - 1)}
                      >
                        &lt;&lt;
                      </button>
                    </li>
                  )}
                  {Array.from(
                    { length: pagination.end - pagination.begin + 1 },
                    (_, i) => pagination.begin + i,
                  ).map((pageNo) => (
                    <li
                      key={pageNo}
                      className={`page-item ${
                        pageNo === pagination.current ? 'active' : ''
                      }`}
                    >
                      <button
                        className='page-link'
                        onClick={() => handlePageChange(pageNo)}
                      >
                        {pageNo}
                      </button>
                    </li>
                  ))}
                  {pagination.next && (
                    <li className='page-item'>
                      <button
                        className='page-link'
                        onClick={() => handlePageChange(pagination.end + 1)}
                      >
                        &gt;&gt;
                      </button>
                    </li>
                  )}
                </ul>
              </nav>
            </div> */}
          </div>
        </div>
      </div>
    </div>
  );
}

export default MyPageTravelBoard;
