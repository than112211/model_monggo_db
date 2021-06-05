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


router.post('/create',upload.single('image'),movieControllers.create); // tạo phim mới
router.get('/now',movieControllers.now); // lấy 6 phim đầu tiên đang chiếu
router.get('/comming',movieControllers.comming); // lấy 6 phim đầu tiên sắp chiếu
router.get('/playing',movieControllers.playing); // lấy tất cả phim đang chiếu // có phân trang ?page=&limit=
router.get('/soon',movieControllers.soon);// lấy tất cả phim sắp chiếu // có phân trang ?page=&limit=
router.delete('/:id',movieControllers.delete); // xóa phim
router.get('/:slug',movieControllers.show); // hiển thị 1 phim truyền vào slug

router.put('/:id/dangchieu',movieControllers.dangchieu); // chuyển phim sang trạng thái đang chiếu
router.put('/:id/sapchieu',movieControllers.sapchieu); // chuyển phim sang trạng thái sắp chiếu
router.put('/:id',upload.single('image'),movieControllers.update); // update phim

// nếu ghi slug (có thể dùng từ khác) thì khi vào controller thì param.slug


module.exports = router;
