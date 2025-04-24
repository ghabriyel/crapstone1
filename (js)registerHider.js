document.addEventListener("DOMContentLoaded", () => {
    const button = document.getElementById("register");
    const popup = document.getElementById("registerForm");
    const backgroundColor = document.getElementById("formOverlay");
    const closeButton = document.getElementById("cancelButton");

    button.addEventListener("click", () => {
        popup.style.display = "block";
        backgroundColor.style.display = "block";
    });

    closeButton.addEventListener("click", () => {
        popup.style.display = "none";
        backgroundColor.style.display = "none";
    });

})