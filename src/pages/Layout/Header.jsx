import React, { useContext, useState } from 'react';
import { login } from '../../context/UserContext';
import { useNavigate } from 'react-router-dom';
import '../../styles/header.css';
export const Header = () => {
  const { isLoggedIn, onLogout, profile, nickName, loginMethod } =
    useContext(login);
  const [menuOpen, setMenuOpen] = useState(false);
  const toggleMenu = () => {
    setMenuOpen((prev) => !prev);
  };

  const profileImg = loginMethod === 'KAKAO' ? `/display/${profile}` : profile;
  console.log(profileImg);

  const navigate = useNavigate();
  const handleLogout = () => {
    onLogout();
    alert('로그아웃 완료!');
    navigate('/');
  };

  return (
    <nav id='navbar'>
      <a href='/' className='brand'>
        <img src='/assets/img/logo.png' className='logo' alt='logo' />
      </a>
      {isLoggedIn && (
        <>
          {/* 프로필 이미지 */}
          <img
            src={`https://traplan-img.s3.ap-northeast-2.amazonaws.com/${profileImg}`}
            alt='프사'
            className='profile-img'
          />
          <span className='navbar-text'>
            &nbsp;&nbsp;HELLO HELLO HELLO{nickName}
          </span>
        </>
      )}

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
              <a href={`/my-page`} className='nav-link'>
                마이페이지
              </a>
            </li>
            <li className='nav-item'>
              <p onClick={handleLogout} className='nav-link'>
                로그아웃
              </p>
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
