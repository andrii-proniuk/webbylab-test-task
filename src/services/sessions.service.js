const bcrypt = require('bcrypt');
const { BadRequestException } = require('../exceptions/bad-request.exception');
const { usersRepository } = require('../repositories/users.repository');
const { generateJwtToken } = require('../utils/jwt.utils');

const sessionsService = {
  /**
   * @param {import('../dto/create-session.dto').CreateSessionDto} createSessionDto
   */
  createSession: async (createSessionDto) => {
    const { email, password } = createSessionDto;

    const user = await usersRepository.getByEmail(email);

    if (!user) {
      throw new BadRequestException({
        message: 'email and/or password is not correct',
      });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      throw new BadRequestException({
        message: 'email and/or password is not correct',
      });
    }

    return generateJwtToken(user);
  },
};

module.exports = {
  sessionsService,
};
