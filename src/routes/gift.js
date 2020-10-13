const express = require('express');
const router =express.Router();
const giftControllers= require('../api/controllers/GiftController');


router.get('/all',giftControllers.index);
router.post('/create',giftControllers.create); // để lưu dữ liệu khi đăng phim gift mới
router.delete('/:id',giftControllers.delete);
router.put('/:id',giftControllers.update);
router.get('/:slug',giftControllers.show);


module.exports = router;