const url = require('url');
class ApiResponse {

    success(data=false) {
        if(!data) {
            data= "success"
        }
        return (res, meta=null, status=200) => {
            res.status(status);
            res.setHeader('Content-Type', 'application/json');
            res.json({
                result: data,
                status,
                meta
            })    
        }
    }

    error(error) {
        return (res, status=400) => {
            res.status(status);
            res.setHeader('Content-Type', 'application/json');

            res.json({
                error,
                status
            }) 
        }
    }

    async redirect(res, pathname) {
        await res.redirect(url.format({
            pathname,
        }));
    }
}

module.exports = ApiResponse;