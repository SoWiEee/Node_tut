exports.getLogin = (req, res, next) => {
    console.log();
    
    res.render('auth/login', {
        path: '/login',
        pageTitle: 'Login',
        isAuthenticated: false
    })
};

exports.postLogin = (req, res, next) => {
    req.session.isLoggedIn = true;
    res.redirect('/');
};
