const { ApolloError } = require("apollo-server");

module.exports = async (_, { input }, { models }) => {
  try {
    createUser = await models.user.create(input);
    return createUser;
  } catch (e) {
    throw new ApolloError(e);
  }
};
