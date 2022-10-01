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

router.get('/users/register', renderRegisterForm);
router.post('/users/register', registerUser)

router.get('/users/login', renderLogInForm);
router.post('/users/login', logIn);

router.get('/users/logout', isAuthenticated, logOut);

module.exports = router
