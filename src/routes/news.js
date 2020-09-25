const express = require('express');
const router =express.Router();
const newControllers= require('../app/controllers/NewsController');

// :chitiet la cac trang chi tiet dang sau
router.get('/:slug',newControllers.show);

router.get('/',newControllers.index);



module.exports = router;
