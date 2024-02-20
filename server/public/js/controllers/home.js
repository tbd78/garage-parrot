'use strict';

import { GetCars } from "../interface/car.js";
import { GetCarSpecs } from "../interface/car_spec.js";
import { GetContactInfo } from "../interface/contact_info.js";
import { GetValidFeedbacks, GetFeedbacks } from "../interface/feedbacks.js";
import { GetGalleries } from "../interface/gallery.js";
import { GetServices } from "../interface/services.js";
import { GetSpecs } from "../interface/spec.js";
import { GetUsers } from "../interface/user.js";

const BLACK_STAR = "&#x2605";
const WHITE_STAR = "&#x2606";

function CreateCommentElement({name, rating, comment}) {
    const blackStarCount = Math.round(rating/2);
    const whiteStartCount = 5 - blackStarCount;
    let starts = BLACK_STAR.repeat(blackStarCount);
    starts += WHITE_STAR.repeat(whiteStartCount);

    return (`
<div class="card" style="width: 18rem; margin: 8px;">
    <div class="card-body">
        <h5 class="card-title">${name}</h5>
        <h6 class="card-subtitle mb-2 text-body-secondary" style="color: red;">${starts}</h6>
        <p class="card-text">${comment}</p>
    </div>
</div>
    `);
}

function CreateServiceElement({name, description}) {
    return(`
<div class="card" style="width: 18rem; margin: 8px;">
    <div class="card-body">
        <h5 class="card-title">${name}</h5>
        <p class="card-text">${description}</p>
    </div>
</div>
    `);
}

async function InitFeedbacks() {
    const feedbackList = await GetValidFeedbacks();

    const feedbackElement = document.getElementById("feedbacks");
    for(const feedback of feedbackList) {
        const newElement = CreateCommentElement({ name: feedback.name, rating: feedback.rating, comment: feedback.comment });
        feedbackElement.innerHTML += newElement;
    }
}

async function InitServices() {
    const serviceList = await GetServices();

    const serviceElement = document.getElementById("services");
    for(const service of serviceList) {
        const newElement = CreateServiceElement({ name: service.service_name, description: service.description });
        serviceElement.innerHTML += newElement;
    }
}

/**
 * Initializing function
 */
function Init() {
    InitFeedbacks();
    InitServices();
}

Init();

// console.log("cars: ",           await GetCars());
// console.log("car specs: ",      await GetCarSpecs());
// console.log("contact infos: ",  await GetContactInfo());
// console.log("feedbacks: ",      await GetFeedbacks());
// console.log("galleries: ",      await GetGalleries());
// console.log("services: ",       await GetServices());
// console.log("specs: ",          await GetSpecs());
// console.log("users: ",          await GetUsers());
