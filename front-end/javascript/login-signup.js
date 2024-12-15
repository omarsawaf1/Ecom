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
// signup
document
  .getElementById("signForm")
  .addEventListener("submit", async (event) => {
    event.preventDefault(); // Prevent default form submission

    // Collect user details from form
    const email = document.getElementById("signEmail").value;
    const fname = document.getElementById("fname").value;
    const lname = document.getElementById("lname").value;
    const password = document.getElementById("signPassword").value;
    const userType = document.getElementById("radioBtn3").checked ? 1 : 0; // 1 = seller, 0 = buyer
    const phone = document.getElementById("phone1").value;
    // Prepare the JSON payload
    const signupData = {
      email,
      fname,
      lname,
      password, // In production, ensure this is hashed on the backend
      userType,
      phone,
    };

    try {
      // Send signup data to backend
      const response = await fetch("/api/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(signupData),
      });

      const result = await response.json();

      if (response.ok && result.success) {
        alert("Signup successful!");
        // added id to sessionstorage
        sessionStorage.setItem("userId", result.id);
        sessionStorage.setItem("userType", loginData.userType);
        if (userType === 1) {
          window.location.href = "/seller"; // Redirect to seller page
        } else {
          window.location.href = "/"; // Redirect to buyer homepage
        }
      } else {
        alert(result.message || "Signup failed. Please try again.");
      }
    } catch (error) {
      console.error("Error during signup:", error);
      alert("An error occurred. Please try again.");
    }
  });

//login

document
  .getElementById("loginForm")
  .addEventListener("submit", async (event) => {
    event.preventDefault(); // Prevent default form submission

    // Collect login info
    const loginData = {
      email: document.getElementById("loginEmail").value,
      password: document.getElementById("loginPassword").value,
      userType: document.getElementById("radioBtn1").checked ? 1 : 0, // 1 = seller, 0 = buyer
    };

    try {
      // Send login data to backend
      const response = await fetch("/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(loginData),
      });

      const result = await response.json();

      if (response.ok && result.success) {
        alert("Login successful!");
        // added id to sessionstorage
        sessionStorage.setItem("userId", result.id);
        sessionStorage.setItem("userType", loginData.userType);
        if (loginData.userType === 1) {
          window.location.href = "/seller"; // Redirect to seller page
        } else {
          window.location.href = "/"; // Redirect to buyer homepage
        }
      } else {
        alert(result.message || "Login failed. Please check your credentials.");
      }
    } catch (error) {
      console.error("Error during login:", error);
      alert("An error occurred. Please try again.");
    }
  });
