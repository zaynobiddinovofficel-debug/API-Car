let elHtml = document.documentElement; 
let elDarkBtn = document.querySelector('.dark__mode');
let elLightBtn = document.querySelector('.light__mode');
let savedMode = localStorage.getItem('mode');

elDarkBtn.addEventListener('click', () => {
  elHtml.setAttribute('data-theme', 'dark');
  elDarkBtn.classList.add('hidden');
  elLightBtn.classList.remove('hidden');
  localStorage.setItem('mode', 'dark');
});

elLightBtn.addEventListener('click', () => {
  elHtml.setAttribute('data-theme', 'light');
  elLightBtn.classList.add('hidden');
  elDarkBtn.classList.remove('hidden');
  localStorage.setItem('mode', 'light');
});

if (savedMode === 'dark') {
  elHtml.setAttribute('data-theme', 'dark');
  elDarkBtn.classList.add('hidden');
  elLightBtn.classList.remove('hidden');
} else {
  elHtml.setAttribute('data-theme', 'light');
  elLightBtn.classList.add('hidden');
  elDarkBtn.classList.remove('hidden');
}