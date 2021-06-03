const express = require('express');
const router =express.Router();
const multer  = require('multer');
const newsController = require('../api/controllers/NewsController');
const storage = multer.diskStorage({
    destination: function(req,file,cb){
        cb(null, './src/resoures/')
    },
    filename:function(req,file,cb){
        cb(null,file.originalname)
    }
})
const upload = multer({storage:storage})

router.post('/create',upload.single('image'),newsController.create); // để lưu dữ liệu khi đăng phim mới
router.get('/all/:number',newsController.all);

module.exports = router;
