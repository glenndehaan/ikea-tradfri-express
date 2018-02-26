const baseController = require('./BaseController');
const config = require('../../config/config');

class IndexController extends baseController {
    constructor() {
        super();
    }

    /**
     * Action for the default api route
     *
     * @param req
     * @param res
     */
    indexAction(req, res) {
        this.jsonResponse(res, 200, { 'message': 'Default API route!' });
    }

    /**
     * Action for the methods route
     *
     * @param req
     * @param res
     */
    methodsAction(req, res) {
        const routes = [];
        const scenes = Object.keys(config.tradfri.scenes);

        for(let route = 0; route < scenes.length; route++) {
            routes.push(`/api/scene/${scenes[route]}`);
        }

        routes.push('/api/disco');

        this.jsonResponse(res, 200, { 'routes': routes });
    }
}

module.exports = new IndexController();
