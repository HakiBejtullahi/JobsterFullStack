//=============
//IMPORTS
//=============

const express = require('express');
const router = express.Router();
const authenticateUser = require('../middleware/authentification');
const testUser = require('../middleware/testUser');
const rateLimiter = require('express-rate-limit');

// ============
//  Request-Rate Limiter
// ============
const apiLimiter = rateLimiter({
  windowMS: 15 * 60 * 1000,
  max: 10,
  message: {
    msg: 'Too many requests from this IP, please try again after 15 minutes.',
  },
});
//=============
// Auth Controller import
//=============

const { register, login, updateUser } = require('../controllers/auth');

//============
// Routes
//============
router.post('/register', apiLimiter, register);
router.post('/login', apiLimiter, login);
router.patch('/updateUser', authenticateUser, testUser, updateUser);

//=============
//EXPORTS
//=============
module.exports = router;
