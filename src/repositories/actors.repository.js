const { Op, Transaction } = require('sequelize');
const { Actor } = require('../models/actor.model');

const actorsRepository = {
  /**
   * @param {Array<string>} actorNames - actor names to create
   * @param {Transaction} [transaction] - Sequelize transaction
   * @returns {Promise<Actor[]>}
   * */
  createMany: (actorNames, transaction) => {
    if (!actorNames.length) {
      return [];
    }

    const stars = actorNames.map((name) => ({ name }));

    return Actor.bulkCreate(stars, { transaction });
  },

  /**
   *
   * @param {Array<string>} names
   * @param {Transaction} transaction
   * @returns {Promise<import('../models/actor.model').ActorModel[]>}
   */
  getByNames: (names, transaction) =>
    Actor.findAll({
      where: {
        name: {
          [Op.in]: names,
        },
      },
      transaction,
    }),

  /**
   * @param {string[]} names
   * @param {Transaction} transaction
   */
  findOrCreateByNames: async (names, transaction) => {
    const foundActors = await Actor.findAll({
      where: {
        name: {
          [Op.in]: names,
        },
      },
      transaction,
    });

    const actorsToCreate = names.filter(
      (name) => !foundActors.find((actor) => actor.name === name),
    );

    const createdActors = await Actor.bulkCreate(
      actorsToCreate.map((name) => ({ name })),
      { transaction },
    );

    return [...foundActors, ...createdActors];
  },
};

module.exports = { actorsRepository };
