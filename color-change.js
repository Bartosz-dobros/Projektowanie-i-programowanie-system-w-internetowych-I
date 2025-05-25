const options = document.querySelectorAll('.color-selector option');
const availableColors = ['pink', 'blue', 'orange', 'yellow'];

function setColor(color) {
  availableColors.forEach(c => document.body.classList.remove(`theme-${c}`));
  
  document.body.classList.add(`theme-${color}`);

  localStorage.setItem('selectedColor', color);

}

options.forEach(option => {
  option.addEventListener('click', () => {
    const color = option.value;
    setColor(color);
  });
});

window.addEventListener('DOMContentLoaded', () => {
  const savedColor = localStorage.getItem('selectedColor');

  if (savedColor && availableColors.includes(savedColor)) {
    setColor(savedColor);
  }
});
