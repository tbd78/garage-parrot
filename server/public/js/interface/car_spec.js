'use strict';

import { Get } from "./helper.js";

/**
 * Represents a car spec
 *
 * @typedef CarSpec
 * @property {number} car_spec.id
 * @property {number} car_spec.car_id
 * @property {number} car_spec.specs_id
 */

/**
 * Fetch all car specs
 * @return {Promise<CarSpec[]>}
 */
export async function GetCarSpecs() {
    return Get("/api/car-spec");
}
