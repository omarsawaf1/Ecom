// to add "<p class='no-results'>No products found.</p>" when there is no result and data.sucess true but not in database
// also add to focus after deleting from search and find better way than reloding
// search
document.addEventListener("DOMContentLoaded", () => {
  const searchInput = document.querySelector(".searchInput");
  const shopItemContainer = document.getElementById("shop-item-container");

  // Function to fetch and display products based on the search query
  const searchProducts = async (query) => {
    try {
      const response = await fetch(`/api/products/search?name=${query}`);
      const data = await response.json();

      if (data.success) {
        displayProducts(data.result); // Display the search results
      } else {
        console.error("Error fetching search results:", data.message);
        shopItemContainer.innerHTML =
          "<p class='no-results'>No products found.</p>";
      }
    } catch (error) {
      console.error("Fetch error:", error);
      shopItemContainer.innerHTML =
        "<p class='error-message'>An error occurred while fetching products.</p>";
    }
  };

  // Function to display products
  const displayProducts = async (products) => {
    shopItemContainer.innerHTML = ""; // Clear previous results
    for (const product of products) {
      // Fetch image data for each product
      let imageData = await displayImage(product);
      //handling errors of null
      if (!imageData) {
        imageData = [{ image_url: "../pictures/default.jpeg" }];
      }
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
  };
  async function displayImage(product) {
    try {
      const response = await fetch(
        `/api/products/images/${product.product_id}`
      );
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

  // Add an event listener for the search bar
  searchInput.addEventListener("input", (event) => {
    const query = event.target.value.trim(); // Get the search query

    if (query.length > 0) {
      searchProducts(query); // Fetch products if query is not empty
    } else {
      location.reload();
      searchInput.focus();
    }
  });
});
