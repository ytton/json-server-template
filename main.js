const jsonServer = require('json-server');
const server = jsonServer.create();
const router = jsonServer.router('./src/db/db.json');
const middlewares = jsonServer.defaults();
const auth = require('json-server-auth');
const myAuth = require('./src/middleware/auth');
const routerConfig = require('./router.config');
// Set default middlewares (logger, static, cors and no-cache)
server.use(middlewares);
server.use(jsonServer.bodyParser)
server.db = router.db;


const rules = auth.rewriter(routerConfig);

server.use(myAuth);
server.use(rules);
server.use(auth);


server.use(router);
server.listen(3000, () => {
  console.log('JSON Server is running');
});
