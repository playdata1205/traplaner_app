import React, { useState, useCallback } from 'react';
import { API_BASE_URL, MEMBER } from '../../configs/host-config';
import '../../styles/SignUp.css';

function debounce(callback, wait) {
  let timeout;
  return (...args) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => callback(...args), wait);
  };
}

function SignUpForm() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    passwordCheck: '',
    nickName: '',
    profileImage: null,
  });

  const [errors, setErrors] = useState({});
  const [validFields, setValidFields] = useState({
    email: false,
    password: false,
    passwordCheck: false,
    nickName: false,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData({ ...formData, profileImage: file });
    }
  };

  const validateField = async (name, value) => {
    const passwordPattern =
      /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[!@#$%^&*?_~])[A-Za-z\d!@#$%^&*?_~]{8,}$/;
    const nickNamePattern = /^[가-힣]+$/;
    const emailPattern = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;

    let result = { valid: true, message: '' };

    switch (name) {
      case 'email':
        if (!value.trim()) {
          result = { valid: false, message: '이메일은 필수값입니다!' };
        } else if (!emailPattern.test(value)) {
          result = { valid: false, message: '이메일 형식을 지켜주세요.' };
        } else {
          const isAvailable = await checkAvailability('email', value);
          if (!isAvailable) {
            result = { valid: false, message: '이메일이 중복되었습니다.' };
          }
        }
        break;

      case 'password':
        if (!value.trim()) {
          result = { valid: false, message: '비밀번호는 필수값입니다!' };
        } else if (!passwordPattern.test(value)) {
          result = {
            valid: false,
            message:
              '비밀번호는 영문, 숫자, 특수문자를 포함하여 8자 이상이어야 합니다!',
          };
        }
        break;

      case 'passwordCheck':
        if (!value.trim()) {
          result = { valid: false, message: '비밀번호 확인란은 필수값입니다!' };
        } else if (value !== formData.password) {
          result = { valid: false, message: '비밀번호가 일치하지 않습니다!' };
        }
        break;

      case 'nickName':
        if (!value.trim()) {
          result = { valid: false, message: '닉네임은 필수정보입니다!' };
        } else if (!nickNamePattern.test(value)) {
          result = { valid: false, message: '이름은 한글로 입력해주세요.' };
        } else {
          const isAvailable = await checkAvailability('nickname', value);
          if (!isAvailable) {
            result = { valid: false, message: '중복된 닉네임입니다.' };
          }
        }
        break;

      default:
        break;
    }

    setErrors((prev) => ({ ...prev, [name]: result.message }));
    setValidFields((prev) => ({ ...prev, [name]: result.valid }));
    return result.valid;
  };

  const checkAvailability = async (type, keyword) => {
    const response = await fetch(`${API_BASE_URL}${MEMBER}/duplicateTest`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ type, keyword }),
    });
    const result = await response.json();
    return !result;
  };

  const debouncedValidateField = useCallback(
    debounce(async (name, value) => {
      await validateField(name, value);
    }, 500),
    [formData.password],
  );

  const handleBlur = (e) => {
    const { name, value } = e.target;
    debouncedValidateField(name, value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const allValid = await Promise.all(
      Object.keys(formData).map((field) =>
        validateField(field, formData[field]),
      ),
    );

    if (allValid.every((valid) => valid)) {
      const form = new FormData();
      Object.keys(formData)
        .filter((key) => key !== 'passwordCheck')
        .forEach((key) => {
          form.append(key, formData[key]);
        });

      await fetch(`${API_BASE_URL}${MEMBER}/sign-up`, {
        method: 'POST',
        body: form,
      });
      alert('회원가입 성공!');
    } else {
      alert('입력값을 확인해주세요!');
    }
  };

  return (
    <div className='signup-container'>
      <h1 className='signup-title'>회원가입</h1>
      <form
        onSubmit={handleSubmit}
        encType='multipart/form-data'
        className='signup-form'
      >
        <div className='signup-profile'>
          <div
            className='signup-profile__thumbnail'
            onClick={() => document.getElementById('profile-img').click()}
          >
            <img
              src={
                formData.profileImage
                  ? URL.createObjectURL(formData.profileImage)
                  : '/assets/img/image-add.png'
              }
              alt='프로필 썸네일'
            />
          </div>
          <label htmlFor='profile-img' className='signup-profile__label'>
            프로필 이미지 추가
          </label>
          <input
            type='file'
            id='profile-img'
            accept='image/*'
            style={{ display: 'none' }}
            onChange={handleFileChange}
          />
        </div>

        <div className='signup-input__wrapper'>
          <input
            type='email'
            name='email'
            placeholder='이메일'
            value={formData.email}
            onChange={handleChange}
            onBlur={handleBlur}
            className='signup-input'
          />
          <span className='signup-error'>{errors.email}</span>
        </div>

        <div className='signup-input__wrapper'>
          <input
            type='password'
            name='password'
            placeholder='비밀번호'
            value={formData.password}
            onChange={handleChange}
            onBlur={handleBlur}
            className='signup-input'
          />
          <span className='signup-error'>{errors.password}</span>
        </div>

        <div className='signup-input__wrapper'>
          <input
            type='password'
            name='passwordCheck'
            placeholder='비밀번호 확인'
            value={formData.passwordCheck}
            onChange={handleChange}
            onBlur={handleBlur}
            className='signup-input'
          />
          <span className='signup-error'>{errors.passwordCheck}</span>
        </div>

        <div className='signup-input__wrapper'>
          <input
            type='text'
            name='nickName'
            placeholder='닉네임'
            value={formData.nickName}
            onChange={handleChange}
            onBlur={handleBlur}
            className='signup-input'
          />
          <span className='signup-error'>{errors.nickName}</span>
        </div>

        <button type='submit' className='signup-submit'>
          회원가입
        </button>
      </form>
    </div>
  );
}

export default SignUpForm;
