window.onload = () => {
  let searchParamString = window.location.search;

  const searchParam = new URLSearchParams(searchParamString);
  // here the id is extracted from the url querry
  const id = searchParam.get("id");

  fetch("https://61363d1b8700c50017ef54c5.mockapi.io/products")
    .then((response) => response.json())
    .then((data) => displayProductDetails(data))
    .catch((error) => {
      console.log(error);
    });

  function displayProductDetails(data) {
    let detailsContainer = document.querySelector(".details-container");
    let output = "";

    data.forEach((product) => {
      if (product.id == id) {
        output += `  <div class="py-5">
          <div class="container px-4 px-lg-5 my-5">
            <div class="row gx-4 gx-lg-5 align-items-center">
              <div class="col-md-6 col-xl-6">
                <img
                  class="card-img mb-5 mb-md-0"
                  src=${product.image}
                  alt=${product.name}
                />
              </div>
              <div class="col-md-6 col-xl-6">
                <h1 class="display-5 fw-bolder details-name">${product.name}</h1>
                <div class="fs-5 mb-5">
                  <h5>$<span class="details-price">${product.price}</span></h5>
                  <p>Products in stock: <span class="details-stock">${product.quantity}</span></p>
                </div>
                <div class="d-flex">
                  <label class="m-2" for="inputQuantity"><h5>Qt (max 10 items)</h5></label>
                  <input
                    class="form-control text-center me-3 p-0"
                    id="inputQuantity"
                    type="number"
                    value="1"
                    max="10"
                    style="max-width: 4rem"
                  />
                  <button
                    class="btn btn-outline-dark flex-shrink-0 add-to-cart-btn"
                    type="button"
                  >
                    <i class="bi-cart-fill me-1"></i>
                    Add to cart
                  </button>
                </div>
                <div class="product-details my-3">
                  <h5 class="my-3 details-description">${product.description}</h4>
                </div>
              </div>
            </div>
          </div>
        </div>`;
        detailsContainer.innerHTML = output;
        addProductToCart(product);
      }
    });
  }
};
let cart = [];

function addProductToCart(product) {
  let selectedProduct = product; // here the product data is put inside selectedProduct variable
  console.log(selectedProduct);
  let addToCartBtn = document.querySelector(".add-to-cart-btn");
  addToCartBtn.addEventListener("click", () => {
    selectedProduct.qtToBuy = document.querySelector("#inputQuantity").value;
    if (selectedProduct.qtToBuy >= 10) {
      selectedProduct.qtToBuy = 10;
      document.querySelector("#inputQuantity").value = 10;
    } else {
      selectedProduct.qtToBuy = document.querySelector("#inputQuantity").value;
    }
    cart.push(selectedProduct);
    console.log(selectedProduct.qtToBuy);
    console.log(cart);
    localStorage.setItem("cart", JSON.stringify(cart));
  });
}
