const express = require('express');
const router =express.Router();
const movieControllers= require('../app/controllers/MovieController');


router.get('/stored',movieControllers.stored); // lưu các phim đã đăng
router.get('/create',movieControllers.create);
router.post('/store',movieControllers.store); // để lưu dữ liệu khi đăng phim mới
router.get('/:id/edit',movieControllers.edit);
router.delete('/:id',movieControllers.delete);

router.put('/:id',movieControllers.update);

router.get('/:slug',movieControllers.show);

// nếu ghi slug (có thể dùng từ khác) thì khi vào controller thì param.slug


module.exports = router;
