const express = require('express');
const router =express.Router();
const ticketControllers= require('../api/controllers/TicketController');


router.get('/history',ticketControllers.show); // xem lịch sử vé đã mua
router.get('/paymentMoMo/resultpayment',ticketControllers.resultpayment);
router.post('/paymentMoMo/:id',ticketControllers.paymentMoMo); // thanh toan vi momo
router.post('/:id/create',ticketControllers.create); // tạo vé dựa vào id movietime


module.exports = router;
