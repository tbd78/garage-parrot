'use strict';

import { Get } from "./helper.js";

/**
 * Represents a car
 *
 * @typedef Car
 * @property {number} car.id
 * @property {string} car.brand
 * @property {string} car.model
 * @property {number} car.price
 * @property {number} car.mileage
 * @property {number} car.year
 * @property {string} car.cover_image
 * @property {boolean} car.sold
 */

/**
 * Fetch all cars
 * @return {Promise<Car[]>}
 */
export async function GetCars() {
    return Get("/api/car");
}
