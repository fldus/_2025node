const express = require('express');
const path = require('path');

const app = express();

travelList = ['뉴욕', '파리', '서울', '도쿄'];

app.set('view engine', 'ejs');
// __dirname : 현재 파일이 속한 절대경로
// path.join을 사용하면 운영체제에 맞춰 경로 구분자(/, \) 자동으로 정해줌
app.set('views', path.join(__dirname, 'views'));

app.get('/', (req, res) => {
    res.render('home');
})

app.get('/travel', (req, res) => {
    res.render('travel', {travelList})
})

// 서버를 지정된 포트에서 실행합니다.
app.listen(3001, () => {
    console.log('서버가 http://localhost:3001에서 실행 중입니다.');
  });
  