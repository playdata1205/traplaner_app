import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const MyPage = ({ userLogin }) => {
  const [profile, setProfile] = useState(userLogin?.profile || null);
  const [nickname, setNickname] = useState(userLogin?.nickName || '');
  const [userId, setUserId] = useState(userLogin?.id || '');
  const [list, setList] = useState([]);
  const [pageInfo, setPageInfo] = useState({});
  const [order, setOrder] = useState('pastOrder');

  const navigate = useNavigate();

  // API 호출하여 게시물 목록 및 페이지 정보 가져오기
  useEffect(() => {
    fetch(`/api/my-page/favorite/${userId}?order=${order}`)
      .then((response) => response.json())
      .then((data) => {
        setList(data.list);
        setPageInfo(data.pageInfo);
      })
      .catch((error) => console.error('Error fetching data:', error));
  }, [userId, order]);

  const handlePageChange = (pageNo) => {
    navigate(
      `/my-page/favorite/${userId}?pageNo=${pageNo}&amount=${pageInfo.amount}`,
    );
  };

  return (
    <div className='container'>
      <div className='mypage_section'>
        {/* 왼쪽 섹션 */}
        <div className='mypage_section1'>
          {profile ? (
            <img
              src={`/display/${profile}`}
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
              src='/assets/img/anonymous.jpg'
              alt='Default Profile'
              style={{ width: '30px', borderRadius: '50%' }}
            />
          )}
          <div className='manage_box'>
            <a href='#'>계정관리</a>
            <a href={`/my-page/mytravelboard/${nickname}`}>내 게시물</a>
            <a href={`/my-page/mytravel/${userId}`}>나의 여행</a>
            <a href={`/my-page/${userId}`}>여행일정</a>
            <a
              href={`/my-page/favorite/${userId}`}
              style={{ fontWeight: 'bold' }}
            >
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
                {list.map((item, index) => (
                  <tr key={index}>
                    <td>{item.id}</td>
                    <td>
                      <input
                        type='text'
                        name='con_text'
                        value={item.title}
                        readOnly
                        style={{
                          width: '100%',
                          border: 'none',
                          textAlign: 'center',
                        }}
                      />
                    </td>
                    <td>{item.memberNickName}</td>
                    <td>{item.formatDate}</td>
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

export default MyPage;
