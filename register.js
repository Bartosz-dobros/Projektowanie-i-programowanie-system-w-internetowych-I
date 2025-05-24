document.getElementById('registerForm').addEventListener('submit', function(e) {
  e.preventDefault();

  const username = document.getElementById('username').value.trim();
  const email = document.getElementById('email').value.trim();
  const password = document.getElementById('password').value;
  const confirmPassword = document.getElementById('confirmPassword').value;
  const message = document.getElementById('message');

  if (password.length < 6) {
    message.textContent = "Hasło musi mieć co najmniej 6 znaków.";
    return;
  }

  if (password !== confirmPassword) {
    message.textContent = "Hasła nie są zgodne.";
    return;
  }

  message.style.color = "green";
  message.textContent = "Rejestracja zakończona sukcesem!";
  // Tu możesz wysłać dane na serwer lub je przetworzyć
});