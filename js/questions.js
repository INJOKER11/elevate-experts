export async function questions() {
    try {
        const response = await fetch("./data/questions.json");
        const data = await response.json();

        const questionWrapper = document.querySelector(".faq_questions_wrapper")

        data.forEach((q) => {
            if(!questionWrapper) {
                return;
            }
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

function toggleQuestion(questionElement) {
    const buttonWrapper = questionElement.querySelector(".faq_question_button_question_wrapper");
    const answer = questionElement.querySelector(".faq_question_answer");

    if (!buttonWrapper || !answer) return;

    buttonWrapper.addEventListener("click", () => {
        const isOpen = questionElement.classList.contains("faq_open");


        document.querySelectorAll(".faq_question.faq_open").forEach(openEl => {
            if (openEl !== questionElement) {
                openEl.classList.remove("faq_open");
                const openAnswer = openEl.querySelector(".faq_question_answer");
                openAnswer.style.maxHeight = "0";
                openAnswer.style.padding = "0";
            }
        });

        if (isOpen) {

            const fullHeight = answer.scrollHeight;
            answer.style.maxHeight = fullHeight + "px";
            requestAnimationFrame(() => {
                answer.style.maxHeight = "0";
                answer.style.padding = "0";
                questionElement.classList.remove("faq_open");
            });
        } else {
            const fullHeight = answer.scrollHeight;
            answer.style.maxHeight = "0";
            answer.style.padding = "0";
            questionElement.classList.add("faq_open");

            requestAnimationFrame(() => {
                answer.style.maxHeight = fullHeight + "px";
                answer.style.padding = "20px 0 30px 0";
            });
        }
    });

    answer.addEventListener("transitionend", (e) => {
        if (e.propertyName === "max-height") {
            if (!questionElement.classList.contains("faq_open")) {
                answer.style.maxHeight = "0";
            }
        }
    });
}
