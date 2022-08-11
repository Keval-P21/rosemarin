const path = require('path');

const fileMiddleware = async (req, res, next) => {
  try {
    if (req.files) {
      const file = req.files.file;
      const ext = path.extname(file.name);
      const newName = file.md5 + ext;
      file.mv('./images/' + newName);
      req.image = path.relative('/', './images/') + '/' + newName;
      next();
    } else {
      next();
    }
  } catch (err) {
    console.log(err);
    res.status(500).send('some error with file');
  }
};

module.exports = fileMiddleware;
