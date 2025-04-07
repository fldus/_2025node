const express = require("express");
const mysql = require('mysql2');
const dotenv = require('dotenv');

dotenv.config();
const router = express.Router();

// .env로 민감한 데이터를 이동
const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME
});

db.connect((err) => {
  if (err) {
    console.err("MySQL 연결 실패 : ", err);
    return;
  }
  console.log("MySQL에 연결되었습니다.");
});

router.get("/", (req, res) => {
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

router.post("/", (req, res) => {
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

router.get('/add', (req, res) =>{
  res.render('addTravel');
})

router.get('/:id', (req, res) =>{
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

router.put('/:id', (req, res) =>{
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

router.delete('/:id', (req, res) =>{
  const travelID = req.params.id;
  const _query = 'DELETE FROM travellist WHERE id = ?';
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
    res.render('deleteSuccess');
  });
});

router.get('/:id/edit', (req, res) =>{
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
    res.render('editTravel', {travel});
  });
});

module.exports = router;