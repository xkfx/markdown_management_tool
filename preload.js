window.addEventListener('DOMContentLoaded', () => {
    let fileSearch = document.querySelector(".FileSearch");
    fileSearch.addEventListener("search", () => {
        if (fileSearch.value != "") {
            console.log(fileSearch.value);
        }
    });   
})

