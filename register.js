document.getElementById('registerForm').addEventListener('submit', function(event) {
  event.preventDefault();
  const username = document.getElementById('regUsername').value;
  const email = document.getElementById('regEmail').value;
  const password = document.getElementById('regPassword').value;
  const confirmPassword = document.getElementById('regConfirmPassword').value;

  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!username || !email || !password || !confirmPassword) {
    alert('Wypełnij wszystkie pola!');
    return;
  }

  if (!emailPattern.test(email)) {
    alert('To nie jest poprawny adres email!');
    return;
  }

  if (password !== confirmPassword) {
    alert('Hasła się nie zgadzają!');
    return;
  }

  alert('Zarejestrowano pomyślnie!');

});