import {burgerMenu} from "./burgerMenu.js";
import {questions} from "./questions.js";
import {successModal} from "./successModal.js";
import {formModal} from "./formModal.js";

document.addEventListener('DOMContentLoaded', () => {
    burgerMenu();
    questions();
    successModal();
    formModal();
})