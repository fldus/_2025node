const express = require('express');
const Travel = require('../models/Travel');
const router = express.Router();

// 목록 보기
router.get('/', async (req, res) => {
  try{
    const travelList = await Travel.findAll({ attributes: ['id', 'name']});
    res.render('travel', { travelList });
  }catch(err){
    console.error('데이터베이스 쿼리 실패', err);
    res.status(500).send('Internal Server Error');
  }
});

// 목록 추가하는 페이지
router.get('/add', (req, res) =>{
  res.render('addTravel');
})

// 추가
router.post('/', async (req, res) => {
  // const name =  req.body.name;
  const {name} = req.body;
  try{
    await Travel.create({name});
    res.redirect('/travel');
  }catch(err){
    console.error('데이터페이스 쿼리 실패', err);
    res.status(500).send('Internal Server Error');
  }
});

// 목록 내용(자세히 보기)
router.get('/:id', async (req, res) =>{
  const travelID = req.params.id;
  try{
    const travel = await Travel.findByPk(travelID);

    if(!travel){
      res.status(404).send('여행지를 찾을 수 없습니다.');
      return;
    }
    res.render('travelDetail', {travel});
  }catch(err){
    console.error('DB 쿼리 실패', err);
    res.status(500).send('내부 서버 에러');
  }
});

// 수정하는 페이지
router.get('/:id/edit', async (req, res) =>{
  const travelID = req.params.id;
  try{
    const travel = await Travel.findByPk(travelID);

    if(!travel){
      res.status(404).send('여행지를 찾을 수 없습니다.');
      return;
    }

    res.render('editTravel', {travel});
  }catch(err){
    console.error('DB 쿼리 실패', err);
    res.status(500).send('내부 서버 에러');
  }
});

// 수정
router.put('/:id', async (req, res) =>{
  const travelID = req.params.id;
  const {name} = req.body;
  try{
    const travel = await Travel.findByPk(travelID);
    if(!travel){
      res.status(404).send('여행지를 찾을 수 없습니다.');
      return;
    }
    await travel.update({name});
    res.render('updateSuccess');
  }catch(err){
    console.error('DB 쿼리 실패', err);
    res.status(500).send('내부 서버 에러');
  }
});

// 삭제
router.delete('/:id', async (req, res) =>{
  const travelID = req.params.id;
  try{
    const travel = await Travel.findByPk(travelID);
    if(!travel){
      res.status(404).send('여행지를 찾을 수 없습니다.');
      return;
    }
    await travel.destroy();
    res.render('deleteSuccess');
  }catch(err){
    console.error('DB 쿼리 실패', err);
    res.status(500).send('내부 서버 에러');
  }
});

module.exports = router;