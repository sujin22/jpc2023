const fs = require('fs');
const path = require('path');

const appFilePath = 'src/App.js'; // App.js 파일 경로

let appCode = fs.readFileSync(appFilePath, 'utf-8'); // App.js 파일 읽기

// Firebase API 키로 대체
const firebaseAPIKey = process.env.FIREBASE_API_KEY;
appCode = appCode.replace('__FIREBASE_API_KEY__', firebaseAPIKey);

// 대체된 내용을 다시 파일에 쓰기
fs.writeFileSync(appFilePath, appCode, 'utf-8');
