const fs = require('fs');
const {exec} = require('child_process');
const config = require('../../config/config');

class Tradfri {
    constructor() {
        const date = new Date();

        this.disco = false;
        this.discoColor = 0;
        this.discoInterval = false;

        this.preSharedKey = false;
        this.userName = `ikea_tradfri_express_${date.getFullYear()}${date.getMonth()}${date.getDay()}${date.getHours()}${date.getMinutes()}${date.getSeconds()}`;

        this.colors = [
            '4a418a',
            '6c83ba',
            '8f2686',
            'a9d62b',
            'c984bb',
            'd6e44b',
            'd9337c',
            'da5d41',
            'dc4b31',
            'dcf0f8',
            'e491af',
            'e57345',
            'e78834',
            'e8bedd',
            'eaf6fb',
            'ebb63e',
            'efd275',
            'f1e0b5',
            'f2eccf',
            'f5faf6'
        ];
    }

    /**
     * Create the initial connection to the tradfri gateway
     */
    init() {
        console.log(`[TRADFRI] Checking for existing config file...`);

        if (fs.existsSync(`${__dirname}/../../config/tradfri.json`)) {
            fs.readFile(`${__dirname}/../../config/tradfri.json`, (err, data) => {
                if (err) console.log(`[TRADFRI][CONFIG] Error loading file: ${err}`);

                const obj = JSON.parse(data);

                this.preSharedKey = obj.preSharedKey;
                this.userName = obj.userName;
                console.log(`[TRADFRI][CONFIG] Config loaded! userName: ${obj.userName}, preSharedKey: ${obj.preSharedKey}`);
            });
        } else {
            console.log(`[TRADFRI] Connecting to Gateway and performing handshake...`);

            this.performHandshake((identity) => {
                console.log(`[TRADFRI] Handshake completed: ${identity}`);
            });
        }
    }

    /**
     * Request an preSharedKey from the tradfri gateway
     *
     * @param callback
     * @return string | bool
     */
    performHandshake(callback) {
        exec(`coap-client -m post -u "Client_identity" -k "${config.tradfri.gatewayCode}" -e '{"9090":"${this.userName}"}' "coaps://${config.tradfri.ip}:5684/15011/9063"`, (error, stdout, stderr) => {
            if(error !== null) {
                console.log(`[TRADFRI] Error: ${error}`);
                callback(false);

                return false;
            }

            const data = JSON.parse(stdout);

            if(data["9091"]) {
                fs.writeFile(`${__dirname}/../../config/tradfri.json`, JSON.stringify({preSharedKey: data["9091"], userName: this.userName}), (err) => {
                    if (err) console.log(`[TRADFRI][CONFIG] Error saving file: ${err}`);

                    console.log(`[TRADFRI][CONFIG] Config saved! userName: ${this.userName}, preSharedKey: ${data["9091"]}`);
                });

                this.preSharedKey = data["9091"];
                callback(this.preSharedKey);
            } else {
                console.log("[TRADFRI] Error: Key error!");
                callback(false);
            }
        });
    }

    /**
     * Send a light command to the tradfri gateway
     *
     * @param commandObject
     * @param discoCommand
     */
    sendLightCommand(commandObject, discoCommand = false) {
        if(this.preSharedKey === false) {
            console.log('[TRADFRI] Connection not ready!');
            return;
        }

        if(this.disco && !discoCommand) {
            this.disco = false;
            clearInterval(this.discoInterval);
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

        exec(`coap-client -m put -u "${this.userName}" -k "${this.preSharedKey}" -e '{ "3311": ${JSON.stringify(command)} }' "coaps://${config.tradfri.ip}:5684/15001/${commandObject.lightId}"`, (error, stdout, stderr) => {
            if(error !== null) {
                console.log(`[TRADFRI] Error: ${error}`);
            }

            console.log(`[TRADFRI] Command complete: ${JSON.stringify(commandObject)}`);
        });
    }

    /**
     * Start the disco lights
     */
    activateDisco() {
        this.disco = true;

        this.discoInterval = setInterval(() => {
            for(let bulb = 0; bulb < config.tradfri.disco.bulbIds.length; bulb++) {
                this.sendLightCommand({
                    lightId: config.tradfri.disco.bulbIds[bulb],
                    on: true,
                    brightness: 1,
                    color: this.colors[this.discoColor],
                    transitionTime: 5
                }, true);
            }

            if(this.discoColor === (this.colors.length - 1)) {
                this.discoColor = 0;
            } else {
                this.discoColor++;
            }
        }, 750);
    }
}

module.exports = new Tradfri();
