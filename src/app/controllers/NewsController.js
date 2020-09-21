class NewsControllers {
    // GET /news
    index(req, res) {
        // console.log(req.query.q);
        res.render('news');
    // get /new/chitiet
    }
    show(req,res) {
        res.render('new detail')
    }
}


module.exports = new NewsControllers;