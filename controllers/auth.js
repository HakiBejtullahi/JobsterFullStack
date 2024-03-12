const User = require('../models/User');
const { StatusCodes } = require('http-status-codes');
const { BadRequestError, UnAuthError } = require('../errors');

const register = async (req, res) => {
  const user = await User.create({ ...req.body });
  token = user.createJWT();

  res.status(StatusCodes.CREATED).json({
    user: {
      email: user.email,
      name: user.name,
      lastMame: user.lastName,
      location: user.location,
      token,
    },
  });
};

const login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    throw new BadRequestError(
      'Please provide an email and/or password to login.'
    );
  }

  const user = await User.findOne({ email });

  if (!user) {
    throw new UnAuthError('Please provide a valid email.');
  }

  const isPasswordCorrect = await user.comparePassword(password);
  if (!isPasswordCorrect) {
    throw new UnAuthError('Please provide a valid password.');
  }

  const token = user.createJWT();

  res.status(StatusCodes.OK).json({
    user: {
      email: user.email,
      name: user.name,
      lastName: user.lastName,
      location: user.location,
      token,
    },
  });
};

const updateUser = async (req, res) => {
  const { email, name, lastName, location } = req.body;
  if (!email || !name || !lastName || !location) {
    throw new BadRequestError('Please provide all values.');
  }
  const user = await User.findOneAndUpdate({ _id: req.user.userId }, req.body, {
    runValidators: true,
    new: true,
  });

  const token = user.createJWT();
  res.status(StatusCodes.OK).json({
    user: {
      email: user.email,
      name: user.name,
      lastName: user.lastName,
      location: user.location,
      token,
    },
  });
};
module.exports = { register, login, updateUser };
