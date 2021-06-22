const express = require('express');
const router =express.Router();
const ticketControllers= require('../api/controllers/TicketController');

router.get('/history',ticketControllers.show); // xem lịch sử vé đã mua
router.get('/result',ticketControllers.resultpayment);
router.post('/paymentMoMo/:id',ticketControllers.paymentMoMo); // thanh toan vi momo
router.post('/repaymentMoMo',ticketControllers.repaymentMoMo); // thanh toan vi momo
router.post('/delete/:id',ticketControllers.delete); // thanh toan vi momo
router.get('/checkunpaid',ticketControllers.checkUnpaid); // thanh toan vi momo

module.exports = router;
