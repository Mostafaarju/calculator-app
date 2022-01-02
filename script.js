const calculatorDisplay = document.querySelector('h1');
const inputBtns = document.querySelectorAll('button');
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
let secondOperation = '';
let middleOperation = '';
let lastOperation = '';

function sendNumberValue(number) {
  //Replace Current display value if first value is entered
  if (awaitingNextValue) {
    calculatorDisplay.textContent = number;
    awaitingNextValue = false;
  } else {
    // if current display value is 0, replace it, if not add number;
    const displayValue = calculatorDisplay.textContent;
    // calculatorDisplay.textContent = displayValue === '0' ? number : displayValue + number;
    if (displayValue === '0') {
      calculatorDisplay.textContent = number;
      secondOperation = number;
    } else {
      calculatorDisplay.textContent = displayValue + number;
      // first display show in second value
      if (firstValue === 0) {
        secondOperation = displayValue + number;
      } else {
        secondOperation = firstValue;
      }
    }
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

    //   Show current Display to second display
    if (awaitingNextValue) {
      secondOperation = '';
      lastOperation = '';
      secondOperation = firstValue;

      if (secondOperation === firstValue) {
        secondOperation = middleOperation;
      }
    }

    return;
  }

  // Assign first value if no value
  if (!firstValue) {
    firstValue = currentValue;
  } else {
    const calculation = calculator[operatorValue](firstValue, currentValue);
    calculatorDisplay.textContent = calculation;
    lastOperation += currentValue;

    firstValue = calculation;

    //   Show current Display to second display in condition
    if (calculation) {
      middleOperation = calculation;
    }
  }

  // second Display show with operator
  const currentOperationValue =
    secondOperation + ' ' + operatorValue + ' ' + lastOperation;
  calculatorSelected.textContent = currentOperationValue;

  // Ready for Next Value, store operator
  awaitingNextValue = true;
  operatorValue = operator;
}

// Reset all values, Display
function resetAll() {
  firstValue = 0;
  operatorValue = '';
  awaitingNextValue = false;
  secondOperation = '';
  middleOperation = '';
  lastOperation = '';
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
inputBtns.forEach(inputBtn => {
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
