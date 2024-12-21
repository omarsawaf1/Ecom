const cart = JSON.parse(sessionStorage.getItem("cart")) || [];
console.log(sessionStorage);

document.addEventListener("DOMContentLoaded", () => {
  addToCart();
  ready();
  setupDeliverySelection();
});

function ready() {
  let removeCartItemButtons = document.getElementsByClassName("btn-danger");
  for (let i = 0; i < removeCartItemButtons.length; i++) {
    let button = removeCartItemButtons[i];
    button.addEventListener("click", removeCartItem);
  }

  let quantityInputs = document.getElementsByClassName("cart-quantity-input");
  for (let i = 0; i < quantityInputs.length; i++) {
    let input = quantityInputs[i];
    input.addEventListener("change", quantityChanged);
  }
  // last changed
  // document
  //   .getElementsByClassName("btn-purchase")[0]
  //   .addEventListener("click", purchaseClicked);
}

// function purchaseClicked() {
//   let cartItems = document.getElementsByClassName("cart-items")[0];
//   while (cartItems.hasChildNodes()) {
//     cartItems.removeChild(cartItems.firstChild);
//   }
//   updateCartTotal();
// }

function removeCartItem(event) {
  let buttonClicked = event.target;
  let cartRow = buttonClicked.parentElement.parentElement;
  let title = cartRow.getElementsByClassName("cart-item-title")[0].innerText;

  // Remove item from session storage
  const updatedCart = cart.filter((item) => item.name !== title);
  sessionStorage.setItem("cart", JSON.stringify(updatedCart));

  cartRow.remove();
  updateCartTotal();
}

function quantityChanged(event) {
  let input = event.target;
  if (isNaN(input.value) || input.value <= 0) {
    input.value = 1;
  }

  let cartRow = input.parentElement.parentElement;
  let title = cartRow.getElementsByClassName("cart-item-title")[0].innerText;

  // Update quantity in session storage
  const updatedCart = cart.map((item) =>
    item.name === title ? { ...item, quantity: parseInt(input.value) } : item
  );
  sessionStorage.setItem("cart", JSON.stringify(updatedCart));

  updateCartTotal();
}

function updateCartTotal() {
  let cartItemContainer = document.getElementsByClassName("cart-items")[0];
  let cartRows = cartItemContainer.getElementsByClassName("cart-row");
  let subtotal = 0;

  for (let i = 0; i < cartRows.length; i++) {
    let cartRow = cartRows[i];
    let priceElement = cartRow.getElementsByClassName("cart-price")[0];
    let quantityElement = cartRow.getElementsByClassName(
      "cart-quantity-input"
    )[0];
    let price = parseFloat(priceElement.innerText.replace(" EGP", ""));
    let quantity = quantityElement.value;
    subtotal += price * quantity;
  }
  subtotal = Math.round(subtotal * 100) / 100;
  document.getElementsByClassName("cart-total-price")[0].innerText =
    subtotal + " EGP";

  // Update total with delivery cost
  const deliverySelect = document.querySelector(".summary-delivery-selection");
  const shippingValue = document.querySelector(".shipping-value");
  const basketTotal = document.getElementById("basket-total");

  let deliveryCost = deliverySelect.value === "collection" ? 0 : 50;
  shippingValue.innerText = `${deliveryCost} EGP`;

  let total = subtotal + deliveryCost;
  basketTotal.innerText = `${total} EGP`;
  // sessionStorage.setItem("total", JSON.stringify(total));
}

function setupDeliverySelection() {
  const deliverySelect = document.querySelector(".summary-delivery-selection");
  deliverySelect.addEventListener("change", updateCartTotal);
}
function addToCart() {
  const cartItemsContainer = document.getElementsByClassName("cart-items")[0];

  cart.forEach((item) => {
    let cartRow = document.createElement("div");
    cartRow.classList.add("cart-row");
    let cartRowContents = `
      <div class="cart-item cart-column">
          <img class="cart-item-image" src="${item.image}" width="100" height="100">
          <span class="cart-item-title">${item.name}</span>
      </div>
      <span class="cart-price cart-column">${item.price} EGP</span>
      <div class="cart-quantity cart-column">
          <input class="cart-quantity-input" type="number" min=1 value="${item.quantity}">
          <button class="btn btn-danger" type="button">REMOVE</button>
      </div>`;
    cartRow.innerHTML = cartRowContents;
    cartItemsContainer.append(cartRow);
  });

  ready(); // Ensure event listeners are added for new elements
  updateCartTotal();
}
