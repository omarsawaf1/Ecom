let currentPage = 1; // Current page of products
const pageSize = 5; // Number of products per page
const category = "clothes"; // Example category
const shopItemContainer = document.getElementById("shop-item-container");
const loadMoreBtn = document.getElementById("load-more-btn");

// Load initial products when the page is loaded
document.addEventListener("DOMContentLoaded", () => {
  loadProducts();
});

// Function to load products for the current page
async function loadProducts() {
  try {
    // Fetch products with pagination
    const response = await fetch(
      `/api/products/search?category=${category}&page=${currentPage}&limit=${pageSize}`
    );
    const data = await response.json();

    if (data.success) {
      await displayProducts(data.result); // Display fetched products

      // Hide the Load More button if fewer products than pageSize are returned
      if (data.result.length < pageSize) {
        loadMoreBtn.style.display = "none";
      }
    } else {
      console.error("Error fetching products:", data.message);
      alert("Failed to fetch products.");
    }
  } catch (error) {
    loadMoreBtn.style.display = "none";
    console.error("Fetch error:", error);
    alert("No more products to fetch.");
  }
}

// Function to display products on the page
async function displayProducts(products) {
  // Use a for...of loop to handle asynchronous calls
  for (const product of products) {
    // Fetch image data for each product
    let imageData = await displayImage(product);
    //handling errors of null
    if (!imageData) {
      imageData = [{ image_url: "../pictures/default.jpeg" }];
    }

    // Construct product HTML
    const productHTML = `
      <div class="shop-item">
        <span class="shop-item-title">Product: ${product.name} <br> Brand: ${
      product.brand || "N/A"
    }</span>
          <img class="shop-item-image" src="${
            //imageData[0] is ? to handle if there
            imageData[0]?.image_url.trim()
          }" alt="${product.name}" />
        <div class="shop-item-details">
          <span class="shop-item-description">${product.description}</span>
          <span class="shop-item-price">${product.price} EGP</span>
          <p>Rating: ${product.average_rating} ★ (${
      product.rating_count
    } reviews)</p>
     <p>Available Units: ${product.available_units}</p>
          <button
            data-id="${product.product_id}"
            data-name="${product.name}"
            data-price="${product.price}"
            data-image="${imageData[0].image_url.trim()}"
            class="btn btn-primary shop-item-button"
            type="button"
          >
            ADD TO CART
          </button>
        </div>
      </div>
    `;

    // Append the product to the container
    shopItemContainer.innerHTML += productHTML;
  }
  addToCart();
}

// Function to fetch image data for a product
async function displayImage(product) {
  try {
    const response = await fetch(`/api/products/images/${product.product_id}`);
    const data = await response.json();

    if (data.success) {
      return data.result; // Return image data
    } else {
      console.error("Error fetching images:", data.message);
      return null; // Return null on failure
    }
  } catch (error) {
    console.error("Fetch error:", error);
    return null; // Return null on error
  }
}

// Load more products when the "Load More" button is clicked
loadMoreBtn.addEventListener("click", () => {
  currentPage++;
  loadProducts();
});
function addToCart() {
  document.querySelectorAll(".shop-item-button").forEach((button) => {
    button.addEventListener("click", () => {
      const item = {
        product_id: button.dataset.id,
        name: button.dataset.name,
        price: button.dataset.price,
        image: button.dataset.image,
        quantity: 1, // Default to 1
      };

      let cart = JSON.parse(sessionStorage.getItem("cart")) || [];

      const existingItem = cart.find(
        (cartItem) => cartItem.product_id === item.product_id
      );

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
}
