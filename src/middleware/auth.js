const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  if (['/register'].includes(req.url)) return next();
  if (['/login', '/signin'].includes(req.url)) return handleLogin(req, res, next);
  const { authorization } = req.headers;
  const db = req.app.db;
  let role = db.get('roles').find({ name: 'guest' }).value();
  if (authorization) {
    const [scheme, token] = authorization.split(' ');
    req.claims = jwt.decode(token);
    const user = db.get('users').find({ email: req.claims.email }).value();
    role = db.get('roles').find({ id: user.roleId }).value();
  }
  const prefix = role.perms[req.url.split('/')[1]];
  req.url = prefix ? '/' + prefix : '' + req.url;
  console.log('Get ' + req.url);
  next();
};

function handleLogin(req, res, next) {
  const { username, password, email, tel } = req.body;
  const db = req.app.db;
  const filter = {};
  username && (filter.username = username);
  email && (filter.email = email);
  tel && (filter.tel = tel);
  const user = db.get('users').find(filter).value();
  req.body = {
    email: user?.email ?? '_inner___error_____@error.error',
    password: password
  };
  next();
}
