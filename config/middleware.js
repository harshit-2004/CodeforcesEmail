const flash = require('connect-flash');

module.exports.setFlash = function(req, res, next) {
    res.locals.flash = {
        'success': req.flash('success'),
        'error': req.flash('error')
    };
    next();
};
