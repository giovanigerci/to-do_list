import { loadLists, saveLists } from "./storage.js";

// Elementos
const addTaskBtn = document.getElementById("addTaskBtn");
const taskInput = document.getElementById("taskInput");
const taskList = document.getElementById("taskList");
const addListBtn = document.getElementById("addListBtn");

// Lista ativa
let currentList = "";

// Atualiza o localStorage com as tarefas da lista atual
function updateStorage() {
    if (!currentList) return;
    const tasks = Array.from(taskList.querySelectorAll("li span")).map(span => span.textContent);
    const lists = loadLists();
    lists[currentList] = tasks;
    saveLists(lists);
}

// Mostra as tarefas de uma lista
export function showList(listName) {
    currentList = listName;
    const lists = loadLists();
    const tasks = lists[listName] || [];
    taskList.innerHTML = "";

    tasks.forEach(taskText => {
        const li = document.createElement("li");
        const span = document.createElement("span");
        span.textContent = taskText;
        span.onclick = () => li.classList.toggle("completed");

        const removeBtn = document.createElement("button");
        removeBtn.textContent = "X";
        removeBtn.classList.add("remove-btn");
        removeBtn.onclick = () => {
            li.remove();
            updateStorage();
        };

        li.appendChild(span);
        li.appendChild(removeBtn);
        taskList.appendChild(li);
    });
}

// Adiciona nova tarefa
export function addTask() {
    const taskText = taskInput.value.trim();
    if (!taskText || !currentList) return;

    // Checa duplicadas
    const duplicates = Array.from(taskList.querySelectorAll("li span"))
        .some(span => span.textContent.toLowerCase() === taskText.toLowerCase());
    if (duplicates) {
        Swal.fire({
            icon: "warning",
            title: "Tarefa duplicada",
            text: "Essa tarefa já existe na lista!",
            confirmButtonText: "Ok"
        });
        taskInput.value = "";
        return;
    }

    const li = document.createElement("li");
    const span = document.createElement("span");
    span.textContent = taskText;
    span.onclick = () => li.classList.toggle("completed");

    const removeBtn = document.createElement("button");
    removeBtn.textContent = "X";
    removeBtn.classList.add("remove-btn");
    removeBtn.onclick = () => {
        li.remove();
        updateStorage();
    };

    li.appendChild(span);
    li.appendChild(removeBtn);
    taskList.appendChild(li);

    taskInput.value = "";
    updateStorage();

    Swal.fire({
        icon: "success",
        title: "Boa!",
        text: "Tarefa adicionada com sucesso!"
    });
}

function finishList() {
    // Esconder a área de tarefas e mostrar a área padrão
    const newListLayout = document.getElementById("newListLayout");
    const defaultLayout = document.getElementById("defaultLayout");
    newListLayout.classList.add("hidden");
    defaultLayout.classList.remove("hidden");

    // Limpar o input de tarefas e a lista de tarefas visível
    taskInput.value = "";
    taskList.innerHTML = "";

    // Opcionalmente, pode-se mostrar um alerta de sucesso
    Swal.fire({
        icon: "success",
        title: "Lista Salva!",
        text: "Sua lista foi salva com sucesso!"
    });
}

// Eventos
addListBtn.addEventListener("click", finishList);
addTaskBtn.addEventListener("click", addTask);
taskInput.addEventListener("keypress", e => { if (e.key === "Enter") addTask(); });
