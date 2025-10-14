const menuBtn = document.getElementById("menuToggle");
const aside = document.querySelector("aside");
const hamburger = document.querySelector(".hamburger")

menuBtn.addEventListener("click", () => {
    aside.classList.toggle("open");
});

//Serve para fechar o menu hamburguer quando o usuario selecionar alguma lista
document.getElementById("allList").addEventListener("click", (e) => {
    if (e.target.tagName === "LI" && aside.classList.contains("open")) {
        aside.classList.remove("open")
    }
});