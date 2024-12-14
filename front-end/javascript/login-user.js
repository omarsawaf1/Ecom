const goToLogin = document.querySelector(".login-btn");
const userType = sessionStorage.getItem("userType");
const myProfile = document.getElementById("myProfile");
const myCart = document.getElementById("myCart");

console.log(`user type : ${userType}`);

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
  }
} catch (error) {
  console.log(`Error don't worry error from login-user.js normal : ${error}`);
}
