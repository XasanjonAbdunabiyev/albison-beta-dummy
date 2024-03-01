import "../styles/main.css";
import { fetchCategories, wait } from "./services/docs";
import { showSingProductWithModal } from "./show-single-product";
const productsRootContainer = document.querySelector(".products-container");
const selectCategory = document.getElementById("select-product");
const baseurl = import.meta.env.VITE_BASE_URL;

window.addEventListener("load", function () {
  let loader = document.querySelector(".loader");
  wait(3000).then(function () {
    loader.classList.add("loader-hidden");
  });
});

function searchCategoryResultFn(categories) {
  let option = "";

  selectCategory.addEventListener("change", function () {
    let selectedCategory = this.value;
    localStorage.setItem("selected-category", selectedCategory);
    fetch(baseurl + `/products/category/${selectedCategory}`)
      .then(function (res) {
        return res.json();
      })
      .then(function (products) {
        new Ui().getUi(products);
      });
  });

  categories.forEach((item) => {
    option += `<option value=${item}>${item}</option>`;
  });

  selectCategory.innerHTML = option;
}

class Products {
  constructor() {
    if (!new.target) {
      throw new TypeError("Called wihout constructor new keyword");
    }
  }

  async getProducts() {
    try {
      const products = await fetch(baseurl + "/products");
      return products.json();
    } catch (error) {
      throw new Error(error.message);
    }
  }
}

class Ui {
  constructor() {
    if (!new.target) {
      throw new TypeError("Called wihout constructor new keyword");
    }
  }

  async getUi(res) {
    let result = "";

    res.products.map((product) => {
      result += `
        <article class="product-item border w-96 p-3">
            <img src=${product.thumbnail} class="w-full h-80 object-cover rounded-md" alt=${product.thumbnail} />
            <h2 class="font-medium my-1 text-center">${product.title}</h2>
            <button data-id=${product.id} class="bg-black block mx-auto text-white p-2 rounded-md border w-full transition duration-100 border-black hover:bg-white hover:text-black">see more (dbclick)</button>
        </article>
        `;
    });

    productsRootContainer.innerHTML = result;

    productsRootContainer.addEventListener("click", function (event) {
      if (event.target.matches(".product-item button")) {
        return showSingProductWithModal(event.target);
      }
    });
  }

  async cateroriesSelect() {
    try {
      const categories = await fetchCategories();
      return categories;
    } catch (error) {
      throw new Error(error.message);
    }
  }
}

document.addEventListener("DOMContentLoaded", () => {
  let token = localStorage.getItem("token");
  if (!token) {
    return;
  }

  new Products().getProducts().then((result) => {
    new Ui().getUi(result);
  });

  new Ui().cateroriesSelect().then((result) => {
    searchCategoryResultFn(result);
  });
});
