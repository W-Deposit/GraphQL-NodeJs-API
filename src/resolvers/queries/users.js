module.exports = async (_, {}, { models }) => {
  return await models.user.find();
};
