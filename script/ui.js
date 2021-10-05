class UI {
  constructor() {
    this.productContainer = document.getElementById("products");
  }

  showProducts(products) {
    let output = "";
    products.forEach((product) => {
      output += `
         <div class="card m-3" style="width: 18rem;">
            <div class="card-body">
               <img src="${product.picture}" class="card-img-top" alt="...">
               <h4 class="card-title">${product.name} ${product.price}</h4>
               <button class="btn btn-secondary delete" id="${product.id}">Delete</button>
            </div>
         </div>`;
      this.productContainer.innerHTML = output;
    });
  }
}

export const ui = new UI();
