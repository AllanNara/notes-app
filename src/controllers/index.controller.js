const renderIndex = (req, res) => {
    if(req.isAuthenticated()){
        return res.redirect('/notes');
    };
    res.redirect('/users/login')
};

const renderAbout = (req, res) => {
    res.render('about');
};

module.exports = {
    renderIndex,
    renderAbout,
};
