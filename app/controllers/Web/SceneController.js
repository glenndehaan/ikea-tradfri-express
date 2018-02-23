const baseController = require('./BaseController');
const tradfri = require('../../helpers/modules/Tradfri');
const config = require('../../config/config');

class SceneController extends baseController {
    /**
     * Starts a scene
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
            }
        }

        res.redirect('/');
    }
}

module.exports = new SceneController();
