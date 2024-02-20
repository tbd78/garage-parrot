'use strict';

import { Get } from "./helper.js";

/**
 * Represents a car spec
 *
 * @typedef Gallery
 * @property {number} gallery.id
 * @property {number} gallery.car_id
 * @property {string} gallery.image
 */

/**
 * Fetch all car galleries
 * @return {Promise<CarSpec[]>}
 */
export async function GetGalleries() {
    return Get("/api/gallery");
}
