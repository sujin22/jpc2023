import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Link, Routes, Route, BrowserRouter } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';

import logo from './logo.png';
import reload from './reload.png';
import './App.css';
import firebase from 'firebase/compat/app';
import 'firebase/compat/database';

const firebaseConfig = {
  databaseURL: 'https://jpc2023-655f5-default-rtdb.asia-southeast1.firebasedatabase.app',
  apiKey: "undefined",
  authDomain: "jpc2023-655f5.firebaseapp.com",
  projectId: "jpc2023-655f5",
  storageBucket: "jpc2023-655f5.appspot.com",
  messagingSenderId: "229390947684",
  appId: "1:229390947684:web:f994c3b3c94cf4deb5d671",
  measurementId: "G-MP139WXRGD"
};
firebase.initializeApp(firebaseConfig);

const database = firebase.database();

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

function updateCheckInStatus(phone) {
  const userDataRef = database.ref().orderByChild('PHONE').equalTo(phone);

  return userDataRef.once('value')
    .then((snapshot) => {
      const data = snapshot.val();
      if (data) {
        const recordKey = Object.keys(data)[0];
        const userDataRef = database.ref(`${recordKey}/CHECKIN`);
        return userDataRef.set(1);
      } else {
        throw new Error('Data not found');
      }
    })
    .then(() => {
      console.log('Check-in status updated successfully');
    });
}

function PhoneNumPage() {
  const [showComponent, setShowComponent] = useState(false);
  const [popupVisible, setPopupVisible] = useState(false);
  // const history = createBrowserHistory();
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setShowComponent(true);
  }, []);

  const onBtnClick = () => {
    const phoneInput = document.getElementById('inputPhone');
    const phone = phoneInput.value.substring(1);

    updateCheckInStatus(phone)
      .then(() => {
        // history.push('/result');
        navigate('/result', { state: { phone } }); // navigate 함수로 state와 함께 전달

      })
      .catch((error) => {
        console.log('Error:', error);
        setPopupVisible(true);
      });
  };

  return (
    <div className={`parent ${showComponent ? 'fade-in' : ''}`}>
      <img className="logo" src={logo} alt="로고 이미지" />
      <div className="detailText"># JPC를 함께 경험할 파트너를 연결해 드릴게요</div>
      <div className="titleText">전화번호를 알려주세요.</div>

      <input type="text" placeholder="01012345678" className="inputPhone" id="inputPhone" />
      <div className='errorText' style={{ display: popupVisible ? 'block' : 'none' }}>
        등록되지 않은 전화번호입니다. 다시 한 번 확인해주세요.</div>
      <div className="nextButton" onClick={onBtnClick}>
        파트너 찾기
      </div>
    </div>
  );

}

//firebase
function getUserData(phone) {
  return database
    .ref()
    .orderByChild('PHONE')
    .equalTo(phone)
    .once('value')
    .then((snapshot) => {
      const data = snapshot.val();
      if (data) {
        // 데이터가 존재하는 경우 해당 필드 값을 가져옴
        const record = Object.values(data)[0];
        const prizeCode = record['PRIZE CODE'];
        const partner = record['PARTNER'];
        const checkIn = record['CHECKIN'];
        const myHint = record['MYHINT'];

        const userData = {
          prizeCode: prizeCode,
          partner: partner,
          checkIn: checkIn,
          myHint: myHint
        };

        return userData;
      } else {
        throw new Error('Data not found');
      }
    })
    .catch((error) => {
      console.log('Error:', error);
      throw error;
    });
}
function getUserCheckInStatus(partner) {
  return database
    .ref()
    .orderByChild('MYHINT')
    .equalTo(partner)
    .once('value')
    .then((snapshot) => {
      const data = snapshot.val();
      if (data) {
        const record = Object.values(data)[0];
        const checkIn = record['CHECKIN']
        console.log('partner: ', partner);
        console.log('Check-in Status:', checkIn);
        return checkIn;
      } else {
        console.log('Data not found');
        return null;
      }
    })
    .catch((error) => {
      console.log('Error:', error);
      return null;
    });
}

function ResultPage() {
  const [showComponent, setShowComponent] = useState(false);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setShowComponent(true);

  }, []);

  const prizeNumber = 0;
  const location = useLocation();
  const phone = location.state?.phone;
  getUserData(phone)
    .then((userData) => {
      console.log(userData);
      // userData를 원하는 방식으로 활용
      //파트너힌트
      const partnerNameDiv = document.getElementById('partnerName');
      partnerNameDiv.textContent = userData.partner;
      //체크인
      getUserCheckInStatus(userData.partner)
        .then((checkIn) => {
          if (checkIn !== null) {
            // checkIn 값이 존재하는 경우
            console.log('Check-in Status:', checkIn);
            // 여기서 원하는 작업 수행
            setHasArrived(checkIn == 1 ? true : false);
          } else {
            // checkIn 값이 null인 경우 (데이터가 없는 경우)
            console.log('Data not found');
            // 여기서 원하는 작업 수행
          }
        })
        .catch((error) => {
          console.log('Error', error);
        });

      //내 힌트
      const myHintDiv = document.getElementById('myHint');
      myHintDiv.textContent = userData.myHint;
      //경품코드
      const prizeNumber = userData.prizeCode;
      const numbox1 = document.getElementById('numbox1');
      const numbox2 = document.getElementById('numbox2');
      const numbox3 = document.getElementById('numbox3');

      numbox1.textContent = Math.floor(prizeNumber / 100);
      numbox2.textContent = Math.floor((prizeNumber % 100) / 10);
      numbox3.textContent = prizeNumber % 10;
    })
    .catch((error) => {
      console.log('Error:', error);
      // 에러 처리
    });

  const [hasArrived, setHasArrived] = useState(false);
  const onClickReload = () => {

    const partnerNameDiv = document.getElementById('partnerName');

    //체크인 정보 새로 받아오기
    getUserCheckInStatus(partnerNameDiv.textContent)
      .then((checkIn) => {
        if (checkIn !== null) {
          // checkIn 값이 존재하는 경우
          console.log('Check-in Status:', checkIn);
          // 여기서 원하는 작업 수행
          setHasArrived(checkIn == 1 ? true : false);
        } else {
          // checkIn 값이 null인 경우 (데이터가 없는 경우)
          console.log('Data not found');
          // 여기서 원하는 작업 수행
        }
      })
      .catch((error) => {
        console.log('Error', error);
      });
  };

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
          <div id="partnerName" className="partnerName">술톤개구리</div>
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
          <div className="smallTitle">내가 입력한 내 힌트는?</div>
          <div className="detail">(My hint I entered is ..)</div>
        </div>
      </div>
      <div className="myhintContainer">
        <div id="myHint" className="myhintText">
          춘식이 엄마
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
          <div id='numbox1' className='number'>
            {Math.floor(prizeNumber / 100)}
          </div>
        </div>
        <div className='numberBorder'>
          <div id='numbox2' className='number'>
            {Math.floor((prizeNumber % 100) / 10)}
          </div>
        </div>
        <div className='numberBorder'>
          <div id='numbox3' className='number'>
            {prizeNumber % 10}
          </div>
        </div>
      </div>
    </div>
  );
}

function App() {
  return (
    <BrowserRouter basename={process.env.PUBLIC_URL}>
      <div className="App">
        <div className='centered'>
          <Routes>
            <Route exact path="/" element={<FirstPage />} />
            <Route path="/phone" element={<PhoneNumPage />} />
            <Route path="/result" element={<ResultPage />} />
          </Routes>

        </div>
      </div>
    </BrowserRouter>
  );
}
export default App;
