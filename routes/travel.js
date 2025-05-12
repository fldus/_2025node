const express = require('express');
const travelController = require('../controllers/travelController');
const router = express.Router();

router.get('/', travelController.getTravelList);

router.get('/add', travelController.getAddTravelForm);

router.post('/', travelController.addTravel);

router.get('/:id', travelController.getTravelDetail);

router.get('/:id/edit', travelController.getEditTravelForm);

router.put('/:id', travelController.updateTravel);

router.delete('/:id', travelController.deleteTravel);

module.exports = router;