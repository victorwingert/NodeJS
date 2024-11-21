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

addButton.addEventListener('click', () => {

    event.preventDefault();

    let id = "1";
    let title = titleInput.value;
    let body = bodyInput.value;
    let date = dateInput.value;

    let template = `
                <tr>
                    <td>${id}</td>
                    <td>${title}</td>
                    <td>${body}</td>
                    <td>${date}</td>
                </tr>
                    `;

    table.innerHTML += template;

    toggleModal(); // Fecha o modal com animação

    titleInput.value = '';
    bodyInput.value = '';
    dateInput.value = '';
})

async function loadPosts() {
    try {
        const response = await fetch("http://localhost:3000/posts");
        const data = await response.json();

        const tbody = document.querySelector("tbody");
        tbody.innerHTML = "";

        data.posts.forEach(post => {
            const row = document.createElement("tr");

            row.innerHTML = `
                <td>${post.id}</td>
                <td>${post.title}</td>
                <td>${post.body}</td>
                <td>${post.created_at}</td>
            `;
            tbody.appendChild(row);
        });
    } catch (error) {
        console.error("Erro ao carregar os posts:", error);
    }
}

document.addEventListener("DOMContentLoaded", loadPosts);
