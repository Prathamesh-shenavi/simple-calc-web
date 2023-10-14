let runningTotal = 0;
let buffer = "0";
let prevOperation;

const screen = document.querySelector(".screen");

function buttonClick(value) {
  if (isNaN(value)) handleSymbol(value);
  else handleNumber(value);
  screen.innerText = buffer;
}

function handleSymbol(symbol) {
  switch (symbol) {
    case "C":
      buffer = "0";
      runningTotal = 0;
      break;
    case "=":
      if (prevOperation === null) return;
      flushOperation(parseInt(buffer));
      prevOperation = null;
      buffer = runningTotal;
      runningTotal = 0;
      break;
    case "←":
      if (buffer.length === 1) {
        buffer = "0";
      } else {
        buffer = buffer.toString();
        buffer = buffer.slice(0, -1);
      }
      break;
    case "−":
    case "×":
    case "÷":
    case "+":
      handleMath(symbol);
      break;
    default:
      break;
  }
}

function handleMath(symbol) {
  if (buffer === "0") return;
  const intBuffer = parseInt(buffer);
  if (runningTotal === 0) runningTotal = intBuffer;
  else flushOperation(intBuffer);
  prevOperation = symbol;
  buffer = "0";
}

function flushOperation(intBuffer) {
  if (prevOperation === "+") runningTotal += intBuffer;
  else if (prevOperation === "−") runningTotal -= intBuffer;
  else if (prevOperation === "×") runningTotal *= intBuffer;
  else if (prevOperation === "÷") runningTotal /= intBuffer;
}

function handleNumber(numString) {
  if (buffer === "0") buffer = numString;
  else buffer += numString;
}

function init() {
  document
    .querySelector(".calc-btns")
    .addEventListener("click", function (event) {
      buttonClick(event.target.innerText);
    });
}

init();
