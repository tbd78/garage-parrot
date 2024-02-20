'use strict';

import { Get } from "./helper.js";

/**
 * Represents a spec
 *
 * @typedef Spec
 * @property {number} spec.id
 * @property {string} spec.name
 * @property {string} spec.type
 */

/**
 * Fetch all specs
 * @return {Promise<Spec[]>}
 */
export async function GetSpecs() {
    return Get("/api/spec");
}
