const { Router } = require('express');
const router = Router();

const {
    renderRegisterForm,
    registerUser,
    renderLogInForm,
    logIn,
    logOut
} = require('../controllers/users.controller');

const { isAuthenticated } = require('../middlewares/auth');

router.get('/register', renderRegisterForm);
router.post('/register', registerUser)

router.get('/login', renderLogInForm);
router.post('/login', logIn);

router.get('/logout', isAuthenticated, logOut);

module.exports = router
