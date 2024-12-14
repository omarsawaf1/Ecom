// Constants for categories and discount
const categories = ["supermarket", "clothes", "electronics"];
const discount = 0.6; // 60% off

// Fetch random products for each category
async function fetchDeals() {
  const dealsContainer = document.getElementById("deals-container");
  dealsContainer.innerHTML = ""; // Clear any previous content

  for (const category of categories) {
    try {
      const response = await fetch(`/api/products/search?category=${category}`);
      const data = await response.json();

      if (data.success && data.result.length > 0) {
        // Shuffle and pick 5 random products
        const products = shuffleArray(data.result).slice(0, 5);

        // Create category section
        const section = document.createElement("section");
        section.classList.add("deals-section");
        section.innerHTML = `<h2>${capitalize(category)} Deals</h2>`;
        const productContainer = document.createElement("div");
        productContainer.classList.add("product-container");

        // Add products to the section
        products.forEach((product) => {
          const discountedPrice = (product.price * discount).toFixed(2);
          const productCard = `
            <div class="product-card">
              <img 
                src="/pictures/${product.name.split(" ").join("_")}.jpg" 
                alt="${product.name}" 
                class="product-image" 
                data-category="${category}" 
              />
              <div class="product-info">
                <h3>${product.name}</h3>
                <p>Brand: ${product.brand}</p>
                <span class="shop-item-description">${
                  product.description
                }</span>
                <p>Original Price: <s>${product.price} EGP</s></p>
                <p>Sale Price: ${discountedPrice} EGP</p>
                <p>Rating: ${product.average_rating} ★ (${
            product.rating_count
          } reviews)</p>
              </div>
            </div>
          `;
          productContainer.innerHTML += productCard;
        });

        section.appendChild(productContainer);
        dealsContainer.appendChild(section);
      } else {
        console.error(`No products found for category: ${category}`);
      }
    } catch (error) {
      console.error(`Error fetching products for category: ${category}`, error);
    }
  }

  // Add navigation to category pages on image click
  document.querySelectorAll(".product-image").forEach((img) => {
    img.addEventListener("click", () => {
      const category = img.getAttribute("data-category");
      if (category) {
        window.location.href = `/${category}`;
      }
    });
  });
}

// Shuffle an array randomly
function shuffleArray(array) {
  return array.sort(() => Math.random() - 0.5);
}

// Capitalize the first letter of a string
function capitalize(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

// Fetch and display deals on page load
document.addEventListener("DOMContentLoaded", fetchDeals);
