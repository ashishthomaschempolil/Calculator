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

function addMultiple(...args){
    return args.reduce((final, current)=> {
        return final+current
    }, 0);
}



function multiplyMultiple(...args){
    return args.reduce((final, current)=> {
        return final*current
    }, 1);
}