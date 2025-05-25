document.getElementById("loginForm").addEventListener("submit", function (e) {
  e.preventDefault();

  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value.trim();
  const message = document.getElementById("message");

  if (!email || !password) {
    message.style.color = 'var(--color-2)';
    message.textContent = "Nie zostały wypełnione wszystkie pola!";
    return;
  }

  message.style.color = 'var(--color-1)';
  message.textContent = "Logowanie zakończone sukcesem!";
});