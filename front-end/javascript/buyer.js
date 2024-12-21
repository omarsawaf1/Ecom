// Get the buyer ID from the URL parameter
const buyerId = sessionStorage.getItem("userId");
console.log(`User ID: ${buyerId}`);
// const buyerId = 2;
if (buyerId === null) {
  alert("You are not logged in.");
  window.location.href = "login";
}
const logoutBtn = document.querySelector(".logout-btn");

logoutBtn.addEventListener("click", () => {
  sessionStorage.removeItem("userId");
  sessionStorage.removeItem("userType");
  alert("Logout successful!");
  window.location.href = "/";
});

document.addEventListener("DOMContentLoaded", () => {
  displayBuyerInfo();
  displayBuyerAddress();
  displayBuyerCredit();
  displayBuyerOrders();
});

// Display the user info
async function displayBuyerInfo() {
  const info = await fetchBuyerInfo();
  if (!info || info.length === 0) return;
  const userInfo = info;
  const userInfoSection = document.getElementById("user-info");
  // Check if any of the required fields are null TEST
  // if (
  //   userInfo.email === null ||
  //   userInfo.fname === null ||
  //   userInfo.lname === null
  // ) {
  //   return;
  // }
  let prime_user = "Prime Subscribtion is not Active";
  let prime_expiry_date = "Prime Subscribtion is not Active";
  if (userInfo.is_prime === 1) {
    prime_user = "Prime Subscribtion is Active";
    prime_expiry_date = userInfo.prime_expiry_date;
  }
  userInfoSection.innerHTML = `
      <h2>User Info:</h2>
      <p>Email: ${userInfo.email}</p>
      <p>Name: ${userInfo.fname + " " + userInfo.lname}</p>
      <p>Prime Subscribtion: ${prime_user}</p>
      <p>Prime Expiry Date: ${new Date(
        prime_expiry_date
      ).toLocaleDateString()}</p>
    `;
}
// Display the user address
async function displayBuyerAddress() {
  const info = await fetchBuyerAddress();
  if (!info || info.length === 0) return;

  const userAddress = info[0]; // Assuming the first item contains the relevant data
  const userInfoSection = document.getElementById("address-info");
  userInfoSection.innerHTML = `
      <h2>Addess Info:</h2>
      <p>Country: ${userAddress.country}</p>
      <p>City: ${userAddress.city}</p>
      <p>State: ${userAddress.state}</p>
      <p>Street: ${userAddress.street1}</p>
      <p>Zip Code: ${userAddress.zipcode}</p>
    `;
}

// Display the user's credit card info
async function displayBuyerCredit() {
  const creditInfo = await fetchBuyerCredit();
  if (!creditInfo || creditInfo.length === 0) return;

  const cardInfo = creditInfo[0]; // Assuming the first card is the primary one
  const creditInfoSection = document.getElementById("credit-info");
  creditInfoSection.innerHTML = `
      <h2>Card Info:</h2>
      <p>Cardholder Name: ${cardInfo.cardholder_name}</p>
      <p>Card Number: ${cardInfo.card_number}</p>
      <p>Expiry Date: ${new Date(cardInfo.expiry_date).toLocaleDateString()}</p>
    `;
}

// Display the user's orders
async function displayBuyerOrders() {
  const orders = await fetchBuyerOrders();
  if (!orders || orders.length === 0) {
    const ordersSection = document.getElementById("orders-info");
    ordersSection.innerHTML = "<p>No orders found.</p>";
    return;
  }

  const ordersHTML = await Promise.all(
    orders.map(async (order) => {
      const productsHTML = await Promise.all(
        order.products.map(async (product) => {
          const productDetails = await fetchProductDetails(product.product_id);
          if (!productDetails) return `<li>Product details unavailable</li>`;
          return `
            <li>
              <strong>${productDetails.name}</strong> (${
            productDetails.brand
          })<br>
              Price: ${productDetails.price} EGP<br>
              Quantity: ${
                order.products.find((p) => p.product_id === product.product_id)
                  .quantity
              }
            </li>
          `;
        })
      );

      return `
        <div class="order">
          <h3>Order ID: ${order.order_id}</h3>
          <p>Total Price: ${order.total_price} EGP</p>
          <p>Order Date: ${new Date(order.order_date).toLocaleString()}</p>
          <p>Status: ${order.status}</p>
          <h4>Products:</h4>
          <ul>${productsHTML.join("")}</ul>
        </div>
      `;
    })
  );

  const ordersSection = document.getElementById("orders-info");
  
  ordersSection.innerHTML = `
    <h2>Orders Info:</h2>
    ${ordersHTML.join("")}
  `;
}

// Fetch buyer info
async function fetchBuyerInfo() {
  try {
    const response = await fetch(`/api/buyers/${buyerId}/`);
    const data = await response.json();

    if (data.success) {
      return data.result.data; // Return the info array
    } else {
      console.error("Error fetching user info:", data.message);
      alert("Failed to fetch user info.");
      return null;
    }
  } catch (error) {
    console.error("Fetch error:", error);
    alert("An error occurred while fetching user info.");
    return null;
  }
}
// Fetch buyer address
async function fetchBuyerAddress() {
  try {
    const response = await fetch(`/api/buyers/${buyerId}/additional-details`);
    const data = await response.json();

    if (data.success) {
      return data.result.data; // Return the info array
    } else {
      console.error("Error fetching user address:", data.message);
      alert("Failed to fetch user address.");
      return null;
    }
  } catch (error) {
    console.error("Fetch error:", error);
    alert("An error occurred while fetching user address.");
    return null;
  }
}

// Fetch buyer credit card info
async function fetchBuyerCredit() {
  try {
    const response = await fetch(`/api/buyers/${buyerId}/credit-card`);
    const data = await response.json();

    if (data.success) {
      return data.result.data; // Return the credit card info array
    } else {
      console.error("Error fetching credit card info:", data.message);
      alert("Failed to fetch credit card info.");
      return null;
    }
  } catch (error) {
    console.error("Fetch error:", error);
    alert("An error occurred while fetching credit card info.");
    return null;
  }
}

// Fetch buyer orders
async function fetchBuyerOrders() {
  try {
    const response = await fetch(`/api/buyers/${buyerId}/orders`);
    const data = await response.json();

    if (data.success) {
      return data.result.orders; // Return the orders array
    } else {
      console.error("Error fetching orders:", data.message);
      alert("Failed to fetch orders.");
      return [];
    }
  } catch (error) {
    console.error("Fetch error:", error);
    alert("An error occurred while fetching orders.");
    return [];
  }
}

// Fetch product details using product_id
async function fetchProductDetails(productId) {
  try {
    const response = await fetch(`/api/products/${productId}`);
    const data = await response.json();

    if (data.success && data.result.length > 0) {
      return data.result[0]; // Return the first product details
    } else {
      console.error(`Error fetching product ${productId}:`, data.message);
      return null;
    }
  } catch (error) {
    console.error(`Fetch error for product ${productId}:`, error);
    return null;
  }
}
