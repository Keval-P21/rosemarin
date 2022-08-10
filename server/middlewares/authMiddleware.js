const User = require('../models/User');

const authMiddleware = async (req, res, next) => {
  try {
    const { sid } = req.session;
    if (sid) {
      req.user = await User.findByPk(sid);
      next();
    } else {
      res.status(403);
      res.send({ message: 'Not authorized' });
    }
  } catch (error) {
    console.log(error);
    res.status(401).end();
  }
};

module.exports = authMiddleware;
