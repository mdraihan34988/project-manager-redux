const auth = require("json-server-auth");
const jsonServer = require("json-server");

const server = jsonServer.create();
const router = jsonServer.router("db.json");
router.render = (req, res) => {
    const path = req.path;
    const method = req.method;

    if (
        path.includes("/users") &&
        (method === "GET")
    ) {
        res.locals.data = res.locals.data.map((user) => {
            return {
                id : user.id,
                email : user.email,
                name : user.name
            }
        })
    }

    res.json(res.locals.data);
};
const middlewares = jsonServer.defaults();
const port = process.env.PORT || 9000;

// Bind the router db to the app
server.db = router.db;

server.use(middlewares);

const rules = auth.rewriter({
    users: 640,
    teams: 660,
    projects: 660,
});

server.use(rules);
server.use(auth);
server.use(router);

server.listen(port);
