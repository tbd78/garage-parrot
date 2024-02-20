/**
 * Represents an API response
 *
 * @typedef GarageAPIResponse
 * @property {string} status the status of the response ('OK' or 'NOK')
 * @property {any} data the data of the response. null on status 'NOK', objects array or object on status 'OK'
 */

/**
 * Gathers fetch status result
 */
export const GARAGE_STATUS = {
    /** fetch status ok */
    OK: "OK",
    /** fetch status not ok */
    NOK: "NOK"
};

export const Tools = {};

/**
 * Determines if a given param is a valid api response
 *
 * @param {GarageAPIResponse} response
 * @return {boolean} true if valid, false otherwise
*/
Tools.IsValidResponse = function (response) {
    return ("status" in response) && ("data" in response);
}

/**
 * Determines if an api response status is ok
 *
 * @param {GarageAPIResponse} response
 * @return {boolean} true if ok, false otherwise
 */
Tools.StatusOK = function (response) {
    if(Tools.IsValidResponse(response) && (response.status === GARAGE_STATUS.OK)) {
        return true;
    }

    return false;
}

/**
 * Provides the response data
 *
 * @param {GarageAPIResponse} response
 * @return {any}
 */
Tools.GetResponseData = function (response) {
    if(Tools.IsValidResponse(response)) {
        return response.data;
    }

    return null;
}

Tools.RequestAPI = async function (method, uri, body = null) {
    let headers = {};
    let data = null;
    if(body) {
        headers = {
            'Content-Type': 'application/json;charset=utf-8'
        };
        data = JSON.stringify(body);
    }
    return fetch(uri, {
        method: method,
        headers: headers,
        body: data,
    });
}

/**
 * Create
 */
Tools.CreateAPI = async function (uri, resource) {
    return Tools.RequestAPI("post", uri, resource);
}

/**
 * Read
 */
Tools.ReadAPI = async function (uri) {
    return Tools.RequestAPI("get", uri);
}

/**
 * Update
 */
Tools.UpdateAPI = async function (uri, resource) {
    return Tools.RequestAPI("put", uri, resource);
}

/**
 * Delete
 */
Tools.DeleteAPI = async function (uri) {
    return Tools.RequestAPI("delete", uri);
}

/**
 * @param {Promise<Response>} rawResponse
 */
Tools.ParseAPIResponse = async function (rawResponse) {
    /** @type {GarageAPIResponse} */
    const response = await rawResponse.json();
    if(Tools.IsValidResponse(response) === false) {
        console.log("invalid response received", rawResponse);
    }

    return Tools.GetResponseData(response);
}

export async function Get(uri) {
    const response = await Tools.ReadAPI(uri);
    // log
    console.debug(`retireved response from 'Get (${uri})': `, response);

    return Tools.ParseAPIResponse(response);
}

export async function Put(uri, resource) {
    const response = await Tools.UpdateAPI(uri, resource);
    // log
    console.debug(`retireved response from 'Put (${uri})': `, response);

    return Tools.ParseAPIResponse(response);
}

export async function Post(uri, resource) {
    const response = await Tools.CreateAPI(uri, resource);
    // log
    console.debug(`retireved response from 'Post (${uri})': `, response);

    return Tools.ParseAPIResponse(response);
}
