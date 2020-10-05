const express = require('express');
const router =express.Router();
const eventControllers= require('../api/controllers/EventController');



router.post('/create',eventControllers.create); // để lưu dữ liệu khi đăng phim event mới
router.delete('/:id',eventControllers.delete);
router.put('/:id',eventControllers.update);
router.get('/:slug',eventControllers.show);
router.get('/all',eventControllers.index);


module.exports = router;
