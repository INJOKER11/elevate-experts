import {burgerMenu} from "./burgerMenu.js";
import {questions} from "./questions.js";
import {successModal} from "./successModal.js";
import {formModal} from "./formModal.js";
import {carousel} from "./carousel.js";

document.addEventListener('DOMContentLoaded', () => {
    console.log("DOMContentLoaded: main.js loaded ✅");

    burgerMenu();
    questions();
    successModal();
    formModal();
    if (document.querySelector(".carousel_cards_wrapper")) {
        carousel();
    }
})