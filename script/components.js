let productsContainer = document.querySelector(".products-container");
let sidebar = document.querySelector(".dashboard-links");

let componentsData = []; // in this array i will store all the products in components category

fetch("https://61363d1b8700c50017ef54c5.mockapi.io/products")
  .then((response) => response.json())
  .then((data) => showproducts(data))
  .catch((error) => {
    console.log(error);
  });

// here all the products from components category are loaded and stored in an array
function showproducts(data) {
  let output = "";
  data.forEach((product) => {
    if (product.mainCategory == "components") {
      componentsData.push(product);
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
console.log(componentsData);

// here will add functionaliti for the sidebar
sidebar.addEventListener("click", (ev) => {
  let output = "";
  let categoryID = ev.target.id;
  if (!categoryID) {
    output = '<h1 class="mt-4">Please select a category</h1>';
  } else if (categoryID == "all-products") {
    componentsData.forEach((product) => {
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
                        <div class="text-center"><a class="btn btn-outline-dark mt-auto" href="./details.html?id=${product.id}">Details</a></div>
                    </div>
            </div>
            `;
    });
  } else {
    componentsData.forEach((product) => {
      // here, we filter the array using the id's from sidebar wich match withe category names
      if (product.category == categoryID) {
        output += `   
        <div class="card product-card col-md-4 m-3 col-sm-6 col-xl-3">
            <!-- Product image-->
            <img class="card-img-top" src=${product.image} alt=${product.name} />
            <!-- Product details-->
            <div class="card-body p-2">
                <div class="text-center">
                    <!-- Product name-->
                    <h5 class="fw-bolder">${product.name}</h5>
                    <!-- Product price-->
                    <h5>$ ${product.price}</h5>
                </div>
            </div>
            <!-- Product actions-->
            <div class="card-footer p-4 pt-0 border-top-0 bg-transparent">
                <div class="text-center"><a class="btn btn-outline-dark mt-auto" href="./details.html?id=${product.id}">Details</a></div>
            </div>
         </div>
          `;
      }
    });
  }
  productsContainer.innerHTML = output;
});
