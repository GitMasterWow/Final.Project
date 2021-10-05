// ================================
// functionality for product examples
//=================================

let exampleProductsContainer = document.querySelector(".example-products");

fetch("https://61363d1b8700c50017ef54c5.mockapi.io/products")
  .then((response) => response.json())
  .then((data) => displayRandomProducts(data))
  .catch((error) => {
    console.log(error);
  });

function displayRandomProducts(data) {
  let products = [];
  data.forEach((product) => {
    products.push(product);
  });
  displayRandomComponents(products);
}

//here i will take randomly 7 numbers, not bigger than our arr length, and
// display the products with the id's correspondent with the random numbers
function displayRandomComponents(product) {
  let number1 = Math.floor(Math.random() * product.length + 1);
  let number2 = Math.floor(Math.random() * product.length + 1);
  let number3 = Math.floor(Math.random() * product.length + 1);
  let number4 = Math.floor(Math.random() * product.length + 1);
  let number5 = Math.floor(Math.random() * product.length + 1);
  let number6 = Math.floor(Math.random() * product.length + 1);
  let number7 = Math.floor(Math.random() * product.length + 1);
  console.log(number1, number2, number3);
  let output = "";
  product.forEach((product) => {
    if (
      product.id == number1 ||
      product.id == number2 ||
      product.id == number3 ||
      product.id == number4 ||
      product.id == number5 ||
      product.id == number6 ||
      product.id == number7
    ) {
      output += `
        <div class="col mb-5">
        <div class="card product-card col-md-4 mx-auto m-1 col-sm-6 col-xl-3">
        <!-- Product image-->
        <img class="card-img-top" src=${product.image} alt=${product.name} />
        <!-- Product details-->
        <div class="card-body p-4">
            <div class="text-center">
                <!-- Product name-->
                <h5 class="fw-bolder">${product.name}</h5>
                <!-- Product price-->
                <h5>$ ${product.price}</h5>
            </div>
        </div>
        <!-- Product actions-->
        <div class="row bg-transparent">
            <div class="container mb-4 text-center"><a class="btn btn-outline-dark mt-auto details-btn" href="./details.html?id=${product.id}">Details</a></div>
        </div>
        </div>
        </div>`;
    }
  });
  output += `
    <div
      class="col mb-5 col-sm-12 d-flex align-self-center justify-content-center"
    >
      <button type="button" class="btn">
        <a
          href="./components.html"
          type="button"
          class="
            btn btn-outline-dark
            ml
            btn-md btn-rounded btn-navbar
            waves-effect waves-light
            fw-bolder
          "
        >
          See more
        </a>
      </button>
    </div>`;
  exampleProductsContainer.innerHTML = output;
}
//==============================================
