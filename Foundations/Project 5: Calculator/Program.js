"use strict"

const MAX_CURRENT_NUMBER_LENGTH = 12;

let currentNumber = "";
let numberHistory = [];

const numberButtons = Array.from(document.querySelectorAll("#LeftSide .Number"));
console.assert(numberButtons.unshift(numberButtons.pop()) == 10, "Wrong button count");

numberButtons.forEach(x => x.addEventListener("click", AppendNumber));

const operatorButtons = document.querySelectorAll("#RightSide .Operator");
operatorButtons.forEach(x => x.addEventListener("click", () => Operate(x.textContent)));

const equalsButton = document.querySelector("#Equals");
equalsButton.addEventListener("click", Equals);
let equalsJustPressed = false;

const clearButton = document.querySelector("#Clear");
clearButton.addEventListener("click", Clear);

const backspaceButton = document.querySelector("#Backspace");
backspaceButton.addEventListener("click", Backspace);

const Add = (a, b) => a + b;
const Subtract = (a, b) => a - b;
const Multiply = (a, b) => a * b;
const Divide = (a, b) => +b !== 0 ? a / b : "ZeroDivide";

function PerformOperation(operator, a, b)
{
        let result;

        switch(operator)
        {
            case "+":
                result = Add(+a, +b);
                break;
            case "-":
                result = Subtract(a, b);
                break;
            case "*":
                result = Multiply(a, b);
                break;
            case "/":
                result = Divide(a, b);
                break;
            default:
                console.error("No operator.");
                break;
        }

        return result;
}

function Operate(operator)
{
    if (equalsJustPressed)
    {
        equalsJustPressed = false;
        numberHistory.push(operator);

        return;
    }

    if (currentNumber === "")
    {
        alert("No number entered.");
        return;
    } 

    let number = currentNumber;
    currentNumber = "";

    numberHistory.push(number);
    numberHistory.push(operator);
    
    if (numberHistory.length >= 3)
    {
        let result = ReduceNumberHistory();

        if (result === "ZeroDivide")
        {
            alert("Divide by zero. Not cool.");
            Clear();
            return;
        } 

        UpdateDisplay(result);
    }
}

function Equals()
{
    
    if (currentNumber === "" || numberHistory.length < 2)
    {
        return;
    }

    numberHistory.push(currentNumber);

    let result = ReduceNumberHistory();
    currentNumber = "";

    equalsJustPressed = true;

    if (result === "ZeroDivide")
        {
            alert("Divide by zero. Not cool.");
            Clear();
            return;
        } 

    UpdateDisplay(result);
}

function ReduceNumberHistory()
{
        const a = numberHistory.shift();
        const op = numberHistory.shift();
        const b = numberHistory.shift();

        let result = PerformOperation(op, a, b);
        numberHistory.unshift(result);

        return result;
}

function AppendNumber(e)
{
    if (currentNumber.length < MAX_CURRENT_NUMBER_LENGTH && !equalsJustPressed)
    {
        currentNumber += this.textContent;

        UpdateDisplay(currentNumber);
    }
}

function UpdateDisplay(number)
{
    const display = document.querySelector("#Display .Text");

    if (number.toString().length > 12) number = (+number).toExponential(5);

     display.textContent = number;

     RotateDisplay(document.querySelector("#Display"), 1);

}

function RotateDisplay(display, deg = 2, ms = 50)
{
    display.style.cssText = `transform: rotateZ(${deg}deg);`;

    setTimeout(() =>
    {
        display.style.cssText = `transform: rotateZ(${-1 * deg}deg);`;
    }, ms);

    setTimeout(() =>
    {
        display.style.cssText = `transform: rotateZ(${-2 * deg}deg);`;

    }, ms * 2);

    setTimeout(() =>
    {
        display.style.cssText = `transform: rotateZ(${0}deg);`;

    }, ms * 3);
}

function Clear()
{
    currentNumber = "";
    numberHistory = [];
    equalsJustPressed = false;
    UpdateDisplay(0);
}

function Backspace()
{
    currentNumber = currentNumber.slice(0, currentNumber.length - 1);
    UpdateDisplay(currentNumber);
}

UpdateDisplay(0);