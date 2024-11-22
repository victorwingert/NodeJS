const openModalButton = document.querySelector("#open-modal");
const closeModalButton = document.querySelector("#close-modal");
const modal = document.querySelector("#modal");
const fade = document.querySelector("#fade");

const toggleModal = () => {
    [modal, fade].forEach((el) => el.classList.toggle("hide"));
};

[openModalButton, closeModalButton, fade].forEach((el) => {
    el.addEventListener("click", () => toggleModal());
});

const table = document.querySelector("table");
const addButton = document.querySelector("#add-btn");

const titleInput = document.querySelector("#title");
const bodyInput = document.querySelector("#body");
const dateInput = document.querySelector("#date");

let isEditMode = false;
let currentPostId = null;

addButton.addEventListener('click', async () => {

    // event.preventDefault();

    let title = titleInput.value;
    let body = bodyInput.value;
    let date = dateInput.value;

    if (!title || !body) {
        return;
    }

    try {
        if (isEditMode) {
            // const response = await fetch("https://nodejs-3y3f.onrender.com/posts");
            let response = await fetch(`http://localhost:3000/posts/${currentPostId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ title, body, date })
            });
        } else {
            // const response = await fetch("https://nodejs-3y3f.onrender.com/posts");
            let response = await fetch("http://localhost:3000/posts", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ title, body, date })
            });
        }
    } catch (error) {
        console.log(error);
    }

    toggleModal();

    titleInput.value = '';
    bodyInput.value = '';
    dateInput.value = '';

    isEditMode = false;
    currentPostId = null;

    fetchData();
})

fetchData();

async function fetchData() {
    try {
        // const response = await fetch("https://nodejs-3y3f.onrender.com/posts");
        const response = await fetch("http://localhost:3000/posts");
        const data = await response.json();

        const tbody = document.querySelector("tbody");
        tbody.innerHTML = "";

        data.posts.forEach(post => {
            const row = document.createElement("tr");
            const fixDate = new Date(post.created_at).toLocaleDateString('pt-BR');

            row.innerHTML = `
                <td>${post.id}</td>
                <td>${post.title}</td>
                <td>${post.body}</td>
                <td>${fixDate}</td>
                <td><button id="edt-btn" class="actButton">✏️</button><button id="delete-btn" class="actButton">🗑️</button></td>
            `;
            tbody.appendChild(row);

            row.querySelector("#edt-btn").addEventListener("click", () => {
                openEditModal(post);
            });
        })
    }
    catch (error) {
        console.log(error);
    }
}

function openEditModal(post) {
    titleInput.value = post.title;
    bodyInput.value = post.body;
    dateInput.value = new Date(post.created_at).toISOString().split('T')[0];

    document.querySelector(".modal-header h2").textContent = "Tela de Edição";
    addButton.textContent = "Editar";

    isEditMode = true;
    currentPostId = post.id;

    toggleModal();
}