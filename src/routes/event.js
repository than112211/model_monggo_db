const express = require('express');
const router =express.Router();
const eventControllers= require('../api/controllers/EventController');


router.get('/all',eventControllers.index);
router.post('/create',eventControllers.create); // để lưu dữ liệu khi đăng phim event mới
router.delete('/:id',eventControllers.delete);
router.put('/:id',eventControllers.update);
router.get('/:slug',eventControllers.show);


module.exports = router;
