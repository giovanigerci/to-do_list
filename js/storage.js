function loadLists(){
    return JSON.parse(localStorage.getItem("lists")) || {};
}

function saveLists(lists){
    localStorage.setItem("lists", JSON.stringify(lists)); 
}

export { loadLists, saveLists };