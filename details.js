const API = "https://json-api.uz/api/project/fn44-amaliyot/cars";

// Elementlar
const elTitle = document.getElementById('title');
const elTrim = document.getElementById('trim');
const elGeneration = document.getElementById('generation');
const elYear = document.getElementById('year');
const elColor = document.getElementById('color');
const elColorName = document.getElementById('colorName');
const elCategory = document.getElementById('category');
const elMaxSpeed = document.getElementById('maxSpeed');
const loaderEl = document.getElementById('loader');
const containerEl = document.getElementById('container');
const backBtn = document.getElementById('back');

// URL’dan id olamiz
const params = new URLSearchParams(document.location.search);
const carId = params.get('id');

if (!carId) {
  alert("Car ID topilmadi!");
  document.location.href = "index.html";
}

// Loaderni ko‘rsatish
loaderEl.classList.remove('hidden');
containerEl.classList.add('hidden');

// API’dan ma’lumot olish
fetch(`${API}/${carId}`)
  .then(res => res.json())
  .then(car => {
    showCar(car);
  })
  .catch(err => {
    alert("Ma'lumot olishda xatolik!");
    console.error(err);
  })
  .finally(() => {
    loaderEl.classList.add('hidden');
    containerEl.classList.remove('hidden');
  });

// Ma’lumotni chiqarish
function showCar(car) {
  elTitle.innerText = car.name || "-";
  elTrim.innerText = "Trim: " + (car.trim || "-");
  elGeneration.innerText = "Generation: " + (car.generation || "-");
  elYear.innerText = "Year: " + (car.year || "-");
  elColor.innerText = "Color: " + (car.color || "-");
  elColorName.innerText = "Color Name: " + (car.colorName || "-");
  elCategory.innerText = "Category: " + (car.category || "-");
  elMaxSpeed.innerText = "Max Speed: " + (car.maxSpeed || "-") + " km/h";
}

// Back button
backBtn.addEventListener('click', () => {
  document.location.href = "index.html";
});
