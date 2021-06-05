const express = require('express');
const router =express.Router();
const theaterControllers= require('../api/controllers/TheaterController');


router.get('/all',theaterControllers.index); // lay tất cả rạp chiếu
router.post('/create',theaterControllers.create); 
router.delete('/:id',theaterControllers.delete);
router.put('/:id',theaterControllers.update);
router.get('/:slug',theaterControllers.show);



module.exports = router;
