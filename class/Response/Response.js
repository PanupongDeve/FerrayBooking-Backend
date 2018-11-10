const url = require('url');
class Response {
    render(res, pathname, data) {
        res.set('Content-Type', 'text/html');
        data ? res.render(pathname, data) : res.render(pathname);
    }

    redirect(res, pathname) {
        res.set('Content-Type', 'text/html');
        res.redirect(url.format({
            pathname,
        }));
    }
}

module.exports = Response;