let productsContainer = document.querySelector(".products-container");
let sidebar = document.querySelector(".dashboard-links");

let componentsData = []; // in this array i will store all the products in components category

fetch("products-data.json")
  .then((response) => response.json())
  .then((data) => showproducts(data))
  .catch((error) => {
    console.log(error);
  });

// pot dolosi asta pt un event listener pt navigatie si sidebar
function showproducts(data) {
  let output = "";
  data.forEach((product) => {
    if (product.mainCategory == "peripherals") {
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
                        <div class="text-center"><a class="btn btn-outline-dark mt-auto" href="./details.html?id=${product.id}">Details</a></div>
                    </div>
            </div>
            `;
    }

    productsContainer.innerHTML = output;
  });
}

sidebar.addEventListener("click", (ev) => {
  let output = "";
  let categoryID = ev.target.id;
  if (categoryID == "all-products") {
    console.log("all products");
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
                        <div class="text-center"><a class="btn btn-outline-dark mt-auto details-btn" href="./details.html?id=${product.id}">Details</a></div>
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
                <div class="text-center"><a class="btn btn-outline-dark mt-auto" href="#">Details</a></div>
            </div>
         </div>
          `;
      }
    });
  }
  productsContainer.innerHTML = output;
});
