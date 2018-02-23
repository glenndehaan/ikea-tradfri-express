/**
 * General config
 */
const config = {
    application: {
        name: "Ikea Tradfri Express",
        env: " (local)",
        basePath: "/",
        port: 3001,
        bind: "0.0.0.0",
        supportedBrowsers: [
            "Chrome >= 52",
            "Firefox >= 47",
            "Safari >= 10",
            "Edge == All",
            "IE == 11"
        ]
    },
    session: {
        secret: "averysecretstring"
    },
    tradfri: {
        ip: "192.168.11.200",
        gatewayCode: "abcdef1234567890",
        scenes: {
            "movie": [
                {
                    lightId: "65537",
                    on: true,
                    brightness: 0.7,
                    color: "4a418a",
                    transitionTime: 10
                },
                {
                    lightId: "65538",
                    on: true,
                    brightness: 0.7,
                    color: "4a418a",
                    transitionTime: 10
                }
            ],
            "fullOn": [
                {
                    lightId: "65537",
                    on: true,
                    brightness: 1,
                    color: "e78834",
                    transitionTime: 5
                },
                {
                    lightId: "65538",
                    on: true,
                    brightness: 1,
                    color: "e78834",
                    transitionTime: 5
                }
            ],
            "normal": [
                {
                    lightId: "65537",
                    on: true,
                    brightness: 0.7,
                    color: "e78834",
                    transitionTime: 5
                },
                {
                    lightId: "65538",
                    on: true,
                    brightness: 0.7,
                    color: "e78834",
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
        }
    }
};

module.exports = config;
