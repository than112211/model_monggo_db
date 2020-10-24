const express = require('express');
const router =express.Router();
const movieControllers= require('../api/controllers/MovieController');
const multer  = require('multer')
const storage = multer.diskStorage({
    destination: function(req,file,cb){
        cb(null, './src/resoures/')
    },
    filename:function(req,file,cb){
        cb(null,file.originalname)
    }
})
const upload = multer({storage:storage})


router.post('/create',upload.single('image'),movieControllers.create); // để lưu dữ liệu khi đăng phim mới
router.delete('/:id',movieControllers.delete);
router.put('/:id',upload.single('image'),movieControllers.update);
router.get('/:slug',movieControllers.show);

// nếu ghi slug (có thể dùng từ khác) thì khi vào controller thì param.slug


module.exports = router;
