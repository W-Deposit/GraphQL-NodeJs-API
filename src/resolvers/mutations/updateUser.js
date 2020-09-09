const { ApolloError } = require("apollo-server");

module.exports = async (_, { id, input }, { models }) => {
  try {
    const userToUpdate = await models.user.findOne({ _id: id });

    if (!userToUpdate)
      throw new ApolloError(`Could not find user with id: '${id}'.`, 400);

    Object.keys(input).forEach((value) => {
      userToUpdate[value] = input[value];
    });

    const updateduser = await userToUpdate.save();

    return updateduser;
  } catch (e) {
    throw new ApolloError(e);
  }
};
