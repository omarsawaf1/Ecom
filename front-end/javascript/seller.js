const sellerId = sessionStorage.getItem("userId");
console.log(`user id : ${sellerId}`);
if (!sellerId) {
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
  displaySellerInfo();
  displayProducts();
  setupFormSubmission();
});

function setupFormSubmission() {
  const sellerForm = document.getElementById("sellerForm");
  sellerForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    const data = {
      name: document.getElementById("productName").value,
      brand: document.getElementById("brand").value,
      available_units: document.getElementById("units").value,
      price: document.getElementById("price").value,
      category_id: document.getElementById("category_id").value,
      description: document.getElementById("description").value,
    };

    try {
      const response = await fetch(`/api/sellers/${sellerId}/products`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (response.ok && result.success) {
        alert("Product uploaded successfully!");
        displayProducts(); // Refresh products after successful upload
      } else {
        console.error("Failed to upload the product:", result.message);
        alert(
          result.message || "Failed to upload the product. Please try again."
        );
      }
    } catch (error) {
      console.error("Error:", error);
      alert("An error occurred. Please try again.");
    }
  });
}

async function displaySellerInfo() {
  const info = await fetchSellerInfo();
  if (!info) return;

  const userInfoSection = document.getElementById("user-info");
  userInfoSection.innerHTML = `
    <h2>User Info:</h2>
    <p>Email: ${info.email}</p>
    <p>Name: ${info.fname} ${info.lname}</p>
    <p>Description: ${info.description}</p>
    <p>Rating: ${info.average_rating} ★ (${info.rating_count} reviews)</p>
  `;
}

async function displayProducts() {
  const products = await fetchSellerProducts();
  if (!products) return;

  const productsSection = document.getElementById("seller-products");
  productsSection.innerHTML = "";
  products.forEach((product) => {
    const productHTML = document.createElement("div");
    productHTML.className = "seller-item";
    productHTML.innerHTML = `
      <h4>Product: ${product.name} <br> Brand: ${product.brand || "N/A"}</h4>
      <p>${product.description}</p>
      <p>Price: ${product.price} EGP</p>
      <p>Rating: ${product.average_rating} ★ (${
      product.rating_count
    } reviews)</p>
      <p>Available Units: ${product.available_units}</p>
      <p>Total Units Sold: ${product.units_sold}</p>
      <p>Total Revenue: ${product.total_revenue}</p>
    `;
    productsSection.appendChild(productHTML);
  });
}

async function fetchSellerInfo() {
  try {
    const response = await fetch(`/api/sellers/${sellerId}/`);
    const data = await response.json();

    if (response.ok && data.success) {
      return data.result.data;
    } else {
      console.error("Error fetching user info:", data.message);
      alert(data.message || "Failed to fetch user info.");
      return null;
    }
  } catch (error) {
    console.error("Fetch error:", error);
    alert("An error occurred while fetching user info.");
    return null;
  }
}

async function fetchSellerProducts() {
  try {
    const response = await fetch(`/api/sellers/${sellerId}/products`);
    const data = await response.json();

    if (response.ok && data.success) {
      return data.result.data;
    } else {
      console.error("Error fetching user products:", data.message);
      alert(data.message || "Failed to fetch user products.");
      return null;
    }
  } catch (error) {
    console.error("Fetch error:", error);
    alert("An error occurred while fetching user products.");
    return null;
  }
}
