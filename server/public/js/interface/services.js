'use strict';

import { Get, Put } from "./helper.js";

/**
 * Represents a Service
 *
 * @typedef Service
 * @property {number} service.id
 * @property {string} service.service_name
 * @property {string} service.description
 */

/**
 * Fetch all services
 * @return {Promise<Service[]>}
 */
export async function GetServices() {
    return Get('/api/service');
}

/**
 * @param {service} service
 */
export async function PutService(service) {
    return Put('/api/service', service);
}
