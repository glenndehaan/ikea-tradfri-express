const baseController = require('./BaseController');
const tradfri = require('../../helpers/modules/Tradfri');
const config = require('../../config/config');

class SceneController extends baseController {
    constructor() {
        super();
    }

    /**
     * Action for the scene api route
     *
     * @param req
     * @param res
     */
    indexAction(req, res) {
        if(req.params.scene) {
            if(config.tradfri.scenes[req.params.scene]) {
                const scenes = config.tradfri.scenes[req.params.scene];
                for(let item = 0; item < scenes.length; item++) {
                    tradfri.sendLightCommand(scenes[item]);
                }
            } else {
                this.jsonResponse(res, 400, { 'message': 'Scene not found!' });
                return;
            }
        } else {
            this.jsonResponse(res, 200, { 'message': 'Incorrect param!' });
            return;
        }

        this.jsonResponse(res, 200, { 'message': 'Started scene!' });
    }
}

module.exports = new SceneController();
