let limit = 4;
let skip = 0;
let editId = null;

const elContainer = document.getElementById('container');
const elPrev = document.getElementById('prev');
const elNext = document.getElementById('next');
const elCarName = document.querySelector('.js-car-name');
const elCarYear = document.querySelector('.js-car-year');
const elCarColor = document.querySelector('.js-car-color');
const elCarSpeed = document.querySelector('.js-car-speed');
const elCarPower = document.querySelector('.js-car-power');
const elCarAcceleration = document.querySelector('.js-car-acceleration');
const elCarCategory = document.querySelector('.js-car-category');
const elSubmitButton = document.querySelector('#submitButton');
const elTostTemplate = document.querySelector('#tostTemplate');
const elTost = document.querySelector('#tost');
const elCarForm = document.querySelector('#carAddForm');
const elSuccessTemplate = document.querySelector('#tostTemplateSuccess');
const elEditModal = document.querySelector('#editModal');
const elCarEditForm = document.querySelector('#carEditForm');
const elAddButton = document.querySelector('.js-add-button');

if (skip === 0) {
  elPrev.style.display = 'none';
} else if (skip !== 0) elPrev.style.display = 'flex';
loader(true);
request();

function request() {
  fetch(`https://json-api.uz/api/project/fn44-amaliyot/cars?skip=${skip}&limit=${limit}`)
    .then((res) => {
      return res.json();
    })
    .then((res) => {
      ui(res.data);
    })
    .finally(() => {
      loader(false);
    });
}

function loader(bool) {
  const elLoader = document.getElementById('loader');
  const elLoaderTemplate = document.getElementById('templateLoader');
  elLoader.innerHTML = null;
  if (bool) {
    Array.from({ length: 4 }, (el, index) => index).forEach(() => {
      elLoader.appendChild(elLoaderTemplate.cloneNode(true).content);
    });
  }
}

function ui(data) {
  if (skip === 0) {
    elPrev.style.display = 'none';
  } else if (skip !== 0) elPrev.style.display = 'flex';
  paginationDisabled(false);
  const elTemp = document.getElementById('templateCard');
  data.forEach((el) => {
    const clone = elTemp.cloneNode(true).content;
    clone.querySelector('h2').innerText = el.name ? el.name : 'No title';
    clone.querySelector('p').innerText =
      el.category && el.year ? `${el.category} ${el.year}` : 'No category';

    clone.querySelector('.js-delete-button').id = el.id;
    clone.querySelector('.js-info-button').id = el.id;
    clone.querySelector('.js-edit-button').id = el.id;

    elContainer.appendChild(clone);
  });
}

