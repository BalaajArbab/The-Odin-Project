"use strict"

const Add = (a, b) => a + b;
const Subtract = (a, b) => a - b;
const Multiply = (a, b) => a * b;
const Divide = (a, b) => b !== 0 ? a / b : "ZeroDivide";

function Operate(operator, a, b)
{
    switch(operator)
    {
        case "+":
            Add(a, b);
            break;
        case "-":
            Subtract(a, b);
            break;
        case "*":
            Multiply(a, b);
            break;
        case "/":
            Divide(a, b);
        default:
            console.error("No operator.");
    }
}