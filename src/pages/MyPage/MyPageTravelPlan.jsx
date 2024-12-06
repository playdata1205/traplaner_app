import React, { useState, useEffect, useContext } from 'react';
import { login } from '../../context/UserContext';
import { get } from 'lodash';
import { API_BASE_URL, MYPAGE } from '../../configs/host-config';
import axios from 'axios';
import '../../styles/myPageTravelPlan.css';

const MyTravelPage = () => {
  const { nickName, profile } = useContext(login);
  const [pagination, setPagination] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  const [searchOption, setSearchOption] = useState('pastOrder');
  const [travels, setTravels] = useState([]);
  useEffect(() => {
    fetchTravels();
  }, []);

  const fetchTravels = async (pageNo = 1, amount = 10) => {
    setIsLoading(true);
    try {
      const response = await axios.get(
        `${API_BASE_URL}${MYPAGE}/my-page/my-travel`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('ACCESS_TOKEN')}`,
          },
        },
      );
      console.log(response);

      const responseData = response.data;
      console.log(await responseData);

      // setPagination(responseData.pagination);
      setTravels(responseData);

      console.log(travels);
    } catch (error) {
      console.error('Error fetching travel data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSearchOptionChange = (e) => {
    setSearchOption(e.target.value);
    fetchTravels();
  };

  const toggleShare = async (id) => {
    try {
      const response = await fetch(`/my-page/shareIs/${id}`, {
        method: 'POST',
      });
      if (response.ok) {
        alert('공유 여부가 변경되었습니다.');
        fetchTravels();
      } else {
        alert('공유 변경 중 문제가 발생했습니다.');
      }
    } catch (error) {
      console.error('Error updating share status:', error);
    }
  };

  const deleteTravel = async (id, memberId) => {
    if (!window.confirm('정말 삭제하시겠습니까?')) return;

    try {
      const response = await fetch(`/my-page/delete/${id}/${memberId}`, {
        method: 'POST',
      });
      if (response.ok) {
        alert('여행이 삭제되었습니다.');
        fetchTravels();
      } else {
        alert('삭제 과정에서 문제가 발생했습니다.');
      }
    } catch (error) {
      console.error('Error deleting travel:', error);
    }
  };

  return (
    <div className='container'>
      <div className='mypage_section'>
        <div className='mypage_section1'>
          <img
            src='/path-to-profile-img'
            alt='프로필'
            className='profile-img'
          />
          <div className='manage_box'>
            <a href='/my-page/pwChange'>계정관리</a>
            <a href={`/my-page/mytravelboard/${login.nickName}`}>내 게시물</a>
            <a
              href={`/my-page/mytravel/${login.id}`}
              style={{ fontWeight: 'bold' }}
            >
              나의 여행
            </a>
            <a href={`/my-page`}>여행일정</a>
            <a href={`/my-page/favorite/${login.id}`}>좋아요한 게시물</a>
          </div>
        </div>
        <div className='mypage_section2'>
          <div className='con22'>
            <select
              className='searchOption'
              value={searchOption}
              onChange={handleSearchOptionChange}
            >
              <option value='pastOrder'>과거순</option>
              <option value='up-to-date-order'>최신순</option>
            </select>
            <table>
              <thead>
                <tr>
                  <th style={{ width: '10%', padding: '12px' }}>번호</th>
                  <th style={{ width: '40%', padding: '12px' }}>게시글 제목</th>
                  <th style={{ width: '30%', padding: '12px' }}>여행기간</th>
                  <th style={{ width: '20%', padding: '12px' }}>공유여부</th>
                </tr>
              </thead>
              <tbody>
                {travels.map((travel) => (
                  <tr key={travel.id}>
                    <td style={{ padding: '10px' }}>{travel.id}</td>
                    <td style={{ padding: '10px' }}>
                      <a href={`/my-page/board-info/${travel.id}`}>
                        {travel.title}
                      </a>
                    </td>
                    <td style={{ padding: '10px' }}>
                      {travel.startDate} ~ {travel.endDate}
                    </td>
                    <td style={{ padding: '10px' }}>
                      <input
                        type='checkbox'
                        checked={travel.share === 'true'}
                        onChange={() => toggleShare(travel.id)}
                      />
                    </td>
                    <td style={{ padding: '10px' }}>
                      <img
                        src='/assets/img/delete.png'
                        alt='삭제'
                        style={{ width: 20, cursor: 'pointer' }}
                        onClick={() => deleteTravel(travel.id, login.id)}
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {/* <div className='pagination'>
              {pagination.prev && (
                <button onClick={() => fetchTravels(pagination.begin - 1)}>
                  이전
                </button>
              )}
              {Array.from(
                { length: pagination.end - pagination.begin + 1 },
                (_, i) => pagination.begin + i,
              ).map((page) => (
                <button key={page} onClick={() => fetchTravels(page)}>
                  {page}
                </button>
              ))}
              {pagination.next && (
                <button onClick={() => fetchTravels(pagination.end + 1)}>
                  다음
                </button>
              )}
            </div> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyTravelPage;
