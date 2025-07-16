import {config} from "../config.js";

export function formModal() {
    const modalCloseButton = document.querySelector(".form_modal_close_button");
    const openButton = document.querySelector("#header_button")
    const modalOverlay = document.querySelector(".form_modal_overlay");
    const body = document.body;
    const successModalOverlay = document.querySelector(".success_modal_overlay");
    const modalForm = document.getElementById("form_modal");

    if(!modalForm) return;

    openButton.addEventListener("click", () => {
        window.scroll(0, 0);
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

    modalForm.addEventListener("submit", async function (e) {
        e.preventDefault();

        const emailInput = this.email;
        const emailError = this.querySelector(".email-error");
        const emailWrapper = emailInput.closest('.form_input_outline');

        const emailValue = emailInput.value.trim();
        const emailValid = emailValue && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailValue);

        if (!emailValid) {
            emailWrapper.classList.add("error");
            emailError.style.display = "block";
            return;
        } else {
            emailWrapper.classList.remove("error");
            emailError.style.display = "none";
        }


        const checkedServices = Array.from(this.querySelectorAll('input[name="services"]:checked'))
            .map(input => input.value);

        const checkedContact = Array.from(this.querySelectorAll('input[name="contact"]:checked'))
            .map(input => input.value);

        const formData = {
            name: this.name?.value ?? "",
            email: emailValue,
            message: this.long_text?.value ?? "",
            services: checkedServices,
            contact: checkedContact,
        };

        try {
            const res = await fetch(`${config.api}/send-email`, {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify(formData),
            });

            if (res.ok) {
                this.reset();
                modalOverlay.classList.remove("open");
                successModalOverlay.classList.add("open");
            } else {
                alert("Error occurred, try again");
            }
        } catch (e) {
            console.error(e);
            alert("Error occurred, try again");
        }
    });
}


