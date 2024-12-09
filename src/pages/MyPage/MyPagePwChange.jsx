import React, { useState } from 'react';

const MyPage = ({ login }) => {
  const [newPw, setNewPw] = useState('');
  const [pwChk, setPwChk] = useState('');
  const [newNick, setNewNick] = useState('');

  const modifyInfo = async (id) => {
    const url = 'http://localhost:8181/my-page/changeConfirm';

    if (newNick === '') {
      setNewNick(login.nickName);
    }

    if (newPw !== pwChk) {
      alert('비밀번호가 같지 않습니다.');
      setNewPw('');
      setPwChk('');
      return;
    }

    const modiInfo = {
      id,
      newPw,
      newNick,
    };

    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(modiInfo),
      });

      if (response.status === 200) {
        alert('회원정보 수정 완료');
        setNewPw('');
        setPwChk('');
        setNewNick('');
      } else {
        alert('정보 수정 중 문제 발생');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('네트워크 에러');
    }
  };

  const checkNick = async () => {
    if (newNick === '') {
      setNewNick(login.nickName);
    }

    const url = `http://localhost:8181/my-page/nickNameChk/${newNick}`;

    try {
      const response = await fetch(url, { method: 'POST' });

      if (response.status === 200) {
        alert('사용 가능한 닉네임입니다.');
      } else {
        alert('중복된 닉네임입니다.');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('네트워크 에러');
    }
  };

  const getProfileImage = () => {
    if (!login.profile) {
      return '/assets/img/anonymous.jpg';
    }
    return `/display/${login.profile}`;
  };

  return (
    <div className='container'>
      <div className='mypage_section'>
        <div className='mypage_section1'>
          <img
            src={getProfileImage()}
            alt='프사'
            style={{
              width: '250px',
              borderRadius: '50%',
              marginBottom: '50px',
              marginTop: '30px',
            }}
            className='rounded-pill'
          />
          <div className='manage_box'>
            <a style={{ fontWeight: 'bold' }} href='/my-page/pwChange'>
              계정관리
            </a>
            <a href={`/my-page/mytravelboard/${login.nickName}`}>내 게시물</a>
            <a href={`/my-page/mytravel/${login.id}`}>나의 여행</a>
            <a href={`/my-page/${login.id}`}>여행일정</a>
            <a href={`/my-page/favorite/${login.id}`}>좋아요한 게시물</a>
          </div>
        </div>
        <div className='mypage_section2'>
          <div className='info-box'>
            <img
              src={getProfileImage()}
              alt='프사'
              style={{
                width: '250px',
                borderRadius: '50%',
                marginBottom: '50px',
                marginTop: '30px',
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
            <div style={{ textAlign: 'center' }}>
              <input
                id='newNickName'
                placeholder='새 닉네임'
                type='text'
                value={newNick}
                onChange={(e) => setNewNick(e.target.value)}
              />
              <button className='nickNameChk' onClick={checkNick}>
                중복체크
              </button>
            </div>
            <div>
              <button className='modiBtn' onClick={() => modifyInfo(login.id)}>
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
