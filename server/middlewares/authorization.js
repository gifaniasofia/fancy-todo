const { Todo } = require('../models/');

const authorize = (req, res, next) => {
  const id = +req.params.id;

  Todo.findOne({
    where: { id: id }
  })
    .then(todo => {
      if (!todo) throw { name: "CustomError", msg: 'Task Not Found', status: 404 };

      if (todo.userId === req.decoded.id) {
        next();
      } else {
        throw { name: "CustomError", msg: 'You are not authorized to access', status: 403 };
      }
    })
    .catch(err => {
      next(err);
    })
}

module.exports = authorize;