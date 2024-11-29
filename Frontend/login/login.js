const navbarMenu = document.querySelector(".navbar .links");
const hamburgerBtn = document.querySelector(".hamburger-btn");
const hideMenuBtn = navbarMenu.querySelector(".close-btn");
const showPopupBtn = document.querySelector(".login-btn");
const formPopup = document.querySelector(".form-popup");
const hidePopupBtn = formPopup.querySelector(".close-btn");
const signupLoginLink = formPopup.querySelectorAll(".bottom-link a");

//sign constants
const signForm = document.getElementById("signForm");
const signEmail = document.getElementById("signEmail");
const signPassword = document.getElementById("signPassword");
const validRegex =
  /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

// Show mobile menu
hamburgerBtn.addEventListener("click", () => {
  navbarMenu.classList.toggle("show-menu");
});

// Hide mobile menu
hideMenuBtn.addEventListener("click", () => hamburgerBtn.click());

// Show login popup
showPopupBtn.addEventListener("click", () => {
  document.body.classList.toggle("show-popup");
});

// Hide login popup
hidePopupBtn.addEventListener("click", () => showPopupBtn.click());

// Show or hide signup form ?????
signupLoginLink.forEach((link) => {
  link.addEventListener("click", (e) => {
    e.preventDefault();
    formPopup.classList[link.id === "signup-link" ? "add" : "remove"](
      "show-signup"
    );
  });
});
//sign up form validation
signForm.addEventListener("submit", (e) => {
  if (!ValidateEmail(signEmail)) {
    e.preventDefault();
    signEmail.focus();
    console.log(Error(`Invalid email address!`));
  }
  if (signPassword.value.length < 6) {
    e.preventDefault();
    console.log(`hi`);
    console.log(Error(`Password must be greater than 6 charachters`));
  }
});

function ValidateEmail(input) {
  if (input.value.match(validRegex)) {
    return true;
  } else {
    return false;
  }
}
