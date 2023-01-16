currentDisplay = ""

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

function evaluate(result){
    if (result.includes("+") && result.split("+").length > 2){
        let numbers = result.split("+")
        let a = Number(numbers[0])
        let b = Number(numbers[1])
        return operate(add, a, b), Number[-1]
    }
    else if (result.includes("-")&& result.split("-").length > 2){
        let numbers = result.split("-")
        let a = Number(numbers[0])
        let b = Number(numbers[1])
        console.log(operate(subtract, a, b))
        return operate(subtract, a, b), Number[-1]
    }
    else if (result.includes("*") && result.split("*").length > 2){
        let numbers = result.split("*")
        let a = Number(numbers[0])
        let b = Number(numbers[1])
        return operate(multiply, a, b), Number[-1]
    }
    else if (result.includes("/") && result.split("/").length > 2){
        let numbers = result.split("/")
        let a = Number(numbers[0])
        let b = Number(numbers[1])
        return operate(division, a, b), Number[-1]
    }
}

function changeDisplay(displayValue){
    currentDisplay += displayValue
    document.getElementById("display-screen").value = currentDisplay
}

function clearDisplay(){
    currentDisplay = ""
    document.getElementById("display-screen").value = currentDisplay
}

function clearOneDisplay(){
    currentDisplay = currentDisplay.slice(0, -1)
    document.getElementById("display-screen").value = currentDisplay
}

const numbers = document.querySelectorAll(".number")
const operators = document.querySelectorAll(".operator")
const clearScreen = document.querySelector("#clear-screen")
const clearOne = document.querySelector("#clear")
const screen = document.getElementById("display-screen")

numbers.forEach((number) => {
    number.addEventListener("click", () => {
        changeDisplay(number.value)
    })
}
)

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
