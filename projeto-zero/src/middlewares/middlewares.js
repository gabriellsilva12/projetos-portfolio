exports.middlewareGlobal = ( req, res, next ) => {
    res.locals.registerSuccess = req.flash('registerSuccess');
    res.locals.registerError = req.flash('registerError');
    
    res.locals.loginSuccess = req.flash('loginSuccess');
    res.locals.loginError = req.flash('loginError');

    res.locals.user = req.session.user;
    
    next();
};

exports.csrfToken = ( req, res, next ) => {
    res.locals.csrfToken = req.csrfToken();
    next();
};

exports.userSessionCheck = ( req, res, next ) => {
    if(!req.session.user) {
        req.flash('loginError', 'Você precisa está logado para fazer login!')
        req.session.save(function() {
            res.redirect('/login')
            return;
        })
        return;
    }

    next()
};