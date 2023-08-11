const jwt = require('jsonwebtoken');
const { User } = require('../../models');

const { SECRET_KEY, FRONTEND_URL } = process.env;

const googleAuth = async (req, res) => {
  const { _id: id } = req.user;
  const payload = {
    id,
  };

  const token = jwt.sign(payload, SECRET_KEY, { expiresIn: '23h' });

  const user = await User.findByIdAndUpdate(id, { token });

  console.log(user);

  return res.redirect(`${FRONTEND_URL}?accessToken=${token}`);
};

module.exports = googleAuth;
