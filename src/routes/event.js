const express = require('express');
const router =express.Router();
const eventControllers= require('../api/controllers/EventController');
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
router.get('/all',eventControllers.index); // lấy tất cả event
router.post('/create',upload.array('image',2),eventControllers.create); // tạo event
router.delete('/:id',eventControllers.delete); // xóa event truyền id vào
router.put('/:id',upload.array('image',2),eventControllers.update); //update truyền id vào
router.get('/:slug',eventControllers.show); // lấy 1 event từ slug


module.exports = router;
