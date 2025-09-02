const addTaskBtn = document.getElementById("addTaskBtn");
const taskInput = document.getElementById("taskInput");
const taskList = document.getElementById("taskList");

//Função para adicionar tarefa
function addTask() {
    const taskText = taskInput.value.trim();
    if (taskText === "") return;

    const tarefas = taskList.querySelectorAll("li span");
    for (let tarefa of tarefas) {
        if (tarefa.textContent.localeCompare(taskText, "pt-BR", { sensitivity: "base" }) === 0) {
            Swal.fire({
                icon: "warning",
                title: "Tarefa duplicada",
                text: "Essa tarefa já existe na lista!",
                confirmButtonText: "Ok"
            });
            taskInput.value = "";
            return;
        }
    }

    const li = document.createElement("li");

    const span = document.createElement("span");
    span.textContent = taskText;

    const removeBtn = document.createElement("button");
    removeBtn.textContent = "X";
    removeBtn.classList.add("remove-btn");
    removeBtn.onclick = () => {
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
                Swal.fire("Removida!", "A tarefa foi excluída com sucesso.", "success");
            }
        });
    };

    span.onclick = () => li.classList.toggle("completed");

    li.appendChild(span);
    li.appendChild(removeBtn);
    taskList.appendChild(li);

    taskInput.value = "";

    Swal.fire({
        icon: "success",
        title: "Boa!",
        text: "Tarefa adicionada com sucesso!"
    });
}

//Evento no Botão
addTaskBtn.addEventListener("click", addTask);

//Evento Enter no input
taskInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter") addTask()
});