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
    if (b === 0){
        alert("Cannot divide by zero")
        clearDisplay()
    }
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
        if (previousResult.length > 1){
        previousResult.push(currentDisplay.textContent)
        currentResult = operate(
            operatorFunctions[previousResult[previousResult.length - 2]],
            currentResult,
            Number(currentDisplay.textContent)
        )
        changeCurrentDisplay(currentResult)
        currentResultFlag = 1;
        changePreviousDisplay(previousResult)
        previousResult = [currentResult];
        }
        else {
            //do nothing when a person presses the equal button without any expression
            //or if there is only just 1 number
        }

    }
    else if (value in operatorFunctions){
        // check for base case that is make sure the first item in previousResult is number and second is the operator
        // if value in operatorFunctions then
        if (currentResultFlag){
            previousResult.push(value)
        }
        else{
            previousResult.push(currentDisplay.textContent)
            previousResult.push(value)
        }


        if (previousResult[previousResult.length - 2] in operatorFunctions){ //if the last item in previousResult is an operator
            previousResult.splice(previousResult.length - 2, 1) //remove the last operator or the second last element in the array
            changePreviousDisplay(previousResult)
        }
        else{
            if (previousResult.length == 2){
                currentResult = Number(currentDisplay.textContent)
            }
            else if (previousResult.length > 2){
                currentResult = operate(
                    operatorFunctions[previousResult[previousResult.length - 3]],
                    currentResult,
                    Number(currentDisplay.textContent)
                )
            }
            //if the length of the previousResult.length>3 then calculate the result
            changeCurrentDisplay(currentResult) // to show the result of the expression in currentDisplay
            currentResultFlag = 1; // to identify if the currentDisplay is the result of the expression
            currentNumberFlag = 0 //Flag variable to replace the number value with new inputted number
            changePreviousDisplay(previousResult) // to show the expression in previousDisplay
        }

    }
    else { //if its a number
        //update currentDisplay's textContent
        if (currentNumberFlag === 1){ 
            if (currentDisplay.textContent.length <= 10){ //limit the number of characters in the currentDisplay
                if (value === "." && currentDisplay.textContent.includes(".")){
                    //do nothing if the currentDisplay already has a decimal point
                }
                else {
                    currentDisplay.textContent += value
                }
            }
        }
        else{//overwrote the result of the expression with the new number
            currentDisplay.textContent = value
            currentNumberFlag = 1;
            currentResultFlag = 0;
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
    currentResultFlag = 0;
    currentNumberFlag = 0;
}

let currentResult = 0,  //variable to store the current result
    previousResult = [], //array to store the previous results
    currentNumberFlag = 0, //flag variable to replace the number value with new inputted number
    currentResultFlag = 0; //flag variable to identify if the currentDisplay is the result of the expression


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

document.addEventListener("keydown", (e) => {
    if (e.key === "Backspace"){
        clearOneDisplay()
    }
    else if (e.key === "Escape"){
        clearDisplay()
    }
    else if (e.key === "="){
        changeDisplay("=")
    }
    else if (e.key in operatorFunctions){
        changeDisplay(e.key)
    }
    else if (e.key in ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"]){
        changeDisplay(e.key)
    }
    else if (e.key === "."){
        changeDisplay(".")
    }
})
