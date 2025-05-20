document.getElementById("loginForm").addEventListener("submit", function (e) {
  e.preventDefault();

  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value.trim();
  const errorMsg = document.getElementById("errorMsg");

  if (!email || !password) {
    errorMsg.textContent = "Wprowadź email i hasło.";
    return;
  }

  errorMsg.textContent = "";
  alert("Zalogowano pomyślnie!");
});