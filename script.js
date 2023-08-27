function add(a,b) {
    return a + b;
}
function subtract(a,b) {
    return a - b;
}
function multiply(a,b) {
    return a * b;
}
function divide(a,b) {
    return a / b;
}
function operate(a,b,op) {
    switch (op) {
        case '+':
            resultNum = add(a,b);
            break;
        case '-':
            resultNum = subtract(a,b);
            break;
        case '*':
            resultNum = multiply(a,b);
            break;
        case '/':
            resultNum = divide(a,b);
            break;
        default:
            break;
    }
    return Math.round(resultNum * 100) / 100;
}
function updateInput() {
    input.textContent = `${expression.firstNum} ${expression.operator} ${expression.secondNum}`;
    result.textContent = resultNum;
}

const numbers = document.querySelectorAll('.numbers button');
const operators = document.querySelectorAll('.operators button');
const input = document.querySelector('.input');
const result = document.querySelector('.result');

let expression = {
    firstNum:'',
    secondNum:'',
    operator:'',
}
let resultNum = '';
let flag = 0;

numbers.forEach(num => {
    num.addEventListener('click' , e => {
        if (flag == 0) {
            expression.firstNum *= 10;
            expression.firstNum += parseFloat(e.target.innerText);
        } else {
            expression.secondNum *= 10;
            expression.secondNum += parseFloat(e.target.innerText);  
            
        }
        updateInput();
        
    });
});

operators.forEach(op => {
    op.addEventListener('click' , e => {
        if (e.target.innerText != '=' && e.target.innerText != 'clc' && expression.firstNum != '') {
            expression.operator = e.target.innerText;
            flag = 1;
        } else if (e.target.innerText == '=') {
            resultNum = operate(expression.firstNum,expression.secondNum,expression.operator);
        } else if (e.target.innerText == 'clc') {
            expression.firstNum = '';
            expression.secondNum = '';
            expression.operator = '';
            resultNum = '';
        }
        updateInput();
    });
});

