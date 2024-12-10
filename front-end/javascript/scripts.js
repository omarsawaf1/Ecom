const goToLogin = document.querySelector(".login-btn");

goToLogin.addEventListener("click", () => (window.location.href = "login"));
// test
document.querySelectorAll(".shop-item-button").forEach((button) => {
  button.addEventListener("click", () => {
    const item = {
      id: button.dataset.id, // Assuming each button has a data-id attribute
      name: button.dataset.name,
      price: button.dataset.price,
      image: button.dataset.image,
      quantity: 1, // Default to 1
    };

    let cart = JSON.parse(sessionStorage.getItem("cart")) || [];

    const existingItem = cart.find((cartItem) => cartItem.id === item.id);

    if (existingItem) {
      existingItem.quantity += 1; // Increase quantity if item exists
    } else {
      cart.push(item); // Add new item
    }

    sessionStorage.setItem("cart", JSON.stringify(cart));
    alert(`${item.name} added to cart!`);
  });
});
console.log(sessionStorage);
