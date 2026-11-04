const display = document.getElementById('display');
const history = document.getElementById('history');
const buttons = document.querySelector('.buttons');
const symbols = { '+': '+', '-': '−', '*': '×', '/': '÷' };

let current = '0';
let previous = null;
let operator = null;
let newNumber = false;

function calculate(a, b, op) {
    if (op === '+') return a + b;
    if (op === '-') return a - b;
    if (op === '*') return a * b;
    if (op === '/') return b === 0 ? 'Error' : a / b;
}

function showResult(result) {
    if (result === 'Error') {
        current = 'Error';
    } else {
        current = String(parseFloat(result.toFixed(8)));
    }
}

buttons.addEventListener('click', (e) => {
    if (e.target.tagName !== 'BUTTON') return;
    const value = e.target.dataset.value;

    if (current === 'Error' && value !== 'AC') {
        current = '0';
    }

    if (value === 'AC') {
        current = '0';
        previous = null;
        operator = null;
        history.textContent = '';
    } else if (value === '%') {
        current = String(Number(current) / 100);
    } else if (value === '.') {
        if (newNumber) {
            current = '0.';
            newNumber = false;
        } else if (!current.includes('.')) {
            current += '.';
        }
    } else if (['+', '-', '*', '/'].includes(value)) {
        if (operator !== null && !newNumber) {
            showResult(calculate(previous, Number(current), operator));
        }
        previous = Number(current);
        operator = value;
        newNumber = true;
        history.textContent = `${current} ${symbols[value]}`;
    } else if (value === '=') {
        if (operator === null) return;
        history.textContent = `${previous} ${symbols[operator]} ${current} =`;
        showResult(calculate(previous, Number(current), operator));
        operator = null;
        newNumber = true;
    } else {
        if (newNumber || current === '0') {
            current = value === '00' ? '0' : value;
            newNumber = false;
        } else {
            current += value;
        }
    }

    display.textContent = current;
});
