const express = require('express');
const router =express.Router();
const ticketControllers= require('../api/controllers/TicketController');



router.post('/create',ticketControllers.create); // để lưu dữ liệu khi đăng phim ticket mới
router.get('/history',ticketControllers.show);


module.exports = router;
