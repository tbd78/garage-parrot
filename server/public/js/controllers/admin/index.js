'use strict';

import { GetServices } from "../../interface/services.js";

function CreateServiceElement({id, name, description}) {
    return (`
<div class="card" style="width: 18rem; margin: 8px">
    <div class="card-body">
        <h5 class="card-title" style="text-align: center;">${name}</h5>
        <p class="card-text">${description}</p>
    </div>
    <div class="card-footer d-flex justify-content-between">
        <a href="#" class="btn btn-danger">Supprimer</a>
        <a href="/back-office/admin/service-edit?id=${id}&name=${name}&description=${description}" class="btn btn-primary">Modifier</a>
    </div>
</div>
    `);
}

/**
 * Initializing function
 */
async function Init() {
    const serviceList = await GetServices();

    const serviceElement = document.getElementById("services");
    for(const service of serviceList) {
        const newElement = CreateServiceElement({ id:service.id, name: service.service_name, description: service.description });
        serviceElement.innerHTML += newElement;
    }
}

Init();
