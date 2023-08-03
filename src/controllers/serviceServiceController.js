exports.index = (req, res) => {
   res.render('service.ejs')
};

exports.index = function(req, res) {
   res.send('ola');
}