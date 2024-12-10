import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import moment from 'moment';
import { API_BASE_URL, TRAVELBOARD } from '../../configs/host-config';
import '../../styles/TravelBoardList.css';

const TravelBoardList = () => {
  const [travelBoardList, setTravelBoardList] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [pageGroup, setPageGroup] = useState(0); // 페이지 그룹 상태 추가

  const fetchTravelBoards = async (page = 0) => {
    setIsLoading(true);
    try {
      const response = await axios.get(
        `${API_BASE_URL}${TRAVELBOARD}/list?page=${page}&size=6`,
      );
      const content = response.data.result.content || [];
      const totalPages = response.data.result.totalPages || 0;
      setTravelBoardList(content);
      setTotalPages(totalPages);
      console.log(content);
    } catch (error) {
      console.error('Error fetching travel boards:', error);
      setError('데이터를 불러오는데 실패했습니다.');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchTravelBoards(currentPage);
  }, [currentPage]);

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  // 페이지 그룹 계산 로직
  const pagesPerGroup = 5; // 한 그룹당 보여줄 페이지 수
  const totalGroups = Math.ceil(totalPages / pagesPerGroup);
  const startPage = pageGroup * pagesPerGroup;
  const endPage = Math.min(startPage + pagesPerGroup, totalPages);

  // 페이지 그룹 이동 핸들러
  const handlePrevGroup = () => {
    if (pageGroup > 0) {
      setPageGroup(pageGroup - 1);
      setCurrentPage(startPage - 1);
    }
  };

  const handleNextGroup = () => {
    if (pageGroup < totalGroups - 1) {
      setPageGroup(pageGroup + 1);
      setCurrentPage(startPage + pagesPerGroup);
    }
  };

  return (
    <main className='allList'>
      <div className='list-container'>
        {isLoading ? (
          <p>Loading...</p>
        ) : (
          travelBoardList.map((board) => (
            <Link
              key={board.id}
              to={`/travelboard/info/${board.id}`}
              className='goPost'
            >
              <img
                src={`https://traplan-img.s3.ap-northeast-2.amazonaws.com/${board.travelImg}`}
                alt={`${board.title} 여행 이미지`}
                className='image'
              />
              <div>
                <h4>{moment(board.writeDate).format('YYYY-MM-DD')}</h4>
                <h4>{board.title}</h4>
                <p>{board.nickName}</p>
                <p>❤️ {board.likeCount}</p>
              </div>
            </Link>
          ))
        )}
      </div>

      <div className='bottom-section'>
        <ul className='pagination'>
          {/* 이전 그룹 버튼 추가 */}
          {pageGroup > 0 && (
            <li className='page-item'>
              <button className='page-link' onClick={handlePrevGroup}>
                {'<<'}
              </button>
            </li>
          )}

          {/* 페이지 번호 버튼들 수정 */}
          {Array.from(
            { length: endPage - startPage },
            (_, i) => startPage + i,
          ).map((pageNum) => (
            <li
              key={pageNum}
              className={`page-item ${pageNum === currentPage ? 'active' : ''}`}
            >
              <button
                className='page-link'
                onClick={() => handlePageChange(pageNum)}
                disabled={pageNum === currentPage}
              >
                {pageNum + 1}
              </button>
            </li>
          ))}

          {/* 다음 그룹 버튼 추가 */}
          {pageGroup < totalGroups - 1 && (
            <li className='page-item'>
              <button className='page-link' onClick={handleNextGroup}>
                {'>>'}
              </button>
            </li>
          )}
        </ul>
      </div>
    </main>
  );
};

export default TravelBoardList;
