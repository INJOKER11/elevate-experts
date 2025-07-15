import {config} from "../config.js";


export function footerForm() {
    const form = document.querySelector(".footer_form");
    const successModalOverlay = document.querySelector(".success_modal_overlay");

    form.addEventListener("submit", async function (e) {
        e.preventDefault();

        const formData = {
            email: this.email?.value ?? "",
            message: this.long_text?.value ?? "",
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