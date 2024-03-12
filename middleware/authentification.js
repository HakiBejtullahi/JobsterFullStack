const user = require('../models/User');
const jwt = require('jsonwebtoken');
const { UnAuthError } = require('../errors/');
require('dotenv').config();

const authMiddleware = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer')) {
    throw new UnAuthError('Must be logged in to procede further');
  }

  const token = authHeader.split(' ')[1];

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    const testUser = payload.userId === '65eddf68391a9301a009226a';

    req.user = { userId: payload.userId, name: payload.name, testUser };
    next();
  } catch (error) {
    throw new UnAuthError(
      'Authentication error. Must be logged in to procede.'
    );
  }
};

module.exports = authMiddleware;
