var contactNumber = document.getElementById("contact");

// main functuion no touch pls

function sanitizeContactNumber(event, maxNumberLength = 11) {
    let input = event.target.value;
    input = sanitizeNumbers(input);

    if (input.length > maxNumberLength) {
        input = input.substring(0, maxNumberLength);
        if (input.slice(0, 1) !== "0") {
            alert("Please enter a valid contact number");
        }
    }
    event.target.value = input;
}

contactNumber.addEventListener("input",sanitizeContactNumber);