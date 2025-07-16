import {config} from "../config.js";


export function footerForm() {
    const form = document.querySelector(".footer_form");
    const successModalOverlay = document.querySelector(".success_modal_overlay");

    if (!form) return;

    form.addEventListener("submit", async function (e) {
        e.preventDefault();

        const emailInput = this.querySelector('input[name="email"]');
        const emailWrapper = emailInput.closest('.input_outline');

        const emailValue = emailInput.value.trim();
        const emailValid = emailValue && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailValue);

        if (!emailValid) {
            emailWrapper.classList.add("error");
            return;
        } else {
            emailWrapper.classList.remove("error");
        }

        const formData = {
            email: emailValue,
            message: this.querySelector('input[name="message"]').value.trim() || "",
        };

        try {
            const res = await fetch(`${config.api}/send-email`, {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify(formData),
            });

            if(res.ok) {
                this.reset();
                window.scroll(0, 0);
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