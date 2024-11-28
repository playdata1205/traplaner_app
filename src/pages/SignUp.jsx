import React, { useState } from 'react';
import '../styles/SignUp.css';

const SignUp = () => {
  const [profileImage, setProfileImage] = useState(
    '../assets/img/basicProfile.png',
  );
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    passwordCheck: '',
    nickName: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    // 서버로 데이터 전송 처리 로직 추가
  };

  return (
    <div className='container'>
      <h1 id='join_h1'>회원가입</h1>
      <div className='contents'>
        <form
          name='join'
          id='signUpForm'
          method='post'
          action='/members/sign-up'
          encType='multipart/form-data'
          onSubmit={handleSubmit}
        >
          {/* 프로필 이미지 */}
          <div
            className='profile'
            onClick={() => document.getElementById('profile-img').click()}
          >
            <div className='thumbnail-box'>
              <img src={profileImage} alt='프로필 썸네일' />
            </div>
            <label htmlFor='profile-img'>프로필 이미지 추가</label>
            <input
              type='file'
              id='profile-img'
              accept='image/*'
              name='profileImage'
              style={{ display: 'none' }}
              onChange={handleFileChange}
            />
          </div>

          {/* 입력 폼 */}
          <div id='insert'>
            <div>
              <input
                type='email'
                placeholder='이메일'
                name='email'
                value={formData.email}
                onChange={handleInputChange}
              />
              <button
                type='button'
                id='id_check'
                onClick={() => alert('이메일 중복 확인 기능은 구현 중입니다.')}
              >
                이메일 중복 확인
              </button>
            </div>
            <div>
              <input
                type='password'
                placeholder='비밀번호'
                name='password'
                value={formData.password}
                onChange={handleInputChange}
              />
            </div>
            <div>
              <input
                type='password'
                placeholder='비밀번호 확인'
                name='passwordCheck'
                value={formData.passwordCheck}
                onChange={handleInputChange}
              />
            </div>
            <div>
              <input
                type='text'
                placeholder='닉네임'
                name='nickName'
                value={formData.nickName}
                onChange={handleInputChange}
              />
              <button
                type='button'
                id='nickName_check'
                onClick={() => alert('닉네임 중복 확인 기능은 구현 중입니다.')}
              >
                닉네임 중복 확인
              </button>
            </div>
            <br />
            <button type='submit' id='joinbtn'>
              회원가입
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
