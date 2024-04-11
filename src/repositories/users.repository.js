const bcrypt = require('bcrypt');
const { User } = require('../models/user.model');
const { USERS_PASSWORD_ROUNDS } = require('../constants/users.constants');

const usersRepository = {
  /**
   *
   * @param {import('../dto/create-user.dto').CreateUserDto} createUserDto
   */
  create: async ({ name, email, password }) => {
    const hashedPassword = await bcrypt.hash(password, USERS_PASSWORD_ROUNDS);

    return User.create({
      name,
      email: email.toLowerCase(),
      password: hashedPassword,
    });
  },

  /**
   * @param {number} id
   */
  getById: (id) =>
    User.findOne({
      where: {
        id,
      },
    }),

  /**
   * @param {string} email
   */
  getByEmail: (email) =>
    User.findOne({
      where: {
        email: email.toLowerCase(),
      },
    }),
};

module.exports = { usersRepository };
