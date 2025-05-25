document.getElementById('registerForm').addEventListener('submit', function(e) {
  e.preventDefault();

  const username = document.getElementById('username').value.trim();
  const email = document.getElementById('email').value.trim();
  const password = document.getElementById('password').value;
  const confirmPassword = document.getElementById('confirmPassword').value;
  const message = document.getElementById('message');

   if (!username || !email || !password || !confirmPassword) {
    message.style.color = 'var(--color-2)';
    message.textContent = "Nie zostały wypełnione wszystkie pola!";
    return;
  }

  if (password.length < 6) {
    message.style.color = 'var(--color-2)';
    message.textContent = "Hasło musi mieć co najmniej 6 znaków!";
    return;
  }

  if (password !== confirmPassword) {
    message.style.color = 'var(--color-2)';
    message.textContent = "Hasła nie są zgodne!";
    return;
  }

  message.style.color = 'var(--color-1)';
  message.textContent = "Rejestracja zakończona sukcesem!";
});