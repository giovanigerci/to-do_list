import { showList, toggleDeleteButtonVisibility, currentList } from "./script.js";
import { loadLists, saveLists } from "./storage.js";

const allList = document.getElementById("allList");
const newList = document.getElementById("newList");
const newListLayout = document.getElementById("newListLayout");
const defaultLayout = document.getElementById("defaultLayout");

// Carrega listas do storage
let lists = loadLists();

// Renderiza lista no menu lateral
function renderLists() {
    allList.innerHTML = "";
    Object.keys(lists).forEach(listName => {
        const li = document.createElement("li");
        li.textContent = listName;
        li.style.cursor = "pointer";
        li.addEventListener("click", () => {
            showList(listName);
            defaultLayout.classList.add("hidden");
            newListLayout.classList.remove("hidden");
            document.querySelector("#newListLayout h2").textContent = `📝 ${listName}`;
            toggleDeleteButtonVisibility(true);
        });
        allList.appendChild(li);
    });
}
renderLists();

// Criar nova lista
newList.addEventListener("click", () => {
    Swal.fire({
        title: 'Nova Lista',
        input: 'text',
        inputLabel: 'Digite o nome da lista',
        inputPlaceholder: 'Ex: Compras do mês',
        showCancelButton: true,
        confirmButtonText: 'Criar',
        confirmButtonColor: "#1f9225ff",
        cancelButtonText: 'Cancelar',
        cancelButtonColor: "rgba(177, 44, 44, 1)",
        inputValidator: value => !value ? 'Você precisa digitar um nome!' : undefined
    }).then(result => {
        if (result.isConfirmed){
            const listName = result.value;
            if (lists[listName]) {
                Swal.fire({
                    icon: "warning",
                    title: "Nome existente",
                    text: "Já existe uma lista com esse nome!"
                });
                return;
            }

            lists[listName] = [];
            saveLists(lists);
            renderLists();

            document.querySelector("#newListLayout h2").textContent = `📝 ${listName}`;
            defaultLayout.classList.add("hidden");
            newListLayout.classList.remove("hidden");

            // Mostrar lista vazia
            showList(listName);
        }
    });
});

//Função para excluir uma lista
export function deleteList(listName) {
    Swal.fire({
    title: "Tem certeza?",
    text: "Essa ação não poderá ser desfeita!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#d33",
    cancelButtonColor: "#3085d6",
    confirmButtonText: "Sim, excluir!",
    cancelButtonText: "Cancelar"
    }).then((result) => {
        if (result.isConfirmed) {
            delete lists[listName];
            saveLists(lists);
            renderLists();

            newListLayout.classList.add("hidden");
            defaultLayout.classList.remove("hidden");
            toggleDeleteButtonVisibility(false);

            Swal.fire(
            "Excluída!",
            `A lista "${listName}" foi excluída.`,
            "success"
            );
        }
    })
}
