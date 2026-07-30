let input = document.getElementById('inputBox');
let buttons = document.querySelectorAll('button');

let string = "";
let arr = Array.from(buttons);

arr.forEach(button => {
    button.addEventListener('click', (e) => {
        if (e.target.innerHTML == '=') {
            try {
                string = calculate(string);
                input.value = string;
            } catch (error) {
                input.value = "Error";
                string = "";
            }
        }
        else if (e.target.innerHTML == 'AC') {
            string = "";
            input.value = string;
        }
        else if (e.target.innerHTML == 'DEL') {
            string = string.substring(0, string.length - 1);
            input.value = string;
        }
        else {
            string += e.target.innerHTML;
            input.value = string;
        }
    })
})

function calculate(expression) {
    // Remove any invalid characters for safety
    if (!/^[0-9+\-*/.%\s]+$/.test(expression)) {
        throw new Error("Invalid expression");
    }

    // Handle percentage by converting % to /100
    expression = expression.replace(/(\d+(\.\d+)?)%/g, "($1/100)");

    return Function('"use strict"; return (' + expression + ')')();
}