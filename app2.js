const express = require("express");
const path = require("path");
const mysql = require("mysql2");
const dotenv = require('dotenv');

const port = 3001;

dotenv.config();
const app = express();

// .env로 민감한 데이터를 이동
const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME
});

travelList = ["뉴욕", "파리", "서울", "도쿄"];

app.use(express.json());
app.use(express.urlencoded({extended : true}))

app.set("view engine", "ejs");
// __dirname : 현재 파일이 속한 절대경로
// path.join을 사용하면 운영체제에 맞춰 경로 구분자(/, \) 자동으로 정해줌
app.set("views", path.join(__dirname, "views"));

db.connect((err) => {
  if (err) {
    console.err("MySQL 연결 실패 : ", err);
    return;
  }
  console.log("MySQL에 연결되었습니다.");
});

app.get("/", (req, res) => {
  res.render("home");
});

app.get("/travel", (req, res) => {
  const _query = "SELECT id, name FROM travellist";
  db.query(_query, (err, results) =>{
    if(err){
      console.error('데이터페이스 쿼리 실패');
      res.status(500).send('Internal Server Error');
      return;
    }
    const travelList = results;
    res.render("travel", { travelList });
  });
});

app.get('/travel/:id', (req, res) =>{
  const travelID = req.params.id;
  const _query = 'SELECT * FROM travellist WHERE id = ?';
  db.query(_query, [travelID], (err, results) =>{
    if(err){
      console.error('DB 쿼리 실패', err);
      res.status(500).send('내부 서버 에러');
      return;
    }
    if(results.length === 0){
      res.status(404).send('여행지를 찾을 수 없습니다.');
      return;
    }
    const travel = results[0];
    res.render('travelDetail', {travel});
  });
});

app.post("/travel", (req, res) => {
  // const name =  req.body.name;
  const {name} = req.body;
  const _query = "INSERT INTO travellist (name) VALUES (?)";
  db.query(_query, [name], (err, results) =>{
    if(err){
      console.error('데이터페이스 쿼리 실패');
      res.status(500).send('Internal Server Error');
      return;
    }
    res.redirect("/travel");
  });
});

app.put('/travel/:id', (req, res) =>{
  const travelID = req.params.id;
  const {name} = req.body;
  const _query = 'UPDATE travellist SET name = ? WHERE id = ?';
  db.query(_query, [name, travelID], (err, results) =>{
    if(err){
      console.error('DB 쿼리 실패', err);
      res.status(500).send('내부 서버 에러');
      return;
    }
    if(results.length === 0){
      res.status(404).send('여행지를 찾을 수 없습니다.');
      return;
    }
    res.render('updateSuccess');
  });
});

app.get('/add-travel', (req, res) =>{
  res.render('addTravel');
})

// use : 모든 method에 대해, 경로가 없으면? : 모든 경로에 대해
app.use((req, res) => {
  res.status(404).send('404 not found');
})

// 서버를 지정된 포트에서 실행합니다.
app.listen(port, () => {
  console.log(`서버가 http://localhost:${port}에서 실행 중입니다.`);
});
