const { Transaction } = require('sequelize');
const { sequelize } = require('../sequelize');

/**
 * @typedef {(transaction: Transaction) => Promise<any>} RunWithTransactionCallback
 */

/**
 * @param {RunWithTransactionCallback} callback
 * @returns {any}
 */
const runWithTransaction = async (callback) => {
  const transaction = await sequelize.transaction();

  let callbackResult;

  try {
    callbackResult = await callback(transaction);
  } catch (e) {
    await transaction.rollback();

    throw e;
  }

  await transaction.commit();

  return callbackResult;
};

module.exports = { runWithTransaction };
