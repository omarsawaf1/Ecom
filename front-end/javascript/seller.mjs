
const form = document.getElementById('form');
const submitBtn = document.getElementById('submit');

submitBtn.addEventListener('click', (e) => {
  e.preventDefault();
  const formData = new FormData(form);
  const name = formData.get('name');
  const brand = formData.get('brand');
  const available_units = formData.get('available_units');
  const price = formData.get('price');
  const category = formData.get('category');
  const description = formData.get('description');

  // Post data to database item by item
  postDataToDatabase(name,  price, brand,  available_units, category, description);
});

function postDataToDatabase(name, price, brand, available_units, category, description ) {
  const url = '/upload_product';
  const data = {
    name: name,
    brand: brand,
    available_units: available_units,
    price: price,
    category: category,
    description: description
  };

  fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  })
  .then((response) => response.json())
  .then((data) => console.log(data))
  .catch((error) => console.error(error));
}