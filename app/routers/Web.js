/**
 * Import base packages
 */
const express = require('express');
const router = express.Router();
const routerUtils = require('../helpers/modules/Router');

/**
 * Define routes
 */
const routes = [
    {
        route: '/',
        method: 'get',
        controller: 'Index',
        action: 'index'
    },
    {
        route: '/scene/:scene',
        method: 'get',
        controller: 'Scene',
        action: 'index'
    },
    {
        route: '/disco',
        method: 'get',
        controller: 'Scene',
        action: 'disco'
    }
];

routerUtils.routesToRouter(router, routes, 'Web');

module.exports = {router, routes};
