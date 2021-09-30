const cartProductsContainer = document.querySelector(".cart-products");

window.onload = () => {
  let cart = localStorage.getItem("cart");
  if (cart) {
    const cartObj = JSON.parse(cart);
    let output = "";
    cartObj.map(
      (item) =>
        (output += `
                                <div class="row border-top border-bottom cart-product">
                                <div class="row main align-items-center">
                                  <div class="col-2">
                                    <img
                                      class="img-thumbnail mx-2"
                                      src=${item.image}
                                    />
                                  </div>
                                  <div class="col">
                                    <div class="row"><h5 class="item-name">${item.name}</h5></div>
                                  </div>
                                  <div class="col item-count">
                                    <button class="btn border-none">
                                      <i class="fas fa-minus"></i>
                                    </button>
                                    <span class="item-qt fs-4">${item.qtToBuy}</span>
                                    <button class="btn border-none">
                                      <i class="fas fa-plus"></i>
                                    </button>
                                  </div>
                                  <div class="col"><h5 class="item-price">$ ${item.price}</h5></div>
                                  <button
                                    type="button"
                                    class="btn-close delete-cart-item"
                                    aria-label="Close"
                                    data-bs-toggle="tooltip"
                                    data-bs-placement="bottom"
                                    title="Delete item from cart"
                                  ></button>
                                </div>
                              </div>
            `)
    );

    document.querySelector(".cart-products-container").innerHTML = output;
  }
  console.log(cart[1].qtToBuy);
  document.querySelector(".item-count").addEventListener("click", (ev) => {
    console.log(ev.target);
  });
};
