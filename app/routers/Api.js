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
        route: '/methods',
        method: 'get',
        controller: 'Index',
        action: 'methods'
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

routerUtils.routesToRouter(router, routes, 'Api');

module.exports = {router, routes};
