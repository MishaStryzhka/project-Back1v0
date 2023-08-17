const { HttpError } = require('../../helpers');
const { User } = require('../../models');

const deleteById = async (req, res) => {
  const { id } = req.user;
  const result = await User.findByIdAndRemove(id);

  if (!result) {
    throw HttpError(404, 'Not found');
  }

  res.json({
    message: 'Delete success',
  });
};

module.exports = deleteById;
