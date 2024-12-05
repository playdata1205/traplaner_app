import React, { useState } from 'react';
import '../../styles/PwChange.css';

const PasswordChangePage = () => {
  const [email, setEmail] = useState('');
  const [checkNum, setCheckNum] = useState('');
  const [password, setPassword] = useState('');
  const [passwordCheck, setPasswordCheck] = useState('');
  const [isEmailVerified, setIsEmailVerified] = useState(false);

  const handleEmailVerification = async () => {
    try {
      const response = await fetch('/email/verify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });

      if (response.ok) {
        alert('인증 메일이 발송되었습니다.');
      } else {
        alert('이메일 인증 과정에서 문제가 발생했습니다.');
      }
    } catch (error) {
      console.error('Error verifying email:', error);
    }
  };

  const handleCheckNumVerification = async () => {
    try {
      const response = await fetch('/email/verify-check', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, checkNum }),
      });

      if (response.ok) {
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
      const response = await fetch('/members/pw-change', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        alert('비밀번호가 성공적으로 변경되었습니다.');
      } else {
        alert('비밀번호 변경에 실패했습니다.');
      }
    } catch (error) {
      console.error('Error changing password:', error);
    }
  };

  return (
    <div className='container'>
      <h1 id='join_h1'>비밀번호 변경</h1>
      <img id='profile_img' src='/assets/img/basicProfile.png' alt='프로필' />
      <div className='contents'>
        <form id='change-pw' onSubmit={handleSubmit}>
          <div id='insert'>
            <div>
              <input
                type='email'
                placeholder='이메일'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <button
                type='button'
                className='id_check'
                onClick={handleEmailVerification}
              >
                이메일 인증
              </button>
            </div>
            <div>
              <input
                type='number'
                placeholder='인증 번호를 입력해주세요'
                value={checkNum}
                onChange={(e) => setCheckNum(e.target.value)}
                required
              />
              <button
                type='button'
                className='id_check'
                onClick={handleCheckNumVerification}
              >
                확인
              </button>
            </div>
            <div>
              <input
                type='password'
                placeholder='새 비밀번호'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <div>
              <input
                type='password'
                placeholder='비밀번호 확인'
                value={passwordCheck}
                onChange={(e) => setPasswordCheck(e.target.value)}
                required
              />
            </div>
            <br />
            <button type='submit' id='joinbtn'>
              비밀번호 변경
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PasswordChangePage;
