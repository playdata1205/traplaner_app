import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const TravelBoard = ({ tbList, paginationInfo, searchOptions }) => {
  const [searchType, setSearchType] = useState(searchOptions.type || 'title');
  const [sortType, setSortType] = useState(searchOptions.sortType || 'new');
  const [keyword, setKeyword] = useState(searchOptions.keyword || '');
  const [currentPage, setCurrentPage] = useState(paginationInfo.pageNo || 1);

  useEffect(() => {
    setSearchType(searchOptions.type || 'title');
    setSortType(searchOptions.sortType || 'new');
    setKeyword(searchOptions.keyword || '');
  }, [searchOptions]);

  const handleSearch = (e) => {
    e.preventDefault();
    // 검색 요청 처리
    console.log({ searchType, sortType, keyword });
  };

  return (
    <div className='allList'>
      {/* 검색창 */}
      <div className='top-section'>
        <form onSubmit={handleSearch} className='search'>
          <select
            className='form-select'
            value={sortType}
            onChange={(e) => setSortType(e.target.value)}
          >
            <option value='new'>최신순</option>
            <option value='old'>과거순</option>
            <option value='best'>좋아요순</option>
          </select>
          <select
            className='form-select'
            value={searchType}
            onChange={(e) => setSearchType(e.target.value)}
          >
            <option value='title'>제목</option>
            <option value='content'>내용</option>
            <option value='writer'>작성자</option>
            <option value='tc'>제목+내용</option>
          </select>
          <input
            type='search'
            className='form-control'
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
            placeholder='검색어 입력'
          />
          <button type='submit' id='searching'>
            <i
              className='fa-solid fa-magnifying-glass fa-rotate-by'
              style={{ color: '#000' }}
            ></i>
          </button>
        </form>
      </div>

      {/* 목록 */}
      <main className='list'>
        <div className='list-container'>
          {tbList.map((tb) => (
            <Link
              to={`/travelboard/info/${tb.boardId}`}
              className='goPost'
              key={tb.boardId}
            >
              <img
                src={`/display/${tb.img}`}
                alt='여행이미지'
                className='image'
              />
              <div>
                <h4>{tb.shortTitle}</h4>
                <p>{tb.writer}</p>
                <p>{tb.writeDate}</p>
              </div>
            </Link>
          ))}
        </div>
      </main>

      {/* 페이지 버튼 */}
      <div className='bottom-section'>
        <nav>
          <ul className='pagination'>
            {paginationInfo.prev && (
              <li className='page-item'>
                <Link
                  className='page-link'
                  to={`/travelboard/list?pageNo=${paginationInfo.begin - 1}`}
                  onClick={() => setCurrentPage(currentPage - 1)}
                >
                  &lt;&lt;
                </Link>
              </li>
            )}
            {Array.from(
              { length: paginationInfo.end - paginationInfo.begin + 1 },
              (_, i) => paginationInfo.begin + i,
            ).map((i) => (
              <li
                className={`page-item ${currentPage === i ? 'active' : ''}`}
                key={i}
              >
                <Link
                  className='page-link'
                  to={`/travelboard/list?pageNo=${i}`}
                  onClick={() => setCurrentPage(i)}
                >
                  {i}
                </Link>
              </li>
            ))}
            {paginationInfo.next && (
              <li className='page-item'>
                <Link
                  className='page-link'
                  to={`/travelboard/list?pageNo=${paginationInfo.end + 1}`}
                  onClick={() => setCurrentPage(currentPage + 1)}
                >
                  &gt;&gt;
                </Link>
              </li>
            )}
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default TravelBoard;
