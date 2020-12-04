const express = require('express');
const router =express.Router();
const ticketControllers= require('../api/controllers/TicketController');


router.get('/history',ticketControllers.show);
router.get('/paymentMoMo/resultpayment',ticketControllers.resultpayment);

router.post('/paymentMoMo/:id',ticketControllers.paymentMoMo); // thanh toan vi momo
router.post('/:id/create',ticketControllers.create); // để lưu dữ liệu khi đăng phim ticket mới

router.delete('/:id',ticketControllers.deleteTicket)


module.exports = router;
