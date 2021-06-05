const express = require('express');
const router =express.Router();
const mvtControllers= require('../api/controllers/MVTController');


router.post('/:id/:theater',mvtControllers.create); // tạo suất chiếu
router.get('/:id/:theater/:date',mvtControllers.hour); // lấy giờ chiếu của phim dựa vào rạp + ngày
router.get('/:id/:theater',mvtControllers.date); // lấy ngày chiếu của phim dựa vào ngày
router.delete('/:id',mvtControllers.delete); // xóa
router.put('/:id',mvtControllers.update);
router.get('/:id',mvtControllers.show); // lấy suất chiếu theo phim


module.exports = router;
