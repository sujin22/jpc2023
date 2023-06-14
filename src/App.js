import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Link, Routes, Route } from 'react-router-dom';
import logo from './logo.png';
import reload from './reload.png';
import './App.css';

function FirstPage() {
  const [showComponent, setShowComponent] = useState(false);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setShowComponent(true);
  }, []);

  return (
    <div className={`parent ${showComponent ? 'fade-in' : ''}`}>
      <img className="logo" src={logo} alt="로고 이미지" />
      <h1 className="titleText">
        새로운 사람들과 <br />
        그들의 멋진 경험을<br />
        마주할 준비가 되셨나요?
      </h1>

      <Link to="/phone" style={{ textDecoration: 'none' }}>
        <div className='nextButton'>
        Let's Dive!
        </div>
      </Link>
    </div>
  );
}

function PhoneNumPage() {
  const [showComponent, setShowComponent] = useState(false);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setShowComponent(true);
  }, []);

  return (
    <div className={`parent ${showComponent ? 'fade-in' : ''}`}>
      <img className="logo" src={logo} alt="로고 이미지" />
      <div className="detailText"># JPC를 함께 경험할 파트너를 연결해 드릴게요</div>
      <div className="titleText">
        전화번호를 알려주세요.
      </div>
      <input type="text" placeholder="01012345678" className='inputPhone' />
      <Link to="/result" style={{ textDecoration: 'none' }}>
        <div className='nextButton'>
          파트너 찾기
        </div>
      </Link>

    </div>
  );

}

function ResultPage() {
  const [showComponent, setShowComponent] = useState(false);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setShowComponent(true);
  }, []);


  const [hasArrived, setHasArrived] = useState(false);
  const onClickReload = () => {
    //TODO: api 결과값
    setHasArrived(!hasArrived);
  };

  //TODO: api 결과값
  const prizeNumber = 12;

  return (
    <div className={`parent ${showComponent ? 'fade-in' : ''}`}>
      <img className="logo_small" src={logo} alt="로고 이미지" />
      <h2 className="resultTitleText">
        당신의 파트너를 찾아<br />
        선물을 교환하세요.
      </h2>
      <div className="partnerContainer">
        <div className="partnerText">
          당신의 파트너는
          <div className="partnerName">술톤개구리</div>
          입니다.
        </div>
      </div>

      <div className="titleContainer">
        <div>
          <div className="smallTitle">당신의 파트너는 지금?</div>
          <div className="detail">(Your partner..)</div>
        </div>
        <button className="reloadBtn" onClick={onClickReload}>
          RELOAD <img className="reloadImg" src={reload} alt="reload" />
        </button>
      </div>
      <div className="checkinContainer">
        <div className="checkinText">
          {hasArrived ? (
            <>
              파티에 도착해 있어요.<br />
              (already arrived at the party.)
            </>
          ) : (
            <>
              아직 파티에 도착하지 않았어요.ㅠㅠ<br />
              (hasn't arrived at the party yet.)
            </>
          )}
        </div>
      </div>

      <div className="titleContainer">
        <div>
          <div className="smallTitle">행운의 번호를 드릴게요.</div>
          <div className="detail">(Your prize code is..)</div>
        </div>
      </div>

      <div className='numberContainer'>
      <div className='numberBorder'>
          <div className='number'>
            {Math.floor(prizeNumber / 100)}
          </div>
        </div>
        <div className='numberBorder'>
          <div className='number'>
            {Math.floor((prizeNumber %100) /10)}
          </div>
        </div>
        <div className='numberBorder'>
          <div className='number'>
            {prizeNumber % 10}
          </div>
        </div>
      </div>
    </div>
  );
}

function App() {
  return (
    <Router>
      <div className="App">
        <div className='centered'>
          <Routes>
            <Route exact path="/" element={<FirstPage />} />
            <Route path="/phone" element={<PhoneNumPage />} />
            <Route path="/result" element={<ResultPage />} />
          </Routes>

        </div>
      </div>
    </Router>
  );
}
export default App;
