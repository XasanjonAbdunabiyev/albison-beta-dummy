import { getProductById } from "./services/docs";

const modal = document.querySelector(".main-modal");
const modalClose = document.querySelector(".modal-close");

const modalDescription = document.querySelector(".detail-product-desc");
const modalTitle = document.querySelector(".detail-product-title");
const singleProductImage = document.querySelector(".detail-product-image");
const productDetailPrice  = document.querySelector(".product-detail-price");

export async function showSingProductWithModal(button) {
  let productId = button.dataset.id;

  button.addEventListener("click", function () {
    modal.style.display = "flex";
  });

  await getProductById(productId).then(function (product) {
    modalTitle.textContent = product.title;
    modalDescription.textContent = product.description;
    singleProductImage.src = product.thumbnail;
    productDetailPrice.textContent = `${product.price}$`;
  });
}

modalClose.addEventListener("click", function () {
  modal.style.display = "none";
});
