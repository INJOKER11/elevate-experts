

export function burgerMenu() {
    const openButton = document.querySelector(".header_burger_menu_open_button");
    const closeButton = document.querySelector(".header_burger_menu_close_button");
    const overlay = document.querySelector(".mobile_header_menu_overlay");
    const headerMenu = document.querySelector(".mobile_header_menu");

    const body = document.body;

    overlay.addEventListener("click", () => {
        headerMenu.style.display = "none";
        overlay.style.display = "none";
        closeButton.style.display = "none";
        openButton.style.display = "flex";
        body.classList.remove("no-scroll");
    });

    openButton.addEventListener('click', () => {
        headerMenu.style.display = "flex";
        openButton.style.display = "none";
        closeButton.style.display = "flex";
        overlay.style.display = "flex";
        body.classList.add("no-scroll");
    })

    closeButton.addEventListener("click", () => {
        headerMenu.style.display = "none";
        overlay.style.display = "none";
        closeButton.style.display = "none";
        openButton.style.display = "flex";
        body.classList.remove("no-scroll");
    })
}