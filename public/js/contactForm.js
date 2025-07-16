import {config} from "../config.js";

export function contactForm() {
    const form = document.querySelector(".contact_form_wrapper");
    const successModalOverlay = document.querySelector(".success_modal_overlay");


    form.addEventListener("submit", async function (e) {
        e.preventDefault();

        const emailInput = this.email;
        const emailError = this.querySelector(".email-error");
        const emailWrapper = emailInput.closest('.contact_form_input_outline');

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
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });

            if (res.ok) {
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