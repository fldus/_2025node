const express = require("express");
const path = require("path");
const mysql = require("mysql2");
const dotenv = require('dotenv');

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
  const query = "SELECT id, name FROM travellist";
  db.query(query, (err, results) =>{
    if(err){
      console.error('데이터페이스 쿼리 실패');
      res.status(500).send('Internal Server Error');
      return;
    }
    const travelList = results;
    res.render("travel", { travelList });
  });
});

// 서버를 지정된 포트에서 실행합니다.
app.listen(3001, () => {
  console.log("서버가 http://localhost:3001에서 실행 중입니다.");
});
