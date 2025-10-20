const display = document.getElementById('display');
let currentInput = '';
let operator = '';
let previousInput = '';
let resultDisplayed = false;

document.querySelectorAll('.btn').forEach(button => {
    button.addEventListener('click', () => {
        const value = button.textContent;

        if (button.classList.contains('number') || value === '.') {
            if (resultDisplayed) {
                currentInput = value;
                resultDisplayed = false;
            } else {
                if (value === '.' && currentInput.includes('.')) {
                    // Prevent multiple decimals
                    return;
                }
                currentInput += value;
            }
            display.value = currentInput;
        } else if (button.classList.contains('operator')) {
            if (value === '±') {
                if (currentInput !== '') {
                    currentInput = (parseFloat(currentInput) * -1).toString();
                    display.value = currentInput;
                }
            } else if (value === '%') {
                if (currentInput !== '') {
                    currentInput = (parseFloat(currentInput) / 100).toString();
                    display.value = currentInput;
                }
            } else {
                if (currentInput !== '') {
                    if (previousInput !== '') {
                        calculate();
                    }
                    operator = value;
                    previousInput = currentInput;
                    currentInput = '';
                    resultDisplayed = false;
                }
            }
        } else if (value === '=') {
            if (currentInput !== '' && previousInput !== '' && operator !== '') {
                calculate();
                operator = '';
                resultDisplayed = true;
            }
        } else if (value === 'C') {
            clearDisplay();
        } else if (value === '⌫') {
            currentInput = currentInput.slice(0, -1);
            display.value = currentInput;
        }
    });
});

function calculate() {
    const prev = parseFloat(previousInput);
    const current = parseFloat(currentInput);
    let result;

    switch (operator) {
        case '+':
            result = prev + current;
            break;
        case '-':
            result = prev - current;
            break;
        case '*':
            result = prev * current;
            break;
        case '/':
            if (current !== 0) {
                result = prev / current;
            } else {
                alert('Cannot divide by zero');
                clearDisplay();
                return;
            }
            break;
        default:
            return;
    }

    display.value = result;
    currentInput = result.toString();
    previousInput = '';
}

function clearDisplay() {
    display.value = '';
    currentInput = '';
    operator = '';
    previousInput = '';
    resultDisplayed = false;
}

// Keyboard support
document.addEventListener('keydown', (event) => {
    const key = event.key;

    if (key >= '0' && key <= '9') {
        if (resultDisplayed) {
            currentInput = key;
            resultDisplayed = false;
        } else {
            currentInput += key;
        }
        display.value = currentInput;
    } else if (key === '.') {
        if (resultDisplayed) {
            currentInput = key;
            resultDisplayed = false;
        } else {
            if (currentInput.includes('.')) {
                // Prevent multiple decimals
                return;
            }
            currentInput += key;
        }
        display.value = currentInput;
    } else if (['+', '-', '*', '/'].includes(key)) {
        if (currentInput !== '') {
            if (previousInput !== '') {
                calculate();
            }
            operator = key;
            previousInput = currentInput;
            currentInput = '';
            resultDisplayed = false;
        }
    } else if (key === 'Enter' || key === '=') {
        if (currentInput !== '' && previousInput !== '' && operator !== '') {
            calculate();
            operator = '';
            resultDisplayed = true;
        }
    } else if (key === 'Escape' || key === 'c' || key === 'C') {
        clearDisplay();
    } else if (key === 'Backspace') {
        currentInput = currentInput.slice(0, -1);
        display.value = currentInput;
    }
});
