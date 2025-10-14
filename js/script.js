import { loadLists, saveLists } from "./storage.js";
import { deleteList } from "./addList.js";

// Elementos
const addTaskBtn = document.getElementById("addTaskBtn");
const taskInput = document.getElementById("taskInput");
const taskList = document.getElementById("taskList");
const addListBtn = document.getElementById("addListBtn");
const deleteListBtn = document.getElementById("deleteListBtn")

// Lista ativa
export let currentList = "";

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

        li.appendChild(span);

        const removeBtn = document.createElement("button");
        removeBtn.textContent = "X";
        removeBtn.classList.add("remove-btn");
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

    li.appendChild(span);

    const removeBtn = document.createElement("button");
    removeBtn.textContent = "X";
    removeBtn.classList.add("remove-btn");
    li.appendChild(removeBtn);

    taskList.appendChild(li);

    taskInput.value = "";
    updateStorage();
}

// Delegação de eventos para concluir tarefa ou remover
taskList.addEventListener("click", (e) => {
    const li = e.target.closest("li");
    if (!li) return;

    if (e.target.classList.contains("remove-btn")) {
        Swal.fire({
            title: "Você tem certeza?",
            text: "Essa tarefa será removida.",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#1f9225ff",
            cancelButtonColor: "#d33",
            confirmButtonText: "Sim, remover",
            cancelButtonText: "Cancelar"
        }).then((result) => {
            if (result.isConfirmed) {
                li.remove();
                updateStorage();
                Swal.fire("Removida!", "A tarefa foi excluída com sucesso.", "success");
            }
        });
    } else if (e.target.tagName === "SPAN") {
        li.classList.toggle("completed");
        updateStorage();
    }
});

function finishList() {
    const newListLayout = document.getElementById("newListLayout");
    const defaultLayout = document.getElementById("defaultLayout");
    newListLayout.classList.add("hidden");
    defaultLayout.classList.remove("hidden");

    taskInput.value = "";
    taskList.innerHTML = "";

    Swal.fire({
        icon: "success",
        title: "Lista Salva!",
        text: "Sua lista foi salva com sucesso!"
    });
}

deleteListBtn.addEventListener("click", () => {
  deleteList(currentList);
});

export function toggleDeleteButtonVisibility(isVisible) {
  const deleteListBtn = document.getElementById("deleteListBtn");
  if (isVisible) {
    deleteListBtn.classList.remove("hidden");
  } else {
    deleteListBtn.classList.add("hidden");
  }
}

// Eventos
addListBtn.addEventListener("click", finishList);
addTaskBtn.addEventListener("click", addTask);
taskInput.addEventListener("keypress", e => { if (e.key === "Enter") addTask(); });
