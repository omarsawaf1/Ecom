const userId = sessionStorage.getItem("userId");
console.log(`user id : ${userId}`);

if (userId === null) {
  alert("You are not logged in.");
  window.location.href = "login";
}
document.addEventListener("DOMContentLoaded", () => {
  ready();
});
function ready() {
  document
    .getElementById("checkout-form")
    .addEventListener("submit", async (event) => {
      event.preventDefault(); // Prevent form submission

      // Collect Billing Info
      const additionalDetails = {
        street1: document.getElementById("street").value,
        city: document.getElementById("city").value,
        state: document.getElementById("state").value,
        country: document.getElementById("country").value,
        zipcode: document.getElementById("zip").value,
      };

      // Collect Card Info
      const cardInfo = {
        cardNumber: document.getElementById("cardNumber").value,
        cardHolderName: document.getElementById("cardName").value,
        expiryDate: document.getElementById("cardExpiry").value,
        cvv: document.getElementById("cvv").value,
      };

      // Collect Cart Items from Session Storage
      const cartItems = JSON.parse(sessionStorage.getItem("cart")) || [];
      console.log(cartItems);

      if (cartItems.length === 0) {
        alert("Your cart is empty.");
        return;
      }

      // Create an order object
      const order = {
        productOrders: cartItems.map((item) => ({
          product_id: parseInt(item.product_id, 10),
          quantity: item.quantity,
        })),
      };

      console.log("Order Object:", order);

      try {
        // Check if card info already exists
        const checkCardResponse = await fetch(
          `api/buyers/${userId}/credit-card/`
        );
        const checkCardData = await checkCardResponse.json();

        let cardExists = false;

        if (checkCardResponse.ok && checkCardData.success) {
          const existingCards = checkCardData.result.data || [];
          cardExists = existingCards.some(
            (card) =>
              card.card_number ===
              `************${cardInfo.cardNumber.slice(-4)}`
          );
        }

        if (cardExists) {
          console.log("Card already exists. Skipping card info submission.");
        } else {
          console.log("Card does not exist. Submitting new card info.");
          const responseCard = await fetch(
            `api/buyers/${userId}/credit-card/`,
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(cardInfo),
            }
          );

          if (!responseCard.ok) {
            throw new Error("Failed to submit card info.");
          }
        }

        // Send additional details
        const responseDetails = await fetch(
          `api/buyers/${userId}/additional-details/`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(additionalDetails),
          }
        );

        if (!responseDetails.ok) {
          throw new Error("Failed to submit additional details.");
        }

        // Submit the order
        const responseOrder = await fetch(`api/buyers/${userId}/orders/`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(order),
        });

        if (responseOrder.ok) {
          const resultOrder = await responseOrder.json();
          console.log("Order Result:", resultOrder);

          alert("Order placed successfully!");
          sessionStorage.removeItem("cart"); // Clear cart after successful order
          window.location.href = "buyer"; // Redirect to order page
        } else {
          alert("Failed to place the order. Please try again.");
        }
      } catch (error) {
        console.error("Error:", error);
        alert("An error occurred. Please try again.");
      }
    });
}
