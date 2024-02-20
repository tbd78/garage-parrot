'use strict';

import { Get } from "./helper.js";

/**
 * Represents a contact info
 *
 * @typedef ContactInfo
 * @property {number} contact_info.id
 * @property {string} contact_info.name
 * @property {string} contact_info.address
 * @property {string} contact_info.phone
 * @property {string} contact_info.email
 */

/**
 * Fetch all contact infos
 * @return {Promise<ContactInfo[]>}
 */
export async function GetContactInfo() {
    return Get("/api/contact-info");
}
