import React, { useState } from 'react';

const TravelPage = ({ travel, journey }) => {
  const [travelImg, setTravelImg] = useState(null);
  const [journeyImages, setJourneyImages] = useState({});
  const [content, setContent] = useState('');

  const handleTravelImgChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setTravelImg(event.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleJourneyImgChange = (id, e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setJourneyImages((prevImages) => ({
          ...prevImages,
          [id]: event.target.result,
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleContentChange = (e) => {
    setContent(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Submit form logic
    console.log('Form submitted');
  };

  return (
    <div className='container'>
      <h1>{travel.title}</h1>
      <form onSubmit={handleSubmit}>
        <input type='hidden' value={travel.id} name='travelId' />
        <p className='author-date'>
          {travel.startDate} ~ {travel.endDate}
        </p>
        <div style={{ textAlign: 'center' }}>
          <img
            src={travelImg || ''}
            alt='Travel'
            style={{ display: travelImg ? 'block' : 'none' }}
            className='travelImg-box'
          />
        </div>
        <div
          className='section photo travelpt'
          style={{
            backgroundImage: travelImg
              ? `url(${travelImg})`
              : `url('/display/${travel.travelImg || ''}')`,
          }}
          onClick={() => document.getElementById('travelImgInput').click()}
        >
          {!travelImg && !travel.travelImg && '여행의 사진을 등록해주세요!!'}
        </div>
        <input
          type='file'
          id='travelImgInput'
          accept='image/*'
          style={{ display: 'none' }}
          onChange={handleTravelImgChange}
        />

        <div className='journey-wrap'>
          {journey.map((item) => (
            <div key={item.id}>
              <input type='hidden' value={item.id} name='journeyId' />
              <h2 className='day-title'>
                {item.journeyName}{' '}
                <span className='day-date'>
                  {item.startTime} - {item.endTime}
                </span>
              </h2>
              <div style={{ textAlign: 'center' }}>
                <img
                  src={journeyImages[item.id] || ''}
                  alt={`Journey ${item.id}`}
                  style={{
                    display: journeyImages[item.id] ? 'block' : 'none',
                  }}
                  className={`journeyImg-box${item.id}`}
                />
              </div>
              <div
                className='section photo journey-photo'
                style={{
                  backgroundImage: journeyImages[item.id]
                    ? `url(${journeyImages[item.id]})`
                    : `url('/display/${item.journeyImg || ''}')`,
                }}
                onClick={() =>
                  document.getElementById(`journeyImgInput${item.id}`).click()
                }
              >
                {!journeyImages[item.id] &&
                  !item.journeyImg &&
                  '여정의 사진을 등록해주세요!!'}
              </div>
              <input
                type='file'
                id={`journeyImgInput${item.id}`}
                accept='image/*'
                style={{ display: 'none' }}
                onChange={(e) => handleJourneyImgChange(item.id, e)}
              />
            </div>
          ))}
        </div>
        <div className='content-box'>
          <textarea
            name='content'
            rows='15'
            cols='100'
            value={content}
            onChange={handleContentChange}
          ></textarea>
        </div>
        <div className='button-box'>
          <button type='submit'>게시글 저장</button>
        </div>
      </form>
    </div>
  );
};

export default TravelPage;
