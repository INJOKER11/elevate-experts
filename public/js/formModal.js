

export function formModal() {
    const modalOverlay = document.querySelector(".form_modal_overlay");
    const body = document.body;
    const modalCloseButton = document.querySelector(".form_modal_close_button");
    const openButton = document.querySelector("#header_button")

    openButton.addEventListener("click", () => {
        modalOverlay.classList.add("open");
        body.classList.add("no-scroll")
    })
    modalOverlay.addEventListener('click', (ev) => {
        if (ev.target === modalOverlay) {
            modalOverlay.classList.remove("open");
            body.classList.remove("no-scroll")
        }
    });

    modalCloseButton.addEventListener('click', () => {
        modalOverlay.classList.remove("open");
        body.classList.remove("no-scroll")
    });
}