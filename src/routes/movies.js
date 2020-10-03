const express = require('express');
const router =express.Router();
const movieControllers= require('../api/controllers/MovieController');



router.get('/:slug',movieControllers.show);

// nếu ghi slug (có thể dùng từ khác) thì khi vào controller thì param.slug


module.exports = router;
