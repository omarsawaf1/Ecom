document.addEventListener("DOMContentLoaded", () => {
  const categories = ["supermarket", "clothes", "electronics"];

  categories.forEach((category) => {
    loadCategoryProducts(category);
  });
});

async function loadCategoryProducts(category) {
  try {
    const response = await fetch(`/api/products/search?category=${category}`);
    const data = await response.json();

    if (data.success && data.result.length > 0) {
      const products = data.result;
      const container = document.querySelector(
        `#${category} .shop-item-container`
      );
      container.innerHTML = ""; // Clear any existing content

      products.forEach((product) => {
        const productCard = document.createElement("div");
        productCard.classList.add("product-card");
        // image is made from a new way name of product must be the image
        productCard.innerHTML = `
            <img 
              src="/pictures/${product.name.split(" ").join("_")}.jpg" 
              alt="${product.name}" 
              class="product-image" 
              data-category="${category}" 
            />
            <div class="product-info">
              <h3>${product.name}</h3>
              <p>Brand: ${product.brand}</p>
              <p>Price: $${product.price}</p>
              <p>Rating: ${product.average_rating} ★</p>
            </div>
          `;

        // Add click event to the image
        const productImage = productCard.querySelector(".product-image");
        productImage.addEventListener("click", () => {
          window.location.href = `/${category}`;
        });

        container.appendChild(productCard);
      });
    } else {
      console.warn(`No products found for category: ${category}`);
    }
  } catch (error) {
    console.error(`Failed to fetch products for category: ${category}`, error);
  }
}
