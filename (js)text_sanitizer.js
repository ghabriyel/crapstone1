const nameInputs = document.getElementsByClassName('SanitizeInputField');

function sanitizeInput(event) {
    let input = event.target.value;

    input = input.replace(/[^a-zA-Z\s]/g, '');
    
    event.target.value = input;
}

Array.from(nameInputs).forEach(inputField => {
    inputField.addEventListener('input', sanitizeInput);
});
