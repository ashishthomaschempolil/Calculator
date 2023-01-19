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
}

function changeCurrentDisplay(value){
    currentDisplay.textContent = value
}

function changePreviousDisplay(arr){
    previousDisplay.textContent = arr.join(' ')
}

function changeDisplay(value){
    if (value === "="){
        //push the current display number to the previousResult and update the previosResult, currentResult
        previousResult.append(currentDisplay.textContent)
        currentResult = operate(operatorFunctions[previousResult[previousResult.length - 1]], currentResult, Number(value))
        changeCurrentDisplay(currentResult)
        changePreviousDisplay(previousResult)
    }
    else if (value in operatorFunctions){
        // check for base case that is make sure the first item in previousResult is number and second is the operator
        if (previousResult[previousResult.length - 1] in operatorFunctions){
            previousResult.pop()
        }
        else if(previousResult.length>2){
            
            currentResult = operate(
                operatorFunctions[previousResult[previousResult.length-2]], 
                currentResult, 
                Number(previousResult[previousResult.length-1])
                )
            changeCurrentDisplay(currentResult);
            previousResult.append(value);
            changePreviousDisplay(previousResult);
        }
        else {
            currentResult = Number(currentDisplay.textContent)
        }
    }
    else { //if its a number
        //update currentDisplay's textContent
        currentDisplay.textContent += value
    }
}

function clearOneDisplay(){
    currentDisplay.textContent = currentDisplay.textContent.slice(0,-1)
}

function clearDisplay(){
    currentResult = 0
    previousResult = []
    changeCurrentDisplay("")
    changePreviousDisplay("")
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
