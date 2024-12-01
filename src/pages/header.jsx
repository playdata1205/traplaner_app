import React, { useContext, useState } from 'react';
import '../styles/header.css';
import { login } from '../context/UserContext';

export const Header = () => {
  const { isLoggedIn, onLogout, profile } = useContext(login);
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen((prev) => !prev);
  };

  const profileImg =
    login?.profile === undefined
      ? '/img/anonymous.jpg' // 이 부분이 추후에 로직에서 제대로 출력이 안돼. 알려줘
      : login?.loginMethod === 'KAKAO'
        ? login.profile
        : `/display/${login.profile}`;

  return (
    <nav id='navbar'>
      <a href='/' className='brand'>
        TRAPLAN
      </a>

      {/* 프로필 이미지 */}
      <img src={profileImg} alt='프사' className='profile-img' />
      <span className='navbar-text'>
        &nbsp;&nbsp;Welcome {login?.nickName ? login?.nickName : '방문자님'}
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
