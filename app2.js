const express = require('express');
const path = require('path');
const methodOverride = require('method-override');
const travelRoutes = require('./routes/travel');

const port = 3001;
const app = express();

travelList = ['뉴욕', '파리', '서울', '도쿄'];

app.use(methodOverride('_method'))
app.use(express.json());
app.use(express.urlencoded({extended : true}))
app.use('/travel', travelRoutes);

app.set('view engine', 'ejs');
// __dirname : 현재 파일이 속한 절대경로
// path.join을 사용하면 운영체제에 맞춰 경로 구분자(/, \) 자동으로 정해줌
app.set('views', path.join(__dirname, 'views'));

app.get('/', (req, res) => {
  res.render('home');
});

// use : 모든 method에 대해, 경로가 없으면? : 모든 경로에 대해
app.use((req, res) => {
  res.status(404).send('404 not found');
})

// 서버를 지정된 포트에서 실행합니다.
app.listen(port, () => {
  console.log(`서버가 http://localhost:${port}에서 실행 중입니다.`);
});
