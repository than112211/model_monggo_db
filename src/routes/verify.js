const express = require('express');
const router =express.Router();
const verifyControllers= require('../api/controllers/AuthController');



router.get('/email',verifyControllers.index);



module.exports = router;
