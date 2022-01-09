const calculatorDisplay = document.querySelector('h1');
const inputButtons = document.querySelectorAll('button');
const clearBtn = document.querySelector('#clear-btn');
const backSpace = document.querySelector('.fa-backspace');
const calculatorSelected = document.querySelector('.calculator-selected');

// Calculator first and second values depending on operator ;
const calculator = {
  '/': (firstNumber, secondNumber) => firstNumber / secondNumber,
  '*': (firstNumber, secondNumber) => firstNumber * secondNumber,
  '+': (firstNumber, secondNumber) => firstNumber + secondNumber,
  '-': (firstNumber, secondNumber) => firstNumber - secondNumber,
  '%': (firstNumber, secondNumber) => firstNumber % secondNumber,
  '=': (firstNumber, secondNumber) => secondNumber,
};

let firstValue = 0;
let operatorValue = '';
let awaitingNextValue = false;
let secondDisplayOperation = '';
let middleDisplayOperation = '';
let lastDisplayOperation = '';

function sendNumberValue(number) {
  //Replace Current display value if first value is entered
  if (awaitingNextValue) {
    calculatorDisplay.textContent = number;
    awaitingNextValue = false;
  } else {
    // if current display value is 0, replace it, if not add number;
    const displayValue = calculatorDisplay.textContent;
    calculatorDisplay.textContent =
      displayValue === '0' ? number : displayValue + number;
  }
}

function addDecimal() {
  // if Operator pressed, don't add decimal
  if (awaitingNextValue) return;
  // If no decimal, Add One
  if (!calculatorDisplay.textContent.includes('.')) {
    calculatorDisplay.textContent = `${calculatorDisplay.textContent}.`;
  }
}

function useOperator(operator) {
  const currentValue = Number(calculatorDisplay.textContent);
  // Prevent Multiple operators
  if (operatorValue && awaitingNextValue) {
    operatorValue = operator;
    return;
  }

  // Assign first value if no value
  if (!firstValue) {
    firstValue = currentValue;
  } else {
    const calculation = calculator[operatorValue](firstValue, currentValue);
    // Assign value for Second Display
    secondDisplayOperation = firstValue;
    middleDisplayOperation = operatorValue;
    lastDisplayOperation = currentValue;

    calculatorDisplay.textContent = calculation;

    firstValue = calculation;
  }

  // declare
  calculatorSelected.textContent =
    secondDisplayOperation +
    ' ' +
    middleDisplayOperation +
    ' ' +
    lastDisplayOperation;
  // Ready for Next Value, store operator
  awaitingNextValue = true;
  operatorValue = operator;
}

// Reset all values, Display
function resetAll() {
  firstValue = 0;
  operatorValue = '';
  awaitingNextValue = false;
  secondDisplayOperation = '';
  middleDisplayOperation = '';
  lastDisplayOperation = '';
  calculatorDisplay.textContent = '0';
  calculatorSelected.textContent = '';
}

// deleteBackSpace
function deleteBackSpace() {
  if (calculatorDisplay.textContent) {
    calculatorDisplay.textContent = calculatorDisplay.textContent.slice(0, -1);
  }
  if (calculatorSelected.textContent) {
    calculatorSelected.textContent = calculatorSelected.textContent.slice(
      0,
      -1
    );
  }
}

// Add Event Listeners for numbers, operators, decimal buttons
inputButtons.forEach(inputBtn => {
  if (inputBtn.classList.length === 0) {
    inputBtn.addEventListener('click', () => sendNumberValue(inputBtn.value));
  } else if (inputBtn.classList.contains('operator')) {
    inputBtn.addEventListener('click', () => useOperator(inputBtn.value));
  } else if (inputBtn.classList.contains('decimal')) {
    inputBtn.addEventListener('click', () => addDecimal());
  }
});

// Event Listener
clearBtn.addEventListener('click', resetAll);

backSpace.addEventListener('click', deleteBackSpace);
