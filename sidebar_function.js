document.addEventListener("DOMContentLoaded", () => {
    const sidebar = document.getElementById("sidebar");
    const toggleBtn = document.getElementById("sidebarToggle");
    const arrowIcon = document.getElementById("arrowIcon");
    const main = document.querySelector("main");

    toggleBtn.addEventListener("click", () => {
        sidebar.classList.toggle("collapsed");
        arrowIcon.textContent = sidebar.classList.contains("collapsed") ? "»" : "«";
        main.style.marginLeft = sidebar.classList.contains("collapsed") ? "10rem" : "250px";
    });
});

// Function to handle the click event on the sidebar links
//name this sidebar_function.js