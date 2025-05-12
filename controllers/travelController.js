const Travel = require('../models/Travel');

const travelController = {
  // 여행지 목록 보기
  getTravelList: async (req, res) => {
    try{
      const travelList = await Travel.findAll({ attributes: ['id', 'name']});
      res.render('travel', { travelList });
    }catch(err){
      console.error('데이터베이스 쿼리 실패', err);
      res.status(500).send('Internal Server Error');
    }
  },

  // 여행지 목록 추가 폼
  getAddTravelForm: (req, res) =>{
    res.render('addTravel');
  },

  // 여행지 추가
  addTravel: async (req, res) => {
    // const name =  req.body.name;
    const {name} = req.body;
    try{
      await Travel.create({name});
      res.redirect('/travel');
    }catch(err){
      console.error('데이터페이스 쿼리 실패', err);
      res.status(500).send('Internal Server Error');
    }
  },

  //  여행지 정보 보기(자세히 보기)
  getTravelDetail: async (req, res) =>{
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
  },

  // 수정 폼
  getEditTravelForm: async (req, res) =>{
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
  },

  // 수정
  updateTravel: async (req, res) =>{
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
  },

  // 삭제
  deleteTravel: async (req, res) =>{
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
  }
}

module.exports = travelController;