'use strict';

import { Get } from "./helper.js";

/**
 * Represents a user feedback
 *
 * @typedef Feedback
 * @property {number} feedback.id
 * @property {string} feedback.datetime
 * @property {string} feedback.name
 * @property {string} feedback.comment
 * @property {number} feedback.rating
 * @property {boolean} feedback.validation
 */

/**
 * Fetch all feedbacks
 * @return {Promise<Feedback[]>}
 */
export async function GetFeedbacks() {
    return Get("/api/feedback");
}

/**
 * Provides validated feedbacks
 *
 * @return {Promise<Feedback[]>}
 */
export async function GetValidFeedbacks() {
    const feedbacks = await GetFeedbacks();
    if(feedbacks === null) {
        return null;
    }

    return feedbacks.filter(feedback => feedback.validation);
}
