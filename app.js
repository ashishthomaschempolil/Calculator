function add(a,b){
    return a+b
}

function subtract(a, b){
    return a-b
}

function multiply(a, b){
    return a*b
}

function division(a, b){
    return a/b
}

function operate(operator, a, b){
    return operator(a,b)
}

const operatorFunctions = {
    "+": add,
    "-": subtract,
    "*": multiply,
    "/": division,
    "=": 'equals'
}

function changeDisplay(value){
    if (value === "+" || value === "-" || value === "*" || value === "/"){
        currentDisplay.textContent = value
        previousResult.push(value)
    } else if (value === "="){
        previousResult = [String(currentResult)]
        previousDisplay.textContent = currentResult
        currentDisplay.textContent = currentResult
    } else {
        if (previousResult.length === 0){
            previousResult.push(value)
            previousDisplay.textContent = previousResult.join(' ')
            currentResult = Number(value)
        }
        else {
            currentResult = operate(operatorFunctions[previousResult[previousResult.length-1]], currentResult, Number(value))
            currentDisplay.textContent = currentResult
            previousResult.push(value)
            previousDisplay.textContent = previousResult.join(' ')
        }
    }
}

function clearOneDisplay(){
    
}

let currentResult = 0, previousResult = [];


const numbers = document.querySelectorAll(".number")
const operators = document.querySelectorAll(".operator")
const clearScreen = document.querySelector("#clear-screen")
const clearOne = document.querySelector("#clear")
const previousDisplay = document.getElementById("previous-results")
const currentDisplay = document.getElementById("current-results")

numbers.forEach((number) => {
    number.addEventListener("click", () => {
        changeDisplay(number.value)
    }
)
})

operators.forEach((operator) => {
    operator.addEventListener("click", () => {
        changeDisplay(operator.value)
    })
}
)

clearScreen.addEventListener("click", () => {
    clearDisplay()
})

clearOne.addEventListener("click", () => {
    clearOneDisplay()
})

// document.addEventListener("keydown", (e) => {
//     if (e.key === "="){
//         currentDisplay = String(evaluate(currentDisplay))
//         document.getElementById("display-screen").value = currentDisplay
//     }
// }
// )

// evaluate the currentDiplay if there are more than 2 numbers and an operator
// if there are more than 2 numbers and an operator, evaluate the currentDisplay
