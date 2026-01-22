
const display = document.getElementById("display");
const buttons = document.querySelector(".buttons");

let firstValue = "";
let operator = "";
let secondValue = "";
let shouldResetDisplay = false;

buttons.addEventListener("click", (e) => {
    if (!e.target.matches("button")) return;

    const value = e.target.dataset.value;
    const action = e.target.dataset.action;

    if (value) handleInput(value);
    if (action) handleAction(action);
});

function handleInput(value) {
    if (shouldResetDisplay) {
        display.value = "";
        shouldResetDisplay = false;
    }
    if (value === "." && display.value.includes(".")) return;
    display.value += value;
}

function handleAction(action) {
    switch (action) {
        case "clear":
            resetCalculator();
            break;
        case "delete":
            display.value = display.value.slice(0, -1);
            break;
        case "equals":
            calculate();
            break;
    }
}

function setOperator(op) {
    firstValue = display.value;
    operator = op;
    shouldResetDisplay = true;
}

function calculate() {
    if (!operator || shouldResetDisplay) return;

    secondValue = display.value;
    display.value = operate(
        Number(firstValue),
        Number(secondValue),
        operator
    );
    operator = "";
    shouldResetDisplay = true;
}

function operate(a, b, op) {
    switch (op) {
        case "+": return a + b;
        case "-": return a - b;
        case "*": return a * b;
        case "/": return b === 0 ? "Error" : a / b;
        default: return b;
    }
}

function resetCalculator() {
    display.value = "";
    firstValue = operator = secondValue = "";
    shouldResetDisplay = false;
}

/* Keyboard Support */
document.addEventListener("keydown", (e) => {
    if ("0123456789.+-*/".includes(e.key)) {
        if ("+-*/".includes(e.key)) setOperator(e.key);
        else handleInput(e.key);
    }
    if (e.key === "Enter") calculate();
    if (e.key === "Backspace") display.value = display.value.slice(0, -1);
    if (e.key === "Escape") resetCalculator();
});

/* Operator button binding */
document.querySelectorAll('[data-value="+"][data-value="-"][data-value="*"][data-value="/"]');
document.querySelectorAll("[data-value]").forEach(btn => {
    if ("+-*/".includes(btn.dataset.value)) {
        btn.addEventListener("click", () => setOperator(btn.dataset.value));
    }
});
