let productsContainer = document.querySelector(".products-container");

fetch("products-data.json")
  .then((response) => response.json())
  .then((data) => showproducts(data))
  .catch((error) => {
    console.log(error);
  });

// pot dolosi asta pt un event listener pt navigatie si sidebar
function showproducts(data) {
  if (data.category == true) {
  }
  let output = "";
  data.forEach((product) => {
    if (product.category == "CPUs") {
      output += `
            <div class="col mb-5">
                <div class="card h-100 col-xl-3 col-md-6 col-sm-11">
                    <!-- Product image-->
                    <img class="card-img-top" src=${product.image} alt=${product.name} />
                    <!-- Product details-->
                    <div class="card-body p-4">
                        <div class="text-center">
                            <!-- Product name-->
                            <h5 class="fw-bolder">${product.name}</h5>
                            <!-- Product price-->
                            <h5>${product.price}</h5>
                        </div>
                    </div>
                    <!-- Product actions-->
                    <div class="card-footer p-4 pt-0 border-top-0 bg-transparent">
                        <div class="text-center"><a class="btn btn-outline-dark mt-auto" href="#">View options</a></div>
                    </div>
                </div>
            </div>
            `;
    }

    productsContainer.innerHTML = output;
  });

  // let productsData = data.map(function(product){
  //         return `<div class="menu-item col-2">
  //         <img src=${product.image} class="photo" alt=${product.name}>
  //         <div class="item-info">
  //           <header>
  //             <h4>${product.name}</h4>
  //             <h4 class="price">${product.price}</h4>
  //           </header>
  //           <p class="item-text">${product.description}</p>
  //         </div>
  //       </div>`;

  //   });

  // productsData = productsData.join("");

  //productsContainer.innerHTML = productsData;
}
