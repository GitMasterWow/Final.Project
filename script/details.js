window.onload = () => {
  let searchParamString = window.location.search;

  const searchParam = new URLSearchParams(searchParamString);

  console.log(searchParam.get("id"));
  const id = searchParam.get("id");
  // document.write("Detaliile produsului cu id-ul " + id);

  fetch("products-data.json")
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
              <div class="col-md-4">
                <img
                  class="card-img mb-5 mb-md-0"
                  src=${product.image}
                  alt=${product.name}
                />
              </div>
              <div class="col-md-8">
                <h1 class="display-5 fw-bolder details-name">${product.name}</h1>
                <div class="fs-5 mb-5">
                  <h5>$<span class="details-price">${product.price}</span></h5>
                  <p>Products in stock: <span class="details-stock">${product.quantity}</span></p>
                </div>
                <div class="d-flex">
                  <label class="m-2" for="inputQuantity"><h5>Qt</h5></label>
                  <input
                    class="form-control text-center me-3 p-0"
                    id="inputQuantity"
                    type="number"
                    value="1"
                    max="10"
                    style="max-width: 4rem"
                  />
                  <button
                    class="btn btn-outline-dark flex-shrink-0"
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
      }
    });
    detailsContainer.innerHTML = output;
  }
};
