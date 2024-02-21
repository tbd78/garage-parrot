'use strict';

import { GetServices, PostService } from "../../interface/services.js";

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

    document.getElementById("add-user").addEventListener("click", async (e) => {
        e.preventDefault();

        // hide elements linked to employees visualization
        for(let element of document.querySelectorAll(".show-services").values()) {
            element.style.display = "none";
        }

        // show elements linked to new employee visualization
        for(let element of document.querySelectorAll(".show-new-service").values()) {
            element.style.display = "initial";
        }
    });

    document.getElementById("new-service").addEventListener("click", async (e) => {
        e.preventDefault();

        // new service to add to the database
        const service = {
            service_name:   document.getElementById("name").value,
            description:    document.getElementById("description").value,
        };

        // log
        console.log("about to add a new service:", service);

        const result = await PostService(service);

        // redirection
        const redirect = document.createElement("a");
        redirect.setAttribute("href", "/back-office/admin/");
        redirect.click();
    });
}

// Launch initialization
Init();
