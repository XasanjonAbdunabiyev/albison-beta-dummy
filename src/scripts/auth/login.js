import { loginUser } from "../services/docs";
let form = document.querySelector(".login-form");
let password = document.getElementById("password-input");
let username = document.getElementById("username-input");

form.addEventListener("submit", async function (e) {
  e.preventDefault();

  if (!username.value && !password.value) {
    alert("Please enter your username and password");
    return;
  }

  await loginUser(username.value, password.value).then(function (result) {
    const { token } = result;
    localStorage.setItem("token", token);
  });
});
