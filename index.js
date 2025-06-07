function createCalculator() {
  let displayValue = '0';
  let firstOperand = null;
  let waitingForSecondOperand = false;
  let operator = null;

  function updateDisplay() {
    const display = document.querySelector('.calculator-screen');
    display.value = displayValue;
  }

  function inputDigit(digit) {
    if (waitingForSecondOperand === true) {
      displayValue = digit;
      waitingForSecondOperand = false;
    } else {
      displayValue = displayValue === '0' ? digit : displayValue + digit;
    }
    updateDisplay();
  }

  function inputDecimal(dot) {
    if (waitingForSecondOperand === true) {
      displayValue = '0.';
      waitingForSecondOperand = false;
      updateDisplay();
      return;
    }
    if (!displayValue.includes(dot)) {
      displayValue += dot;
    }
    updateDisplay();
  }

  function handleOperator(nextOperator) {
    const inputValue = parseFloat(displayValue);

    if (operator && waitingForSecondOperand) {
      operator = nextOperator;
      return;
    }

    if (firstOperand === null && !isNaN(inputValue)) {
      firstOperand = inputValue;
    } else if (operator) {
      const result = performCalculation[operator](firstOperand, inputValue);

      displayValue = String(result);
      firstOperand = result;
    }

    waitingForSecondOperand = true;
    operator = nextOperator;
    updateDisplay();
  }

  const performCalculation = {
    '/': (first, second) => first / second,
    '*': (first, second) => first * second,
    '+': (first, second) => first + second,
    '-': (first, second) => first - second,
    '=': (first, second) => second
  };

  function resetCalculator() {
    displayValue = '0';
    firstOperand = null;
    waitingForSecondOperand = false;
    operator = null;
    updateDisplay();
  }

  return {
    inputDigit: inputDigit,
    inputDecimal: inputDecimal,
    handleOperator: handleOperator,
    resetCalculator: resetCalculator,
    updateDisplay: updateDisplay
  };
}

const calculator = createCalculator();
calculator.updateDisplay();

const keys = document.querySelector('.calculator-keys');

keys.addEventListener('click', (event) => {
  const { target } = event;
  if (!target.matches('button')) {
    return;
  }
  if (target.classList.contains('operator')) {
    calculator.handleOperator(target.value);
    return;
  }

  if (target.classList.contains('decimal')) {
    calculator.inputDecimal(target.value);
    return;
  }

  if (target.classList.contains('clear')) {
    calculator.resetCalculator();
    return;
  }

  calculator.inputDigit(target.value);
});