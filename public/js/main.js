import {burgerMenu} from "./burgerMenu.js";
import {questions} from "./questions.js";
import {successModal} from "./successModal.js";
import {formModal} from "./formModal.js";
import {carousel} from "./carousel.js";
import {footerForm} from "./footerForm.js";
import {contactForm} from "./contactForm.js";

document.addEventListener('DOMContentLoaded', () => {
    burgerMenu();
    questions();
    successModal();
    formModal();
    footerForm()
    if(document.querySelector(".contact_form_wrapper")){
        contactForm();
    }
    if (document.querySelector(".carousel_cards_wrapper")) {
        carousel();
    }
})