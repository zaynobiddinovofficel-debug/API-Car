const authWrapper = document.querySelector('.auth-wrapper');
const loginTrigger = document.querySelector('.login-trigger');
const registerTrigger = document.querySelector('.register-trigger');
const elLoginForm = document.getElementById('loginForm');

if (registerTrigger && authWrapper) {
  registerTrigger.addEventListener('click', (e) => {
    e.preventDefault();
    authWrapper.classList.add('active');
  });
}

if (loginTrigger && authWrapper) {
  loginTrigger.addEventListener('click', (e) => {
    e.preventDefault();
    authWrapper.classList.remove('active');
  });
}

if (elLoginForm) {
  elLoginForm.addEventListener("submit", (evt) => {
    evt.preventDefault();
    const formData = new FormData(elLoginForm);
    const result = {};

    formData.forEach((value, key) => {
      result[key] = value;
    });

    login(result);
  });
}

function login(data) {
  fetch("https://json-api.uz/api/project/fn44-amaliyot/auth/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data), 
  })
    .then((res) => res.json())
    .then((res) => {
      localStorage.setItem("token", res.access_token);
      location.href = "./index.html";
    })
    .catch(() => {
      alert("Xatolik bo'ldi, login yoki parol xato qayta urining!");
    });
}
