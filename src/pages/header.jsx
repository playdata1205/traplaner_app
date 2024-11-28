import React, { useState } from 'react';
import PropTypes from 'prop-types';
import '../styles/navbar.css';

const Navbar = ({ login }) => {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen((prev) => !prev);
  };

  const profileImg =
    login?.profile === null
      ? '/assets/img/anonymous.jpg'
      : login?.loginMethod === 'KAKAO'
        ? login.profile
        : `/display/${login.profile}`;

  const isLoggedIn = Boolean(login?.id);

  return (
    <nav id='navbar'>
      <a href='/' className='brand'>
        TRAPLAN
      </a>

      {/* 프로필 이미지 */}
      <img src={profileImg} alt='프사' className='profile-img' />
      <span className='navbar-text'>
        &nbsp;&nbsp;Welcome {login?.nickName || ''}
      </span>

      {/* 모바일 토글 버튼 */}
      <button id='navbar-toggle' onClick={toggleMenu}>
        ☰
      </button>

      {/* 네비게이션 메뉴 */}
      <ul id='navbar-menu' className={menuOpen ? 'show' : ''}>
        <li className='nav-item'>
          <a href='/travelboard/list' className='nav-link'>
            게시판
          </a>
        </li>
        {isLoggedIn ? (
          <>
            <li className='nav-item'>
              <a href={`/my-page/${login.id}`} className='nav-link'>
                마이페이지
              </a>
            </li>
            <li className='nav-item'>
              <a href='/members/sign-out' className='nav-link'>
                로그아웃
              </a>
            </li>
          </>
        ) : (
          <>
            <li className='nav-item'>
              <a href='/members/sign-in' className='nav-link'>
                로그인
              </a>
            </li>
            <li className='nav-item'>
              <a href='/members/sign-up' className='nav-link'>
                회원가입
              </a>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
};

// PropTypes로 props 타입 정의
Navbar.propTypes = {
  login: PropTypes.shape({
    id: PropTypes.string,
    profile: PropTypes.string,
    loginMethod: PropTypes.string,
    nickName: PropTypes.string,
  }),
};

export default Navbar;
