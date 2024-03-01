let baseurl = import.meta.env.VITE_BASE_URL;

export const loginUser = async (username, password) => {
  console.log(username, password);
  const response = await fetch(baseurl + "/auth/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      username: username,
      password: password,
    }),
  });

  return response.json();
};

export const fetchCategories = async () => {
  const response = await fetch(baseurl + "/products/categories");
  return response.json();
};

export const getProductById = async (id) => {
  const response = await fetch(baseurl + `/products/${id}`);
  return response.json();
};

export const wait = async (time) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(time);
    }, time);
  });
};
