let productsContainer = document.querySelector(".products-container");

fetch("products-data.json")
  .then((response) => response.json())
  .then((data) => showproducts(data))
  .catch((error) => {
    console.log(error);
  });

// pot dolosi asta pt un event listener pt navigatie si sidebar
function showproducts(data) {
  // if (data.category == true) {
  // }
  let output = "";
  data.forEach((product) => {
    if (product.mainCategory == "systems") {
      output += `
                <div class="card product-card col-md-4 m-3 col-sm-6 col-xl-3">
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
                    <div class="card-footer p-4 pt-0 border-top-0 bg-transparent">
                        <div class="text-center"><a class="btn btn-outline-dark mt-auto details-btn" href="./details.html?id=${product.id}">Details</a></div>
                    </div>
            </div>
            `;
    }

    productsContainer.innerHTML = output;
  });
}
