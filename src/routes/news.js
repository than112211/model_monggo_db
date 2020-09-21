const express = require('express');
const router =express.Router();
const newControllers= require('../app/controllers/NewsController');

// :chitiet la cac trang chi tiet dang sau
router.use('/:chitiet',newControllers.show);

router.use('/',newControllers.index);



module.exports = router;
