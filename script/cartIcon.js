let cartItems = localStorage.getItem("cart");
let cart = JSON.parse(cartItems);
updateCartIcon(cart);

function updateCartIcon(arr) {
  const cartIcon = document.querySelector(".badge");
  cartIcon.innerHTML = arr.length;
}
