
export function successModal() {
    const modalOverlay = document.querySelector(".success_modal_overlay");
    const body = document.body;
    const modalCloseButton = document.querySelector(".success_modal_close_button");

    modalOverlay.addEventListener('click', (ev) => {
        if (ev.target === modalOverlay) {
            modalOverlay.classList.remove("open");
        }
    });

    modalCloseButton.addEventListener('click', () => {
        modalOverlay.classList.remove("open");
    });

    const observer = new MutationObserver((mutationsList) => {
        for (const mutation of mutationsList) {
            if (mutation.type === "attributes" && mutation.attributeName === "class") {
                const target = mutation.target;
                if (target.classList.contains("open")) {
                    body.classList.add("no-scroll");
                } else {
                    body.classList.remove("no-scroll");
                }
            }
        }
    });

    observer.observe(modalOverlay, {
        attributes: true,
        attributeFilter: ["class"]
    });
}
