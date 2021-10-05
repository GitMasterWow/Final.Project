// const cartProductsContainer = document.querySelector(".cart-products");

window.onload = () => {
  let cart = localStorage.getItem("cart");
  if (cart) {
    const cartObjects = JSON.parse(cart);
    let output = "";
    let index = 1; // this index will be incremented for each row is added in the table
    cartObjects.map(
      (item) =>
        (output += `
        <tr class ="table-row">
        <th scope="row">${index++}</th>
        <td><img class="table-img mx-2" src="${item.image}" /></td>
        <td><h5 class="item-name">${item.name}</h5></td>
        <td>
        <div class="container item-count"><button class="btn border-none">
          <i class="fas fa-minus qt-button"></i>
          </button>
          <span class="item-qt fs-5">${item.qtToBuy}</span>
          <button class="btn border-none">
          <i class="fas fa-plus qt-button"></i>
        </button></div></td>
        <td>$<span class="item-price">${item.price}</span></td>
        <td>$<span class="item-subtotal"
          >${(item.price * item.qtToBuy).toFixed(2)}</span
          ></td>
        <td><button
          type="button"
          class="btn-close delete-cart-item"
          aria-label="Close"
          data-bs-toggle="tooltip"
          data-bs-placement="bottom"
          title="Delete item from cart"
        ></button></td>
      </tr>
        `)
    );
    document.querySelector(".products-table-body").innerHTML = output;

    changeQuantity();
    updateTotalPrice();
    deleteProductFromCart();
  }
  // because i populate the page on windows load, i must call the other functions inside the onload event
};

//here is the code for changing the quantity of every product in cart
//i will focus on traversing the DOM
function changeQuantity() {
  // let qtArea = document.querySelectorAll(".item-count"); // all qty areas are selected
  // so qtArea is an array, in wich i iterate with the row index
  let qtArr = document.querySelectorAll(".item-qt"); //we put all the qtys in an array, so we can take them individually by row index
  let qtBtns = document.querySelectorAll(".qt-button");
  // i selected the subtotal areas so i can modify them using the same row index
  let subtotalAreas = document.querySelectorAll(".item-subtotal");
  let priceAreas = document.querySelectorAll(".item-price");
  let cart = localStorage.getItem("cart");
  let cartObj = JSON.parse(cart);
  qtBtns.forEach((btn) => {
    btn.addEventListener("click", (ev) => {
      //first the row index is saved, the one that we clicked on
      let index =
        ev.target.parentElement.parentElement.parentElement.parentElement
          .rowIndex - 1;
      //now is selected the value from the qty area (array) that we click on, by using the row index as array index
      let productQtToBuy = Number(qtArr[index].innerHTML);
      // here are checked two conditions. First - if the target is the button of plus or minus
      // second - if the qty to buy is greater than 9 and lesser than 2, so we have a min qty of 1 and max of 10
      if (ev.target.classList.contains("fa-minus")) {
        if (productQtToBuy < 2) {
          productQtToBuy = 1;
        } else {
          productQtToBuy--;
          qtArr[index].innerHTML = productQtToBuy;
          // at page load, the subtotal is calculated directly in the table cell, but after modifying the qty
          // the subtotal will be calculated using the productQtToBuy just obtained and the price
          // of the product, found the same, by using the row index to iterate trough all of them
          subtotalAreas[index].innerHTML = Number(
            productQtToBuy * priceAreas[index].innerHTML
          ).toFixed(2);
          updateTotalPrice();
          updateQuantityToBuy(cartObj, index, productQtToBuy);
        }
      } else if (ev.target.classList.contains("fa-plus")) {
        if (productQtToBuy > 9) {
          productQtToBuy = 10;
        } else {
          productQtToBuy++;
          qtArr[index].innerHTML = productQtToBuy;
          subtotalAreas[index].innerHTML = Number(
            productQtToBuy * priceAreas[index].innerHTML
          ).toFixed(2);
          updateTotalPrice();
          updateQuantityToBuy(cartObj, index, productQtToBuy);
        }
      }
    });
  });
}

//this function will update the total price
function updateTotalPrice() {
  let totalPrice = document.querySelector(".total-price");
  let subtotalAreas = document.querySelectorAll(".item-subtotal");
  let total = 0;
  // let tableContent = document.querySelector(".cart-products-container");
  for (let i = 0; i < subtotalAreas.length; i++) {
    total += Number(subtotalAreas[i].innerHTML);
  }
  if (total >= 1000) {
    totalPrice.innerHTML = "Total price: $" + total.toFixed(2);
  } else if (total <= 999 && total >= 1) {
    totalPrice.innerHTML = `
    Subtotal: $${total.toFixed(2)} <br>
    + Shipping $39.99 <br>
    TOTAL PRICE: $${(total + 39.99).toFixed(2)}`;
  } else if (total == 0) {
    // tableContent.innerHTML = "Your cart is empty";
    totalPrice.innerHTML = ``;
  }
}

function deleteProductFromCart() {
  let tableBody = document.querySelector(".products-table-body");
  let deleteBtns = document.querySelectorAll(".delete-cart-item");
  let cart = localStorage.getItem("cart");
  let cartObj = JSON.parse(cart);
  deleteBtns.forEach((button) => {
    button.addEventListener("click", (ev) => {
      let index = ev.target.parentElement.parentElement.rowIndex - 1;
      let row = ev.target.parentElement.parentElement;
      tableBody.removeChild(row); //here the row is deleted from table
      cartObj.splice(index, 1); // we delete the product from the local storage array
      // and then we put the array back in local storage
      localStorage.setItem("cart", JSON.stringify(cartObj));
      updateTotalPrice();
    });
  });
}

// this function will update the local storage each time the qty to buy is changed
function updateQuantityToBuy(array, index, newQt) {
  let cart = localStorage.getItem("cart");
  array = JSON.parse(cart);
  array[index].qtToBuy = newQt;
  localStorage.setItem("cart", JSON.stringify(array));
}
