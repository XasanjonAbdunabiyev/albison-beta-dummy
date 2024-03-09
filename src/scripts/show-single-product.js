import { getProductById } from "./services/docs";

const modal = document.querySelector(".main-modal");
const modalClose = document.querySelector(".modal-close");

const modalDescription = document.querySelector(".detail-product-desc");
const modalTitle = document.querySelector(".detail-product-title");
const singleProductImage = document.querySelector(".detail-product-image");
const productDetailPrice  = document.querySelector(".product-detail-price");

const saveBtn = document.querySelector('.bg-teal-500')
const header = document.querySelector('header')
const modalOrdered = document.querySelector('.modal-Ordered')
const orderItems = document.querySelector('.items')
const orderButton = header.querySelector('button')
const total = header.querySelector('.total')
let orderedItems = []



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

orderButton.addEventListener('click', () => {
  if (modalOrdered.classList.contains('flex')) {
    
  modalOrdered.classList.remove('flex')
  modalOrdered.classList.add('hidden')
  } else { 
  modalOrdered.classList.add('flex')
  modalOrdered.classList.remove('hidden')
  }
})

modalClose.addEventListener("click", function () {
  modal.style.display = "none";
});

saveBtn.addEventListener('click', (e) => {
  let numOfProduct = header.querySelector('span')
  let count = +(numOfProduct.innerText)
  count = count + 1
  numOfProduct.innerText = count
  let list = addedItems(e.target)
  let items = ''
  let totalPrice = 0
  list.forEach(element => {
    totalPrice = totalPrice + parseFloat(element.price)
  })
  list.forEach(element => { 
    items += `
      <div class="item flex items-center justify-between mx-4">
        <div class="image"><img src="${element.image}" width="80px" height="80px" alt="product-image"></div>
        <div class="product-name">${element.productName}</div>
        <div class="product-price">${element.price}</div>
      </div>
      <hr/>
`
  });
  orderItems.innerHTML = items
  total.innerText = `Total: ${totalPrice}$`
});

modal.addEventListener('click', (e) => {
  if (e.target && (e.target.classList.contains('main-modal') || 
  e.target.classList.contains('bg-gray-400'))){
    modal.style.display = "none";
  }
})

function addedItems(params) {
  let product = params.parentElement.parentElement
  const productName = product.querySelector('.detail-product-title').innerText
  const image = product.querySelector('img').getAttribute('src')
  const price = product.querySelector('.product-detail-price').innerText
  const item = { productName, image, price }
  orderedItems.push(item)
  return orderedItems
}


