const sellerId = sessionStorage.getItem("userId");
console.log(`user id : ${sellerId}`);
if (sellerId === null) {
  alert("You are not logged in.");
 // window.location.href = "login";
}
const sellerForm = document.getElementById('sellerForm');
const submitBtn = document.getElementById('submit');
const sellerName = document.getElementById('productName');
const brand = document.getElementById('brand');
const available_units = document.getElementById('units');
const price = document.getElementById('price');
const category = document.getElementById('category_id');
const description = document.getElementById('description');

// const sellerId = sessionStorage.getItem('id');


console.log(sellerName);
sellerForm.addEventListener("submit", async (event) => {
  event.preventDefault();
  console.log(sellerName);
  console.log(sellerName.value);

  const data = {
    name: sellerName.value,
    brand: brand.value,
    available_units: available_units.value,
    price: price.value,
    category_id: category.value,
    description: description.value
  };

  try {
    // Send Data to Backend
    const response = await fetch(`/api/sellers/${sellerId}/products`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    });

    if (response.ok) {
      const result = await response.json();
      alert("Product uploaded successfully!");
    } else {
      alert("Failed to upload the product. Please try again.");
    }
  } catch (error) {
    console.error("Error:", error);
    alert("An error occurred. Please try again.");
  }
});
