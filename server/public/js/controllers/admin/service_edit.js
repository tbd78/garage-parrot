'use strict';

import { PutService } from "../../interface/services.js";

async function Init() {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);

    const service = {
        id: parseInt(urlParams.get("id"), 10),
        service_name: urlParams.get("name"),
        description: urlParams.get("description")
    };

    const serviceNameElement = document.getElementById("service-name");
    const serviceDescriptionElement = document.getElementById("service-description");

    document.getElementById("service-id").setAttribute("value", service.id);
    serviceNameElement.setAttribute("value", service.service_name);
    serviceDescriptionElement.value = service.description;

    document.getElementById("submit-service").addEventListener('click', async (e) => {
        e.preventDefault();

        service.name = serviceNameElement.value;
        service.description = serviceDescriptionElement.value;

        const result = await PutService(service);

        const redirect = document.createElement("a");
        redirect.setAttribute("href", "/back-office/admin");
        redirect.click();

        // log
        // if(result) {
        //     WindowClient.navigate("/back-office/admin");
        // };
    });
}

Init();
