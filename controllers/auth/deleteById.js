const { HttpError } = require('../../helpers');
const { User } = require('../../models');
const cloudinary = require('cloudinary');

const deleteById = async (req, res) => {
  const { id, avatarPublicId } = req.user;

  if (avatarPublicId) {
    // -> Delete img on Cloudinary
    await cloudinary.uploader.destroy(avatarPublicId);
  }

  // -> Delete user from DB collection
  const result = await User.findByIdAndRemove(id);

  if (!result) {
    throw HttpError(404, 'Not found');
  }

  res.json({
    message: 'Delete success',
  });
};

module.exports = deleteById;