elContainer.addEventListener('click', (evt) => {
  if (evt.target.classList.contains('js-delete-button')) {
    evt.target.disabled = true;
    evt.target.innerHTML = `
      <svg class="animate-spin" width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M1.90321 7.29677C1.90321 10.341 4.11041 12.4147 6.58893 12.8439C6.87255 12.893 7.06266 13.1627 7.01355 13.4464C6.96444 13.73 6.69471 13.9201 6.41109 13.871C3.49942 13.3668 0.86084 10.9127 0.86084 7.29677C0.860839 5.76009 1.55996 4.55245 2.37639 3.63377C2.96124 2.97568 3.63034 2.44135 4.16846 2.03202L2.53205 2.03202C2.25591 2.03202 2.03205 1.80816 2.03205 1.53202C2.03205 1.25588 2.25591 1.03202 2.53205 1.03202L5.53205 1.03202C5.80819 1.03202 6.03205 1.25588 6.03205 1.53202L6.03205 4.53202C6.03205 4.80816 5.80819 5.03202 5.53205 5.03202C5.25591 5.03202 5.03205 4.80816 5.03205 4.53202L5.03205 2.68645L5.03054 2.68759L5.03045 2.68766L5.03044 2.68767L5.03043 2.68767C4.45896 3.11868 3.76059 3.64538 3.15554 4.3262C2.44102 5.13021 1.90321 6.10154 1.90321 7.29677ZM13.0109 7.70321C13.0109 4.69115 10.8505 2.6296 8.40384 2.17029C8.12093 2.11718 7.93465 1.84479 7.98776 1.56188C8.04087 1.27898 8.31326 1.0927 8.59616 1.14581C11.4704 1.68541 14.0532 4.12605 14.0532 7.70321C14.0532 9.23988 13.3541 10.4475 12.5377 11.3662C11.9528 12.0243 11.2837 12.5586 10.7456 12.968L12.3821 12.968C12.6582 12.968 12.8821 13.1918 12.8821 13.468C12.8821 13.7441 12.6582 13.968 12.3821 13.968L9.38205 13.968C9.10591 13.968 8.88205 13.7441 8.88205 13.468L8.88205 10.468C8.88205 10.1918 9.10591 9.96796 9.38205 9.96796C9.65819 9.96796 9.88205 10.1918 9.88205 10.468L9.88205 12.3135L9.88362 12.3123C10.4551 11.8813 11.1535 11.3546 11.7585 10.6738C12.4731 9.86976 13.0109 8.89844 13.0109 7.70321Z" fill="currentColor" fill-rule="evenodd" clip-rule="evenodd"></path></svg>
    `;
    if(isLogin()) {
     deleteCar(evt.target.id);
  } else {
      location.href = "./auths.html"
     }
  }
  if (evt.target.classList.contains('js-info-button')) {
    infoCar(evt.target.id);
  }
  if (evt.target.classList.contains('js-edit-button')) {
    evt.target.disabled = true;
    evt.target.innerHTML = `
      <svg class="animate-spin" width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M1.90321 7.29677C1.90321 10.341 4.11041 12.4147 6.58893 12.8439C6.87255 12.893 7.06266 13.1627 7.01355 13.4464C6.96444 13.73 6.69471 13.9201 6.41109 13.871C3.49942 13.3668 0.86084 10.9127 0.86084 7.29677C0.860839 5.76009 1.55996 4.55245 2.37639 3.63377C2.96124 2.97568 3.63034 2.44135 4.16846 2.03202L2.53205 2.03202C2.25591 2.03202 2.03205 1.80816 2.03205 1.53202C2.03205 1.25588 2.25591 1.03202 2.53205 1.03202L5.53205 1.03202C5.80819 1.03202 6.03205 1.25588 6.03205 1.53202L6.03205 4.53202C6.03205 4.80816 5.80819 5.03202 5.53205 5.03202C5.25591 5.03202 5.03205 4.80816 5.03205 4.53202L5.03205 2.68645L5.03054 2.68759L5.03045 2.68766L5.03044 2.68767L5.03043 2.68767C4.45896 3.11868 3.76059 3.64538 3.15554 4.3262C2.44102 5.13021 1.90321 6.10154 1.90321 7.29677ZM13.0109 7.70321C13.0109 4.69115 10.8505 2.6296 8.40384 2.17029C8.12093 2.11718 7.93465 1.84479 7.98776 1.56188C8.04087 1.27898 8.31326 1.0927 8.59616 1.14581C11.4704 1.68541 14.0532 4.12605 14.0532 7.70321C14.0532 9.23988 13.3541 10.4475 12.5377 11.3662C11.9528 12.0243 11.2837 12.5586 10.7456 12.968L12.3821 12.968C12.6582 12.968 12.8821 13.1918 12.8821 13.468C12.8821 13.7441 12.6582 13.968 12.3821 13.968L9.38205 13.968C9.10591 13.968 8.88205 13.7441 8.88205 13.468L8.88205 10.468C8.88205 10.1918 9.10591 9.96796 9.38205 9.96796C9.65819 9.96796 9.88205 10.1918 9.88205 10.468L9.88205 12.3135L9.88362 12.3123C10.4551 11.8813 11.1535 11.3546 11.7585 10.6738C12.4731 9.86976 13.0109 8.89844 13.0109 7.70321Z" fill="currentColor" fill-rule="evenodd" clip-rule="evenodd"></path></svg>
    `;
    if(isLogin()) {
     getById(evt.target.id);;
  } else {
      location.href = "./auths.html"
     }
  }
});

elPrev.addEventListener('click', () => {
  skip = skip - limit;
  elContainer.innerHTML = null;
  loader(true);
  paginationDisabled(true);
  request();
});

