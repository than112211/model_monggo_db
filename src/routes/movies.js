const express = require('express');
const router =express.Router();
const movieControllers= require('../api/controllers/MovieController');
const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const multer = require('multer');
require('dotenv').config()

cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUD_KEY,
    api_secret: process.env.CLOUD_SECRET
  });

const storage =  new CloudinaryStorage({
    cloudinary:cloudinary,
    params: {
        folder: 'movies',
        public_id: (req, file) =>  file.originalname,
        resource_type: 'auto'
      },
    

})
// const storage = multer.diskStorage({
//     destination: function(req,file,cb){
//         cb(null, './src/resoures/')
//     },
//     filename:function(req,file,cb){
//         cb(null,file.originalname)
//     }
// })
const upload = multer({ storage: storage });
router.post('/create',upload.fields([
    {name:'image',maxCount:1},
    {name:'trailer',maxCount:1}
    ]),movieControllers.create); // tạo phim mới
    
    //statistic
router.get('/all/playing',movieControllers.numberPlaying);
router.get('/all/commingsoon',movieControllers.numberCommingSoon);
router.get('/all/total',movieControllers.numberAll);

//hompage
router.get('/now',movieControllers.now); // lấy 6 phim đầu tiên đang chiếu
router.get('/comming',movieControllers.comming); // lấy 6 phim đầu tiên sắp chiếu

//search
router.get('/search',movieControllers.search); // lấy 6 phim đầu tiên sắp chiếu

//admin page
router.get('/all',movieControllers.all); // lấy 6 phim đầu tiên đang chiếu
router.get('/name',movieControllers.getName); // lấy 6 phim đầu tiên đang chiếu

//movie page
router.get('/playing',movieControllers.playing); // lấy tất cả phim đang chiếu // có phân trang ?page=&limit=
router.get('/soon',movieControllers.soon);// lấy tất cả phim sắp chiếu // có phân trang ?page=&limit=



router.delete('/:id',movieControllers.delete); // xóa phim
router.get('/:slug',movieControllers.show); // hiển thị 1 phim truyền vào slug
router.put('/edit/:id',upload.fields([
    {name:'image',maxCount:1},
    {name:'trailer',maxCount:1}
    ]),movieControllers.update); // update phim

router.put('/:id/playing',movieControllers.dangchieu); // chuyển phim sang trạng thái đang chiếu
router.put('/:id/comming',movieControllers.sapchieu); // chuyển phim sang trạng thái sắp chiếu

// nếu ghi slug (có thể dùng từ khác) thì khi vào controller thì param.slug


module.exports = router;
