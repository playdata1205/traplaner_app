import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../styles/PwChange.css';
import { API_BASE_URL, MEMBER } from '../../configs/host-config';

const PasswordChangePage = () => {
  const [email, setEmail] = useState('');
  const [checkNum, setCheckNum] = useState('');
  const [password, setPassword] = useState('');
  const [passwordCheck, setPasswordCheck] = useState('');
  const [isEmailVerified, setIsEmailVerified] = useState(false);
  const verifyNumberRef = useRef('');
  const navigate = useNavigate();

  const handleEmailVerification = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}${MEMBER}/email`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/text' },
        body: email,
      });

      if (response.ok) {
        const data = await response.json();
        console.log(data.result);
        alert('인증 메일이 발송되었습니다.');
        verifyNumberRef.current = data.result;
        console.log(verifyNumberRef.current, typeof verifyNumberRef.current);
      } else {
        const errorData = await response.json();
        alert('이메일 인증 과정에서 문제가 발생했습니다.');
        console.log(errorData);
        alert(errorData.statusMessage);
      }
    } catch (error) {
      console.error('Error verifying email:', error);
    }
  };

  const handleCheckNumVerification = async () => {
    try {
      console.log(verifyNumberRef.current, checkNum);
      if (verifyNumberRef.current === checkNum) {
        alert('이메일 인증에 성공했습니다.');
        setIsEmailVerified(true);
      } else {
        alert('인증 번호가 올바르지 않습니다.');
      }
    } catch (error) {
      console.error('Error verifying check number:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!isEmailVerified) {
      alert('이메일 인증을 완료해주세요.');
      return;
    }

    if (password !== passwordCheck) {
      alert('비밀번호가 일치하지 않습니다.');
      return;
    }

    try {
      const response = await fetch(`${API_BASE_URL}${MEMBER}/pw-change`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        alert('비밀번호가 성공적으로 변경되었습니다.');
      } else {
        alert('비밀번호 변경에 실패했습니다.');
      }
      // navigate(`${API_BASE_URL}${MEMBER}/sign-in`);
      window.location.href = '/';
    } catch (error) {
      console.error('Error changing password:', error);
    }
  };

  return (
    <div className='pw-change'>
      <h1 className='pw-change__title'>비밀번호 변경</h1>
      <img
        className='pw-change__profile'
        src='/assets/img/basicProfile.png'
        alt='프로필'
      />
      <form className='pw-change__form' onSubmit={handleSubmit}>
        <div className='pw-change__input-wrapper'>
          <input
            className='pw-change__input'
            type='email'
            placeholder='이메일'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <button
            type='button'
            className='pw-change__button pw-change__button--verify'
            onClick={handleEmailVerification}
          >
            이메일 인증
          </button>
        </div>

        <div className='pw-change__input-wrapper'>
          <input
            className='pw-change__input'
            type='number'
            placeholder='인증 번호를 입력해주세요'
            value={checkNum}
            onChange={(e) => setCheckNum(e.target.value)}
            required
          />
          <button
            type='button'
            className='pw-change__button pw-change__button--verify'
            onClick={handleCheckNumVerification}
          >
            확인
          </button>
        </div>

        <div className='pw-change__form-group'>
          <input
            className='pw-change__input'
            type='password'
            placeholder='새 비밀번호'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <div className='pw-change__form-group'>
          <input
            className='pw-change__input'
            type='password'
            placeholder='비밀번호 확인'
            value={passwordCheck}
            onChange={(e) => setPasswordCheck(e.target.value)}
            required
          />
        </div>

        <button
          type='submit'
          className='pw-change__button pw-change__button--submit'
        >
          비밀번호 변경
        </button>
      </form>
    </div>
  );
};

export default PasswordChangePage;
