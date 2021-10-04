const cartProductsContainer = document.querySelector(".cart-products");

window.onload = () => {
  let cart = localStorage.getItem("cart");
  if (cart) {
    const cartObjects = JSON.parse(cart);
    let output = "";
    cartObjects.map(
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
           <div class="col"><p class="item-price">$ ${item.price}</p></div>
           <div class="col"><h5 class="item-subtotal">Subtotal $${(
             item.price * item.qtToBuy
           ).toFixed(2)}</h5></div>
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
  // because i populate the page on windows load, i must call the other functions inside the onload event
  changeQuantity();
};

function changeQuantity() {
  let qtArea = document.querySelectorAll(".item-count");
  qtArea.forEach((item) => {
    item.addEventListener("click", (ev) => {
      // let itemQt = Number(document.querySelector(".item-qt").innerHTML);

      if (ev.target.classList.contains("fa-minus")) {
        if (
          ev.target.parentElement.parentElement.childNodes[3].innerHTML >= 2
        ) {
          let itemQt = Number(
            ev.target.parentElement.parentElement.childNodes[3].innerHTML
          );
          itemQt--;
          ev.target.parentElement.parentElement.childNodes[3].innerHTML =
            itemQt;
        }
      } else if (ev.target.classList.contains("fa-plus")) {
        if (
          ev.target.parentElement.parentElement.childNodes[3].innerHTML <= 9
        ) {
          let itemQt = Number(
            ev.target.parentElement.parentElement.childNodes[3].innerHTML
          );
          itemQt++;
          ev.target.parentElement.parentElement.childNodes[3].innerHTML =
            itemQt;
        }
      }
    });
  });
}

// let countArea = document.querySelectorAll(".item-count");
// forEach.countArea.addEventListener("click", (ev) => {
//   let itemQt = Number(document.querySelector(".item-qt").innerHTML);
//   if(ev.target.classList.containe(''))
// });
