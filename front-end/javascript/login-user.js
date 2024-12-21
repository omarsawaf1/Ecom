const goToLogin = document.querySelector(".login-btn");
const loginDiv = document.querySelector(".navItem");
const userType = sessionStorage.getItem("userType");
const myProfile = document.getElementById("myProfile");
const myCart = document.getElementById("myCart");
const myCartSpan = document.getElementById("myCartSpan");

console.log(`user type : ${userType}`);

const logoutBtn = document.createElement("button");
logoutBtn.classList.add("logout-btn");
logoutBtn.textContent = "LOG OUT";

if (userType !== null) {
  goToLogin.style.display = "none";
  loginDiv.appendChild(logoutBtn);
  logoutBtn.addEventListener("click", () => {
    sessionStorage.removeItem("userId");
    sessionStorage.removeItem("userType");
    alert("Logout successful!");
    window.location.href = "/";
  });
}

goToLogin.addEventListener("click", () => (window.location.href = "login"));

try {
  myProfile.addEventListener("click", () => {
    if (userType === "1") {
      window.location.href = "/seller";
    } else {
      window.location.href = "/buyer";
    }
  });

  if (userType === "1") {
    myCart.style.display = "none";
    myCartSpan.style.display = "none";
  }
} catch (error) {
  console.log(`Error don't worry error from login-user.js normal : ${error}`);
}
