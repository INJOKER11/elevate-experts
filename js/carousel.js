let currentPage = 1;
const itemsPerPage = 3;
let employeesData = [];

export async function carousel(){
    try {
        const response = await fetch("./data/employee.json");
        employeesData = await response.json();

        renderPage(currentPage);
        renderPagination();
    } catch (e) {
        console.log(e);
    }
}

function renderPage(page) {
    const carouselWrapper = document.querySelector(".carousel_cards_wrapper");
    if (!carouselWrapper) return;

    carouselWrapper.innerHTML = "";

    const start = (page - 1) * itemsPerPage;
    const end = start + itemsPerPage;

    const currentItems = employeesData.slice(start, end);
    currentItems.forEach(e => {
        const employee = renderEmployee(e);
        carouselWrapper.appendChild(employee);
    });

    // обновляем активную точку
    updateActiveDot(page);
}

export function renderEmployee(e) {
    const employee = document.createElement("div");
    employee.className = "card";
    console.log(e);
    employee.innerHTML = `
            <div class="card_button_wrapper">
            <div class="social_card_button_wrapper">
            <a class="social_card_button" href="https://t.me/${e.telegram}" target="_blank">
                    <img src="./assets/icons/telegram.svg" alt="telegram"/>
                </a>
                <a class="social_card_button" href="https://www.linkedin.com/in/${e.linkedin}" target="_blank">
                    <img src="./assets/icons/linkedin.svg" alt="linkedin"/>
                </a>
            </div>
                <button class="plus_button">
                    <img src="./assets/icons/plus.svg" alt="plus" class="button_img_plus"/>
                </button>
            </div>
            <div class="badge">
                <span class="name">${e.name + " " + e.last_name}</span>
                <span class="work_position">${e.position}</span>
            </div>
            <img src="${e.img}" alt="photo"/>
    `
    const plusButton = employee.querySelector(".plus_button");
    const socialWrapper = employee.querySelector(".social_card_button_wrapper");

    plusButton.addEventListener("click", () => {
        socialWrapper.classList.toggle("active");
    });
    return employee;
}

export function renderPagination() {
    const paginationWrapper = document.querySelector(".pagination_wrapper");

    paginationWrapper.innerHTML = ``;

    const totalPages = Math.ceil(employeesData.length / itemsPerPage);

    for(let i = 1; i <=totalPages; i++){
        const dot = document.createElement("div");
        dot.className = "pagination_dot";
        dot.dataset.page = i;

        dot.addEventListener("click", () => {
            currentPage = i;
            renderPage(currentPage);
        })
        paginationWrapper.appendChild(dot);
    }
    updateActiveDot(currentPage);
}


function updateActiveDot(page) {
    const dots = document.querySelectorAll(".pagination_dot");
    dots.forEach(dot => {
        dot.classList.remove("active");
        if (Number(dot.dataset.page) === page) {
            dot.classList.add("active");
        }
    });
}