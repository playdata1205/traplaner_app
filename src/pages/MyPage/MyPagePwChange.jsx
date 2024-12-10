import React, { useContext, useEffect, useState } from 'react';
import { API_BASE_URL, MYPAGE } from '../../configs/host-config';
import axiosInstance from '../../configs/axios-config';
import login from '../../context/UserContext';
import '../../styles/MyPwChange.css';

const MyPage = () => {
  const { nickName, profile, id } = useContext(login);
  const [newPw, setNewPw] = useState('');
  const [pwChk, setPwChk] = useState('');
  const [newNick, setNewNick] = useState('');
  const [memberInfo, setMemberInfo] = useState({});

  useEffect(() => {
    const getMemberInfo = async () => {
      const res = await axiosInstance.get(
        `${API_BASE_URL}${MYPAGE}/my-page/pwChange`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('ACCESS_TOKEN')}`,
          },
        },
      );

      setMemberInfo(res);
    };
    getMemberInfo();
  }, []);

  const modifyInfo = async (id) => {
    console.log('aasdas', id);

    const data = {
      id,
      newPw,
      newNick,
    };
    const res = await axiosInstance.post(
      `${API_BASE_URL}${MYPAGE}/my-page/changeConfirm`,
      data,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('ACCESS_TOKEN')}`,
        },
      },
    );
    if (res.status === 200) {
      alert('변경성공');
    } else {
      alert('변경실패');
    }
  };

  const checkNick = async () => {
    try {
      if (newNick === '') {
        alert('닉네임을 입력해주세요');
        return;
      }

      const res = await axiosInstance.post(
        `${API_BASE_URL}${MYPAGE}/my-page/nickNameChk/${newNick}`,
        null,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('ACCESS_TOKEN')}`,
          },
        },
      );

      if ((res.data = 'success')) {
        alert('사용 가능한 닉네임입니다');
        console.log(res.data);
      } else {
        alert('이미 사용중인 닉네임입니다');
        setNewNick('');
      }
    } catch (error) {
      alert('이미 사용중인 닉네임입니다');
      setNewNick('');
    }
  };

  const getProfileImage = () => {
    if (!profile) {
      return '/assets/img/anonymous.jpg';
    } else {
      return `https://traplan-img.s3.ap-northeast-2.amazonaws.com/${profile}`;
    }
  };
  return (
    <div className='pw-change-container'>
      <div className='pw-change-section'>
        <div className='pw-change-sidebar'>
          <img
            src={getProfileImage()}
            alt='프사'
            style={{
              width: '200px',
              borderRadius: '50%',
              marginBottom: '50px',
              marginTop: '30px',
            }}
            className='rounded-pill'
          />
          <div className='pw-change-manage-box'>
            <a style={{ fontWeight: 'bold' }} href='/my-page/pwChange'>
              계정관리
            </a>
            <a href={`/my-page/mytravelboard`}>내 게시물</a>
            <a href={`/my-page/mytravel`}>나의 여행</a>
            <a href={`/my-page`}>여행일정</a>
            <a href={`/my-page/favorite`}>좋아요한 게시물</a>
          </div>
        </div>
        <div className='pw-change-content'>
          <div className='pw-change-info-box'>
            <img
              src={getProfileImage()}
              alt='프사'
              style={{
                width: '200px',
                borderRadius: '50%',
              }}
              className='rounded-pill'
            />
            <input
              type='email'
              value={login.email}
              readOnly
              style={{ border: 'none', outline: 'none' }}
            />
            <input
              id='newPw'
              placeholder='새 비밀번호'
              type='password'
              value={newPw}
              onChange={(e) => setNewPw(e.target.value)}
            />
            <input
              id='pwChk'
              placeholder='비밀번호 확인'
              type='password'
              value={pwChk}
              onChange={(e) => setPwChk(e.target.value)}
            />
            <div className='nickname-container'>
              <input
                id='newNickName'
                placeholder='새 닉네임'
                type='text'
                value={newNick}
                onChange={(e) => setNewNick(e.target.value)}
              />
              <button className='pw-change-nick-check' onClick={checkNick}>
                중복체크
              </button>
            </div>
            <div>
              <button
                className='pw-change-modify-btn'
                onClick={() => modifyInfo(login.id)}
              >
                회원정보 수정
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyPage;
