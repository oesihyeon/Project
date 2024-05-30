import React, { useState } from 'react';
import './MbtiRecommendedExercise.css';


function MbtiRecommendedExercise() {
  const [extroversionValue, setExtroversionValue] = useState(50);
  const [introversionValue, setIntroversionValue] = useState(50);
  const [sensingValue, setSensingValue] = useState(50);
  const [intuitionValue, setIntuitionValue] = useState(50);
  const [thinkingValue, setThinkingValue] = useState(50);
  const [feelingValue, setFeelingValue] = useState(50);
  const [judgingValue, setJudgingValue] = useState(50);
  const [perceivingValue, setPerceivingValue] = useState(50);
  const [extroversionColor, setExtroversionColor] = useState('');
  const [introversionColor, setIntroversionColor] = useState('');
  const [sensingColor, setSensingColor] = useState('');
  const [intuitionColor, setIntuitionColor] = useState('');
  const [thinkingColor, setThinkingColor] = useState('');
  const [feelingColor, setFeelingColor] = useState('');
  const [judgingColor, setJudgingColor] = useState('');
  const [perceivingColor, setPerceivingColor] = useState('');

  const handleTypeSelect = (type) => {
    switch (type) {
      case 'E':
        setExtroversionValue(70);
        setIntroversionValue(30);
        setIntroversionColor('');
        setExtroversionColor('#FA865F');
        break;
      case 'I':
        setExtroversionValue(30);
        setIntroversionValue(70);
        setExtroversionColor('');
        setIntroversionColor('#FA865F');
        break;
      case 'S':
        setSensingValue(70);
        setIntuitionValue(30);
        setIntuitionColor('');
        setSensingColor('#FA865F');
        break;
      case 'N':
        setSensingValue(30);
        setIntuitionValue(70);
        setSensingColor('');
        setIntuitionColor('#FA865F');
        break;
      case 'T':
        setThinkingValue(70);
        setFeelingValue(30);
        setFeelingColor('');
        setThinkingColor('#FA865F');
        break;
      case 'F':
        setThinkingValue(30);
        setFeelingValue(70);
        setThinkingColor('');
        setFeelingColor('#FA865F');
        break;
      case 'J':
        setJudgingValue(70);
        setPerceivingValue(30);
        setPerceivingColor('');
        setJudgingColor('#FA865F');
        break;
      case 'P':
        setJudgingValue(30);
        setPerceivingValue(70);
        setJudgingColor('');
        setPerceivingColor('#FA865F');
        break;
      default:
        break;
    }
  };

  const handleSubmit = () => {
    // 각 value들을 원하는 형식에 맞게 저장합니다.
    const formData = {
      extroversion: extroversionValue,
      introversion: introversionValue,
      sensing: sensingValue,
      intuition: intuitionValue,
      thinking: thinkingValue,
      feeling: feelingValue,
      judging: judgingValue,
      perceiving: perceivingValue,
    };

    // 저장된 데이터를 보여줍니다.
    console.log('Form data:', formData);
  };

  return (
    <div className="mbti_wrap">
      <br></br>
      <br></br>
      <div className="mbti_set">
        <div className='explain_page'>
          <p>회원님의 성향에 맞는 운동 추천하는 WBTI 입니다.
            <br></br>밑에 MBTI 를 기재해주세요!  </p>
        </div>
        <div className="mbti_text">
          <h2 >MBTI를 입력해주세요.</h2>
        </div>
        
        <div className="progress_wrap">
          <div className="container">
            <div className="tooltip">
              <span className="tooltiptext" id="tooltiptext">{extroversionValue}%</span>
              <button  className='mbti_btn' onClick={() => handleTypeSelect('E')} style={{ backgroundColor: extroversionColor }}>E</button>
              <input
                type="range"
                min="0"
                max="100"
                value={extroversionValue}
                className="slider"
                id="myRange"
                onChange={(e) => setExtroversionValue(parseInt(e.target.value))}
              />
              <button className='mbti_btn' onClick={() => handleTypeSelect('I')} style={{ backgroundColor: introversionColor }}>I</button>
            </div>
            <div className="tooltip">
              <span className="tooltiptext" id="tooltiptext">{sensingValue}%</span>
              <button  className='mbti_btn' onClick={() => handleTypeSelect('S')} style={{ backgroundColor: sensingColor }}>S</button>
              <input
                type="range"
                min="0"
                max="100"
                value={sensingValue}
                className="slider"
                id="myRange"
                onChange={(e) => setSensingValue(parseInt(e.target.value))}
              />
              <button  className='mbti_btn' onClick={() => handleTypeSelect('N')} style={{ backgroundColor: intuitionColor }}>N</button>
            </div>
            <div className="tooltip">
              <span className="tooltiptext" id="tooltiptext">{thinkingValue}%</span>
              <button  className='mbti_btn' onClick={() => handleTypeSelect('T')} style={{ backgroundColor: thinkingColor }}>T</button>
              <input
                type="range"
                min="0"
                max="100"
                value={thinkingValue}
                className="slider"
                id="myRange"
                onChange={(e) => setThinkingValue(parseInt(e.target.value))}
              />
              <button  className='mbti_btn' onClick={() => handleTypeSelect('F')} style={{ backgroundColor: feelingColor }}>F</button>
            </div>
            <div className="tooltip">
              <span className="tooltiptext" id="tooltiptext">{judgingValue}%</span>
              <button  className='mbti_btn' onClick={() => handleTypeSelect('J')} style={{ backgroundColor: judgingColor }}>J</button>
              <input
                type="range"
                min="0"
                max="100"
                value={judgingValue}
                className="slider"
                id="myRange"
                onChange={(e) => setJudgingValue(parseInt(e.target.value))}
              />
              <button  className='mbti_btn' onClick={() => handleTypeSelect('P')} style={{ backgroundColor: perceivingColor }}>P</button>
            </div>
          </div>
        </div>
      </div>
      <button className='submit_btn' onClick={handleSubmit}>Submit </button>
      <br></br>
      <button className='survey_btn'>
      <a href="https://info.booksterhouse.com/905?gad_source=1&gclid=Cj0KCQjwlN6wBhCcARIsAKZvD5jEbzWYjrWtYYUnhZUV4CSnYA_FfI2vmZ_5SlT3IxKFArf9D7Ozk_kaAlmzEALw_wcB#google_vignette" target="_blank">
        검사하러 가기
      </a>
      </button>
    </div>
  );
}

export default MbtiRecommendedExercise;
