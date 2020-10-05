const express = require('express');
const router =express.Router();
const adminControllers= require('../api/controllers/AdminController');



router.post('/create',adminControllers.create); // để lưu dữ liệu khi đăng phim mới
router.delete('/:id',adminControllers.delete);
router.put('/:id',adminControllers.update);



module.exports = router;
