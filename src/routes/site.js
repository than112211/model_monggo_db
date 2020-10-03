const express = require('express');
const router =express.Router();
const siteControllers= require('../api/controllers/SiteController');



router.get('/',siteControllers.index);



module.exports = router;