elNext.addEventListener('click', () => {
  skip = skip + limit;
  elContainer.innerHTML = null;
  loader(true);
  paginationDisabled(true);
  request();
});

function paginationDisabled(bool) {
  if (bool == true) {
    elNext.style.pointerEvents = 'none';
  } else {
    elNext.style.pointerEvents = 'all';
  }
}

// Info

function infoCar(id) {
  window.open(`/details.html?id=${id}`, '_blank');
}

elCarForm.addEventListener('submit', (evt) => {
  evt.preventDefault();

  const formData = new FormData(elCarForm);
  const result = {};
  const arr = [];

  formData.forEach((value, key) => {
    result[key] = value;

    if (value.trim() === '') {
      arr.push(key);
    }
  });

  if (arr.length > 0) {
    const clone = elTostTemplate.cloneNode(true).content;
    clone.querySelector('span').innerText = `${arr[0]} kiriting!`;
    elTost.appendChild(clone);

    const focusInput = elCarForm.querySelector(`[name="${arr[0]}"]`);
    focusInput.focus();

    setTimeout(() => {
      document.querySelector('[role="alert"]').remove();
    }, 1500);
  } else {
    const clone = elSuccessTemplate.cloneNode(true).content;
    elTost.appendChild(clone);
    add(result);
    setTimeout(() => {
      document.querySelector('[role="alert"]').remove();
    }, 2000);
  }
});

elCarEditForm.addEventListener('submit', (el) => {
  el.preventDefault();

  const formData = new FormData(elCarEditForm);
  const data = {};

  formData.forEach((value, key) => {
    data[key] = value;
  });

  fetch(`https://json-api.uz/api/project/fn44-amaliyot/cars/${editId}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })
    .then((res) => res.json())
    .then(() => {
      elEditModal.close();

      elContainer.innerHTML = '';
      loader(true);
      request();
    });
});

// GET

// Delete

function deleteCar(id) {
  const token = localStorage.getItem("token");
  fetch('https://json-api.uz/api/project/fn44-amaliyot/cars/' + id, {
    method: 'DELETE',
    headers: {
      "Content-Type": application/json,
    Authorization: "Bearer " + token
    }
  })
    .then((res) => {
      return res.text();
    })
    .then((res) => {
      document.getElementById(id).closest('.card').remove();
      const clone = elSuccessTemplate.cloneNode(true).content;
      elTost.appendChild(clone);
      setTimeout(() => {
        document.querySelector('[role="alert"]').remove();
      }, 2000);
    })
    .finally(() => {});
}

function add(data) {
  fetch('https://json-api.uz/api/project/fn44-amaliyot/cars/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })
    .then((res) => {
      return res.json();
    })
    .then((res) => {
      const elAddModal = document.getElementById('my_modal_3');
      elAddModal.close()
      elCarForm.reset();
      ui([res]);
      const clone = elSuccessTemplate.cloneNode(true).content;
      elTost.appendChild(clone);
      setTimeout(() => {
        document.querySelector('[role="alert"]').remove();
      }, 2000);
    })
    .finally(() => {});
}

function getById(id) {
  fetch(`https://json-api.uz/api/project/fn44-amaliyot/cars/${id}`)
    .then((res) => res.json())
    .then((res) => {
      editId = id;
      elEditModal.showModal();

      elCarEditForm.name.value = res.name;
      elCarEditForm.year.value = res.year;
      elCarEditForm.color.value = res.color;
      elCarEditForm.speed.value = res.speed;
      elCarEditForm.power.value = res.power;
      elCarEditForm.acceleration.value = res.acceleration;
      elCarEditForm.category.value = res.category;
    });
}

function isLogin() {
  if(
    localStorage.getItem("token") === null) {
      return false;
    } else {
      return true;
    }
}

// Add
elAddButton.addEventListener("click", () => {
  const check = isLogin()

  if (check) {
    document.getElementById("my_modal_3").showModal();
  } else {
    location.href = "./auths.html";
  }
});

elEditModal.addEventListener("click", () => {
  const check = isLogin()

  if (check) {
    document.getElementById("my_modal_3").showModal();
  } else {
    location.href = "./auths.html";
  }
});