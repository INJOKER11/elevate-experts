import {config} from "../config.js";

export function contactForm() {
    const form = document.querySelector(".contact_form_wrapper");
    const successModalOverlay = document.querySelector(".success_modal_overlay");


    form.addEventListener("submit", async function (e) {
        e.preventDefault();

        const checkedServices = Array.from(this.querySelectorAll('input[name="services"]:checked'))
            .map(input => input.value);

        const checkedContact = Array.from(this.querySelectorAll('input[name="contact"]:checked'))
            .map(input => input.value);
        console.log(this.name, 'name');
        console.log(this.email, 'email');

        const formData = {
            name: this.name?.value ?? "",
            email: this.email?.value ?? "",
            message: this.long_text?.value ?? "",
            services: checkedServices,
            contact: checkedContact,
        };
        try {

            const res = await fetch(`${config.api}/send-email`, {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify(formData),
            })

            if(res.ok) {
                this.reset();
                window.scroll(0, 0);
                successModalOverlay.classList.add("open");
            }else {
                alert("Error occurred, try again")
            }
        } catch (e) {
            console.error(e);
            alert("Error occurred, try again")
        }
    })
}