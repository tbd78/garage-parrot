'use strict';

import { Get, Post, Delete } from "./helper.js";

/**
 * Represents a user
 *
 * @typedef User
 * @property {number} user.id
 * @property {string} user.username
 * @property {string} user.role
 * @property {string} user.firstname
 * @property {string} user.lastname
 */

/**
 * Fetch all users
 * @return {Promise<User[]>}
 */
export async function GetUsers() {
    return Get("/api/user");
}

/**
 * @param {User} user
 */
export async function PostUser(user) {
    return Post('/api/user', user);
}

/**
 * @param {number} id
 */
export async function DeleteUser(id) {
    return Delete(`/api/user/${id}`);
}
