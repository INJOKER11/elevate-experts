import {burgerMenu} from "./burgerMenu.js";
import {questions} from "./questions.js";
import {successModal} from "./successModal.js";

document.addEventListener('DOMContentLoaded', () => {
    burgerMenu();
    questions();
    successModal();
})