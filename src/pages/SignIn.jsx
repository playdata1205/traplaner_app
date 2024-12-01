import React, { useState, useEffect } from 'react';

const SignIn = () => {
  const [serverResult, setServerResult] = useState('');

  // 서버 결과 처리
  useEffect(() => {
    if (serverResult === 'NO_ACC') {
      alert('회원가입을 먼저 진행해 주세요!');
    } else if (serverResult === 'NO_PW') {
      alert('비밀번호가 틀렸어요!');
    }
  }, [serverResult]);

  const handleSubmit = (event) => {
    event.preventDefault();
    // 서버 통신 로직 추가
    console.log('로그인 요청 전송');
  };

  return (
    <div style={styles.container}>
      <img
        id='logo'
        src='/assets/img/sign-in-logo.png'
        alt='업다'
        style={styles.logo}
      />
      <h1 style={styles.title}>
        즐거운 여행의 시작,
        <br /> 트래플랜
      </h1>
      <form onSubmit={handleSubmit} style={styles.form}>
        <div style={styles.formText}>
          <input
            type='email'
            placeholder='이메일을 입력하세요'
            name='email'
            style={styles.input}
          />
          <input
            type='password'
            placeholder='비밀번호를 입력하세요'
            name='password'
            style={styles.input}
          />
        </div>
        <button type='submit' id='login-btn' style={styles.loginBtn}>
          로그인
        </button>
      </form>
      <div style={styles.signUpBtn}>
        <a href='/members/sign-up' style={styles.link}>
          회원 가입
        </a>
        <a href='/members/pw-change' style={styles.link}>
          비밀번호 변경
        </a>
      </div>
      <div style={styles.snsLogo}>
        <a href='../kakao/login'>
          <img
            src='/assets/img/kakao_login_small.png'
            className='login-btn'
            alt='kakaoBtn'
            style={styles.snsBtn}
          />
        </a>
        <a href='../naver/login'>
          <img
            src='/assets/img/naver_login_small.png'
            className='login-btn'
            alt='naverBtn'
            style={styles.snsBtn}
          />
        </a>
      </div>
    </div>
  );
};

// 스타일 객체
const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  logo: {
    width: '25%',
  },
  title: {
    textAlign: 'center',
  },
  form: {
    display: 'flex',
    alignItems: 'center',
  },
  formText: {
    height: '40%',
    display: 'flex',
    flexDirection: 'column',
  },
  input: {
    width: '340px',
    height: '35px',
    marginBottom: '5px',
    marginRight: '15px',
    border: '1px solid #e8e8e8',
    borderRadius: '5px',
  },
  loginBtn: {
    height: '60px',
    width: '70px',
    backgroundColor: 'white',
    border: '2px solid #e8e8e8',
    borderRadius: '10px',
    cursor: 'pointer',
  },
  signUpBtn: {
    display: 'flex',
    width: '225px',
    justifyContent: 'space-between',
    marginTop: '20px',
    marginBottom: '20px',
  },
  link: {
    textDecoration: 'none',
    backgroundColor: '#e8e8e8',
    color: 'black',
    border: '1px solid gray',
    borderRadius: '10px',
    padding: '10px',
  },
  snsLogo: {
    width: '140px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  snsBtn: {
    width: '60px',
  },
};

export default SignIn;
