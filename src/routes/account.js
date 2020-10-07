const express = require('express');
const router =express.Router();
const authControllers= require('../api/controllers/AuthController');



router.post('/login',authControllers.login);
router.post('/register',authControllers.register);
router.get('/verify',authControllers.index);
router.put('/:token',authControllers.update);





module.exports = router;
