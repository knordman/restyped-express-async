"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function AsyncRouter(app) {
    const createAsyncRoute = function (path, method, handler, middlewares) {
        const handlers = [...middlewares];
        handlers.push((req, res, next) => {
            handler(req, res)
                .then(result => {
                if (!res.headersSent) {
                    res.send(result);
                }
            })
                .catch(err => {
                next(err);
            });
        });
        const route = app[method.toLowerCase()].bind(app);
        route(path, handlers);
    };
    return {
        route: createAsyncRoute,
        use: app.use.bind(app),
        get: function (path, handler, ...middlewares) {
            return createAsyncRoute(path, 'GET', handler, middlewares);
        },
        post: function (path, handler, ...middlewares) {
            return createAsyncRoute(path, 'POST', handler, middlewares);
        },
        put: function (path, handler, ...middlewares) {
            return createAsyncRoute(path, 'PUT', handler, middlewares);
        },
        delete: function (path, handler, ...middlewares) {
            return createAsyncRoute(path, 'DELETE', handler, middlewares);
        },
        patch: function (path, handler, ...middlewares) {
            return createAsyncRoute(path, 'PATCH', handler, middlewares);
        },
        options: function (path, handler, ...middlewares) {
            return createAsyncRoute(path, 'OPTIONS', handler, middlewares);
        },
        head: function (path, handler, ...middlewares) {
            return createAsyncRoute(path, 'HEAD', handler, middlewares);
        }
    };
}
exports.default = AsyncRouter;
//# sourceMappingURL=index.js.map