const baseurl = import.meta.env.VITE_BASE_URL;

const cartContainer = document.querySelector("#cartContainer");
const cartIcon = document.querySelector("#cartBtn");
const cartSpanNumber = document.querySelector("#cartSpanNumber");

async function showCart() {
  try {
    const res = await fetch(baseurl + "/carts/user/5");
    const cart = await res.json();

    let result = "";
    cart.carts[0].products.map((item) => {
      result += `
        <div class="cart-item">
          <img src=${item.thumbnail} alt=${item.thumbnail} />
          <div class="cart-item-info">
            <h3>${item.title}</h3>
            <p>${item.discountedPrice}</p>
            <p>${item.quantity}</p>
            <p>${item.discountedPrice * item.quantity}</p>
          </div>
        </div>
      `;
    });

    cartContainer.innerHTML = result;
  } catch (error) {
    console.error("Error fetching cart data:", error);
  }
}

cartIcon.addEventListener("click", function () {
  showCart();
});
