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
function reset() {
    expression.firstNum = '';
    expression.secondNum = '';
    expression.operator = '';
    resultNum = '';
    flag = 0;
}

const numbers = document.querySelectorAll('.row button');
const operators = document.querySelectorAll('.operators button');
const input = document.querySelector('.expression');
const result = document.querySelector('.result');
const prev_result = document.querySelector('.prev');

let expression = {
    firstNum:'',
    secondNum:'',
    operator:'',
}
let resultNum = '';
let flag = 0;
let result_flag = 0;

numbers.forEach(num => {
    num.addEventListener('click' , e => {
        if (result_flag == 1) {   // lets you clear when you enter a number after result
            reset();
            result_flag = 0;
        }
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
            if (flag == 1) {
                resultNum = operate(expression.firstNum,expression.secondNum,expression.operator);
                expression.firstNum = resultNum;
                expression.secondNum = '';
                resultNum = '';
            }
            expression.operator = e.target.innerText;
            flag = 1;
        } else if (e.target.innerText == '=') {
            resultNum = operate(expression.firstNum,expression.secondNum,expression.operator);
            result_flag = 1;
        } else if (e.target.innerText == 'clc') {
            reset();
        }
        updateInput();
    });
});

