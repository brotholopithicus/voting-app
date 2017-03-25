const inputs = document.querySelectorAll(`input:not(#submitButton`);
const email = document.querySelector(`input[type='email']`);
const password = document.querySelector(`input[name='password']`);
const confirmPassword = document.querySelector(`input[name='confirmPassword']`);
const submitButton = document.querySelector('#submitButton');

inputs.forEach(input => input.addEventListener('keyup', validate));

function validate(e) {
    const complete = !Array.from(inputs).map(input => input.value.length > 0).includes(false);
    const emailValid = email.value.includes('@');
    const passwordsMatch = password.value === confirmPassword.value;
    if (complete && passwordsMatch && emailValid) {
        submitButton.disabled = false;
    } else {
        submitButton.disabled = true;
    }
}
