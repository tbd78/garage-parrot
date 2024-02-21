'use strict';

import { GetUsers, PostUser } from "../../interface/user.js";

function CreateUserElement({firstName, lastName}) {
    return (`
<div class="card" style="width: 18rem; margin: 8px">
    <div class="card-body">
        <h5 class="card-title" style="text-align: center;">${firstName} ${lastName}</h5>
    </div>
    <div class="card-footer d-flex justify-content-between">
        <a href="#" class="btn btn-danger">Supprimer</a>
    </div>
</div>
    `);
}

async function Init() {
    const userList = (await GetUsers()).filter((user) => (user.role !== "admin"));

    const userElement = document.getElementById("users");
    for(const user of userList) {
        const newElement = CreateUserElement({ firstName: user.firstname, lastName: user.lastname });
        userElement.innerHTML += newElement;
    }

    document.getElementById("add-user").addEventListener("click", (e) => {
        e.preventDefault();

        // hide elements linked to employees visualization
        for(let element of document.querySelectorAll(".show-employees").values()) {
            element.style.display = "none";
        }

        // show elements linked to new employee visualization
        for(let element of document.querySelectorAll(".show-new-employee").values()) {
            element.style.display = "initial";
        }
    });

    document.getElementById("new-user").addEventListener("click", async (e) => {
        e.preventDefault();

        const user = {};
        user.username = document.getElementById("username").value;
        user.firstname = document.getElementById("first-name").value;
        user.lastname = document.getElementById("last-name").value;
        user.password = document.getElementById("password").value;
        user.role = "employee";

        console.log(user);

        const result = await PostUser(user);

        // redirection
        const redirect = document.createElement("a");
        redirect.setAttribute("href", "/back-office/admin/employe-edit");
        redirect.click();
    });
}

Init();
