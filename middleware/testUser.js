const { BadRequestError } = require('../errors');

const testUser = (req, res, next) => {
  if (req.user.testUser) {
    throw new BadRequestError(
      'This is a DEMO user. You cannot create delete or update any information.'
    );
  }
  next();
};

module.exports = testUser;
