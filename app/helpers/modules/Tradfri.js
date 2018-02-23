const {exec} = require('child_process');
const config = require('../../config/config');

class Tradfri {
    constructor() {
        this.preSharedKey = false;
    }

    /**
     * Create the initial connection to the tradfri gateway
     */
    init() {
        console.log(`[TRADFRI] Connecting to Gateway and performing handshake...`);
        this.performHandshake((identity) => {
            console.log(`[TRADFRI] Handshake completed: ${identity}`);
        });
    }

    /**
     * Request an preSharedKey from the tradfri gateway
     *
     * @param callback
     * @return string | bool
     */
    performHandshake(callback) {
        exec(`coap-client -m post -u "Client_identity" -k "${config.tradfri.gatewayCode}" -e '{"9090":"ikea_tradfri_express"}' "coaps://${config.tradfri.ip}:5684/15011/9063"`, (error, stdout, stderr) => {
            if(error !== null) {
                console.log(`[TRADFRI] Error: ${error}`);
                callback(false);

                return false;
            }

            console.log('[TRADFRI] stdout', stdout);
            callback(stdout);
        });
    }

    /**
     * Send a light command to the tradfri gateway
     *
     * @param commandObject
     */
    sendLightCommand(commandObject) {
        if(this.preSharedKey === false) {
            console.log('[TRADFRI] Reconnection needed with gateway...');

            this.performHandshake((identity) => {
                console.log(`[TRADFRI] Handshake completed: ${identity}`);
                this.sendLightCommand(commandObject);
            });

            return;
        }

        const command = [{}];

        if(commandObject.on !== "undefined") {
            command[0] = Object.assign(command[0], {
                "5850": commandObject.on ? 1 : 0
            });
        }

        if(commandObject.brightness !== "undefined") {
            command[0] = Object.assign(command[0], {
                "5851": Math.round(commandObject.brightness * 254)
            });
        }

        if(commandObject.color !== "undefined") {
            command[0] = Object.assign(command[0], {
                "5706": commandObject.color
            });
        }

        if(commandObject.transitionTime !== "undefined") {
            command[0] = Object.assign(command[0], {
                "5712": commandObject.transitionTime
            });
        }

        exec(`coap-client -m put -u "ikea_tradfri_express" -k "$PRESHARED_KEY" -e '{ "3311": ${JSON.stringify(command)} }' "coaps://${config.tradfri.ip}:5684/15001/${commandObject.lightId}"`, (error, stdout, stderr) => {
            if(error !== null) {
                console.log(`[TRADFRI] Error: ${error}`);
            }

            console.log('[TRADFRI] stdout', stdout);
        });
    }
}

module.exports = new Tradfri();
