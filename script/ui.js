class UI {
  constructor() {
    this.cartIcon = document.querySelector(".badge");
  }
  updateCartIcon(cart) {
    let cartItems = localStorage.getItem("cart");
    cart = JSON.parse(cartItems);
    this.cartIcon.innerHTML = cart.length;
  }
}

export const ui = new UI();
