export async function questions() {
    try {
        const response = await fetch("./data/questions.json");
        const data = await response.json();
        console.log(data);
        const questionWrapper = document.querySelector(".faq_questions_wrapper")

        data.forEach((q) => {
            const question = renderQuestion(q);
            questionWrapper.appendChild(question);
        })
    } catch (error) {
        console.error(error);
    }
}

function renderQuestion(q) {
    const question = document.createElement("div");
    question.className = "faq_question";

    question.innerHTML = `
        <div class="faq_question_button_question_wrapper">
            <button class="faq_expand_button">
                <img class="faq_button_plus" src="assets/icons/plus.svg" alt="plus"/>
                <img class="faq_button_minus" src="./assets/icons/remove_minus.svg" alt="minus"/>
            </button>
            <span class="faq_questing_title">${q.question}</span>
        </div>
            <span class="faq_question_answer">${q.answer}</span>
    `;

    toggleQuestion(question);

    return question;
}

function toggleQuestion(q) {
    const button = q.querySelector(".faq_expand_button");

    button.addEventListener("click", () => {
        q.classList.toggle("faq_open");
    })
}
