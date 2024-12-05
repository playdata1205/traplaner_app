import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { login } from '../../context/UserContext';
import { API_BASE_URL, MEMBER } from '../../configs/host-config';
import axios from 'axios';
const SignIn = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [serverResult, setServerResult] = useState('');
  const { onLogin } = useContext(login);
  const navigate = useNavigate();
  // 서버 결과 처리
  useEffect(() => {
    if (serverResult === 'NO_ACC') {
      alert('회원가입을 먼저 진행해 주세요!');
    } else if (serverResult === 'NO_PW') {
      alert('비밀번호가 틀렸어요!');
    }
  }, [serverResult]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    // 서버 통신 로직 추가
    const loginData = {
      email,
      password,
    };
    try {
      const res = await axios.post(
        `${API_BASE_URL}${MEMBER}/sign-in`,
        loginData,
      );
      console.log('axios로 로그인 요청 결과: ', res);

      alert('로그인 성공!');
      setServerResult(res.data.statusMessage);
      const token = res.data.result.token;
      const id = res.data.result.id;
      const nickName = res.data.result.nickName;
      const loginMethod = res.data.result.loginMethod;
      const profile = res.data.result.profile;

      onLogin(token, id, nickName, loginMethod, profile);
      navigate('/');
    } catch (e) {
      console.log(e);
      // 옵셔널 체이닝 (optional chaining)
      // 특정 객체나 속성이 null 또는 undefined인지 확인하고 안전하게 접근할 수 있게 도와줌.
      // 논리 연산자와 연계하여 옵셔널 체이닝이 falsy한 값일 경우 대체할 수 있는 값을 지정.
      const errorMessage = e.response?.data?.statusMessage || '로그인 실패!';
      alert(errorMessage);
    }
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
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={styles.input}
          />
          <input
            type='password'
            placeholder='비밀번호를 입력하세요'
            name='password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
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
