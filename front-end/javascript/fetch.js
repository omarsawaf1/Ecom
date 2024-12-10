document
  .getElementById("checkout-form")
  .addEventListener("submit", async (event) => {
    event.preventDefault(); // Prevent form submission

    // Collect Billing Info
    const billingInfo = {
      fullName: document.getElementById("name").value,
      email: document.getElementById("email").value,
      address: document.getElementById("address").value,
      city: document.getElementById("city").value,
      postalCode: document.getElementById("postal-code").value,
    };

    // Collect Card Info
    const cardInfo = {
      cardName: document.getElementById("card-name").value,
      cardNumber: document.getElementById("card-number").value,
      expiryMonth: document.getElementById("expiry-month").value,
      expiryYear: document.getElementById("expiry-year").value,
      cvv: document.getElementById("cvv").value,
    };

    // Collect Cart Items from Session Storage
    const cartItems = JSON.parse(sessionStorage.getItem("cart")) || [];

    // Combine Data into One Payload (object)
    const orderData = {
      billingInfo,
      cardInfo,
      cartItems,
    };

    try {
      // Send Data to Backend
      const response = await fetch("https://httpbin.org/post", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(orderData),
      });

      if (response.ok) {
        const result = await response.json();
        alert("Order placed successfully!");
        sessionStorage.removeItem("cart"); // Clear cart after successful order
        window.location.href = "../order/order.html"; // Redirect to order page
      } else {
        alert("Failed to place the order. Please try again.");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("An error occurred. Please try again.");
    }
  });
