const { usersRepository } = require('../repositories/users.repository');
const { generateJwtToken } = require('../utils/jwt.utils');

const usersService = {
  /**
   *
   * @param {import('../dto/create-user.dto').CreateUserDto} createUserDto
   * @returns {Promise<CreateUserResponseDto>}
   */
  create: async (createUserDto) => {
    const user = await usersRepository.create(createUserDto);

    const token = await generateJwtToken(user);

    return {
      token,
      status: 1,
    };
  },
};

module.exports = {
  usersService,
};
