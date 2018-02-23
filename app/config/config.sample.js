/**
 * General config
 */
const config = {
    application: {
        name: "Ikea Tradfri Express",
        env: " (local)",
        basePath: "/",
        port: 3001,
        bind: "0.0.0.0"
    },
    tradfri: {
        ip: "192.168.1.XX",
        gatewayCode: "abcdef123456",
        scenes: {
            "movie": [
                {
                    lightId: "65537",
                    on: true,
                    brightness: 1,
                    color: "6c83ba",
                    transitionTime: 20
                },
                {
                    lightId: "65538",
                    on: true,
                    brightness: 1,
                    color: "6c83ba",
                    transitionTime: 20
                }
            ],
            "fullOn": [
                {
                    lightId: "65537",
                    on: true,
                    brightness: 1,
                    color: "f2eccf",
                    transitionTime: 5
                },
                {
                    lightId: "65538",
                    on: true,
                    brightness: 1,
                    color: "f2eccf",
                    transitionTime: 5
                }
            ],
            "normal": [
                {
                    lightId: "65537",
                    on: true,
                    brightness: 0.7,
                    color: "f2eccf",
                    transitionTime: 5
                },
                {
                    lightId: "65538",
                    on: true,
                    brightness: 0.7,
                    color: "f2eccf",
                    transitionTime: 5
                }
            ],
            "off": [
                {
                    lightId: "65537",
                    on: false,
                    transitionTime: 5
                },
                {
                    lightId: "65538",
                    on: false,
                    transitionTime: 5
                }
            ]
        },
        disco: {
            bulbIds: ["65537", "65538"]
        }
    }
};

module.exports = config;
