"use strict";

const passwordInput = document.querySelector("#Password");
const confirmPasswordInput = document.querySelector("#Confirm");
const invalidPWText = document.querySelector("#InvalidPW");

confirmPasswordInput.addEventListener("input", ComparePWs);

function ComparePWs(e)
{
    const pwString = passwordInput.value;
    const confirmString = confirmPasswordInput.value;

    if (pwString !== confirmString) 
    {
        passwordInput.classList.add("Error");
        confirmPasswordInput.classList.add("Error");
        invalidPWText.classList.remove("Hide");
    }
    else
    {
        passwordInput.classList.remove("Error");
        confirmPasswordInput.classList.remove("Error");
        invalidPWText.classList.add("Hide");
    }

    console.log(pwString, confirmString);
    console.dir(passwordInput);
}