productsTable = document.querySelector(".table-body");

window.addEventListener("DOMContentLoaded", () => {
  fetch("https://61363d1b8700c50017ef54c5.mockapi.io/products")
    .then((response) => response.json())
    .then((data) => listProducts(data))
    .catch((error) => {
      console.log(error);
    });
});

//   Show all the products in page
function listProducts(product) {
  let output = "";
  for (let i = 0; i < product.length; i++) {
    //i will add the id atribute to each row, so that each row that contains a product will have also the id of that product

    output += `<tr id=${product[i].id}>
    <td>
      <img
        src=${product[i].image}
        alt=${product[i].name}
        class="table-img"
      />
    </td>
    <td>${product[i].name}</td>
    <td>${product[i].price}</td>
    <td>${product[i].quantity}</td>
    <td>
      <button
        type="button"
        class="text-primary p-2 border-0 edit-btn"
        data-bs-toggle="modal"
        data-bs-target="#edit-product-modal"
      >
        Edit
      </button>
    </td>
    <td>
      <button
        type="button"
        class="text-primary p-2 border-0 remove-btn"
        data-bs-toggle="modal"
        data-bs-target="#remove-product-modal"
      >
        Remove
      </button>
    </td>
  </tr>`;
  }
  productsTable.innerHTML = output;
}

//=======================
// add product to database
//=======================
document
  .querySelector("#add-product-btn")
  .addEventListener("click", addNewProduct);
function addNewProduct() {
  const productName = document.querySelector("#product-name").value;
  const productImage = document.querySelector("#product-image").value;
  const productPrice = document.querySelector("#product-price").value;
  const productDescription = document.querySelector(
    "#product-description"
  ).value;
  const productQuantity = document.querySelector("#product-quantity").value;
  const productCategory = document.querySelector("#product-category").value;

  let product = {
    name: productName,
    image: productImage,
    price: productPrice,
    description: productDescription,
    quantity: productQuantity,
    category: productCategory,
    mainCategory: "",
  };
  //   now i added the main category based on product category
  if (
    productCategory == "cpus" ||
    productCategory == "motherboards" ||
    productCategory == "vgds" ||
    productCategory == "case" ||
    productCategory == "psu" ||
    productCategory == "memory" ||
    productCategory == "storage"
  ) {
    product.mainCategory = "components";
  } else if (productCategory == "systems") {
    product.mainCategory = "systems";
  } else {
    product.mainCategory = "peripherals";
  }

  fetch("https://61363d1b8700c50017ef54c5.mockapi.io/products", {
    method: "POST",
    body: JSON.stringify(product),
    headers: { "Content-Type": "application/json" },
  })
    .then((response) => response.json())
    .then((data) => listProducts(data))
    .catch((error) => {
      console.log(error);
    })
    .then(() => {
      window.location.reload();
    });
}

//================
//Delete product
//================
productsTable.addEventListener("click", (ev) => {
  if (ev.target.classList.contains("remove-btn")) {
    let id = ev.target.parentElement.parentElement.id;
    document.querySelector(".delete-btn").addEventListener("click", () => {
      fetch("https://61363d1b8700c50017ef54c5.mockapi.io/products/" + id, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
      })
        .then((response) => response.json())
        .then((data) => listProducts(data))
        .catch((error) => {
          console.log(error);
        })
        .then(() => {
          window.location.reload();
        });
    });
  }
});

// =========
// Edit product
// =========
productsTable.addEventListener("click", (ev) => {
  if (ev.target.classList.contains("edit-btn")) {
    let id = ev.target.parentElement.parentElement.id;
    console.log(id);
    // i used a fetch to get a specific product from database, using its id obtained via ev target
    fetch("https://61363d1b8700c50017ef54c5.mockapi.io/products/" + id)
      .then((response) => response.json())
      .then((data) => fillEditInputs(data)); // this function will store the product details in the inputs from edit modal

    function fillEditInputs(product) {
      document.querySelector("#edit-product-name").value = product.name;
      document.querySelector("#edit-product-image").value = product.image;
      document.querySelector("#edit-product-price").value = product.price;
      document.querySelector("#edit-product-description").value =
        product.description;
      document.querySelector("#edit-product-quantity").value = product.quantity;
    }

    document.querySelector(".save-edit-btn").addEventListener("click", () => {
      //here i saved the new data from inputs in variables, and created an obj with new data
      const editedProductName =
        document.querySelector("#edit-product-name").value;
      const editedProductImage = document.querySelector(
        "#edit-product-image"
      ).value;
      const editedProductPrice = document.querySelector(
        "#edit-product-price"
      ).value;
      const editedProductDescription = document.querySelector(
        "#edit-product-description"
      ).value;
      const editedProductQuantity = document.querySelector(
        "#edit-product-quantity"
      ).value;
      const editedProductCategory = document.querySelector(
        "#edit-product-category"
      ).value;
      console.log(editedProductName);

      //the data in this obj will replace the data for the selected product
      let editedProduct = {
        name: editedProductName,
        image: editedProductImage,
        price: editedProductPrice,
        description: editedProductDescription,
        quantity: editedProductQuantity,
        category: editedProductCategory,
        mainCategory: "",
      };
      console.log(editedProduct);
      //   now i added the main category based on product category
      if (
        editedProductCategory == "cpus" ||
        editedProductCategory == "motherboards" ||
        editedProductCategory == "vgds" ||
        editedProductCategory == "case" ||
        editedProductCategory == "psu" ||
        editedProductCategory == "memory" ||
        editedProductCategory == "storage"
      ) {
        editedProduct.mainCategory = "components";
      } else if (editedProductCategory == "systems") {
        editedProduct.mainCategory = "systems";
      } else if (
        editedProductCategory == "monitors" ||
        editedProductCategory == "headphones" ||
        editedProductCategory == "keyboards" ||
        editedProductCategory == "speakers"
      ) {
        editedProduct.mainCategory = "peripherals";
      }

      fetch("https://61363d1b8700c50017ef54c5.mockapi.io/products/" + id, {
        method: "PUT",
        body: JSON.stringify(editedProduct),
        headers: { "Content-Type": "application/json" },
      })
        .then((response) => response.json())
        .then((data) => listProducts(data))
        .catch((error) => {
          console.log(error);
        })
        .then(() => {
          window.location.reload();
        });
    });
  }
});
