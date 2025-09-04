const addTaskBtn = document.getElementById("addTaskBtn");
const taskInput = document.getElementById("taskInput");
const taskList = document.getElementById("taskList");
const newList = document.getElementById("newList");
const newListLayout = document.getElementById("newListLayout");
const defaultLayout = document.getElementById("defaultLayout");

// Alternar entre layouts sem usar display:flex direto
newList.addEventListener("click", () => {
  defaultLayout.classList.add("hidden");
  newListLayout.classList.remove("hidden");
});

// Função para adicionar tarefa
function addTask() {
  const taskText = taskInput.value.trim();
  if (taskText === "") return;

  // Verificar duplicadas
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

  // Criar elemento <li>
  const li = document.createElement("li");

  const span = document.createElement("span");
  span.textContent = taskText;

  // Botão de remover
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

  // Concluir tarefa ao clicar no texto
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

// Evento no botão
addTaskBtn.addEventListener("click", addTask);

// Evento Enter no input
taskInput.addEventListener("keypress", (e) => {
  if (e.key === "Enter") addTask();
});
