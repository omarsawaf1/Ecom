document.addEventListener("DOMContentLoaded", () => {
  const categories = ["supermarket", "clothes", "electronics"];

  categories.forEach((category) => {
    loadCategoryProducts(category);
  });
});

async function loadCategoryProducts(category) {
  try {
    const response = await fetch(
      `/api/products/search?category=${category}&limit=${10}`
    );
    const data = await response.json();

    if (data.success && data.result.length > 0) {
      const products = data.result;
      const container = document.querySelector(
        `#${category} .preview-item-container`
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
              <span class="shop-item-description">${product.description}</span>
              <p>Price: ${product.price} EGP</p>
               <p>Rating: ${product.average_rating} ★ (${
          product.rating_count
        } reviews)</p>
          <p>Available Units: ${product.available_units}</p>
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
//  slider
//  needs fix next button doesn't appear on load
document.querySelectorAll(".category-btn").forEach((category) => {
  const shopContainer = category.querySelector(".preview-item-container");
  const prevButton = category.querySelector(".slider-button.prev");
  const nextButton = category.querySelector(".slider-button.next");

  // Function to toggle button visibility
  const updateButtonVisibility = () => {
    const scrollLeft = shopContainer.scrollLeft;
    const scrollWidth = shopContainer.scrollWidth - shopContainer.clientWidth;

    // Hide prev button if at the start
    if (scrollLeft <= 0) {
      prevButton.style.display = "none";
    } else {
      prevButton.style.display = "flex";
    }

    // Hide next button if at the end
    if (scrollLeft >= scrollWidth) {
      nextButton.style.display = "none";
    } else {
      nextButton.style.display = "flex";
    }
  };

  // Initial check on page load
  updateButtonVisibility();

  // Scroll event to check position
  shopContainer.addEventListener("scroll", updateButtonVisibility);

  // Button click events
  prevButton.addEventListener("click", () => {
    shopContainer.scrollBy({ left: -250, behavior: "smooth" });
  });

  nextButton.addEventListener("click", () => {
    shopContainer.scrollBy({ left: 250, behavior: "smooth" });
  });
});
