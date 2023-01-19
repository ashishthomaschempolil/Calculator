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
        previousResult.push(currentDisplay.textContent)
        currentResult = operate(
            operatorFunctions[previousResult[previousResult.length - 2]],
            currentResult,
            Number(currentDisplay.textContent)
        )
        changeCurrentDisplay(currentResult)
        changePreviousDisplay(previousResult)
        previousResult = []
    }
    else if (value in operatorFunctions){
        // check for base case that is make sure the first item in previousResult is number and second is the operator
        // if value in operatorFunctions then 
        if (previousResult[previousResult.length - 1] in operatorFunctions){
            previousResult.pop()
            previousResult.push(value)
            changePreviousDisplay(previousResult)
        }
        else{
            number = currentDisplay.textContent
            currentDisplay.textContent = ""
            previousResult.push(number)
            if (previousResult.length == 1){
                currentResult = Number(number)
            }
            else if (previousResult.length > 2){
                currentResult = operate(
                    operatorFunctions[previousResult[previousResult.length - 2]],
                    Number(number),
                    currentResult
                )
            }
            previousResult.push(value)
            //if the length of the previousResult.length>3 then calculate the result
            changeCurrentDisplay(currentResult) // to show the result of the expression in currentDisplay
            flag = 0 //flag variable to replace the number value with new inputted number
            changePreviousDisplay(previousResult) // to show the expression in previousDisplay
        }

    }
    else { //if its a number
        //update currentDisplay's textContent
        if (flag === 1){ 
            currentDisplay.textContent += value
        }
        else{//overwrote the result of the expression with the new number
            currentDisplay.textContent = value
            flag = 1;
        }
    }
}

function clearOneDisplay(){
    currentDisplay.textContent = currentDisplay.textContent.slice(0,-1)
}

function clearDisplay(){
    currentResult = 0
    previousResult = []
    changeCurrentDisplay("")
    changePreviousDisplay(previousResult)
}

let currentResult = 0, previousResult = [], flag = 0;


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
