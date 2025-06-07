document.getElementById('loginForm').addEventListener('submit', function(event) {
  event.preventDefault();
  const username = document.getElementById('loginUsername').value;
  const password = document.getElementById('loginPassword').value;

  // Check if username and password are valid
  if (username == '' || password == '') {
    // Successful login
    alert('Wypełnij wszystkie pola!');
  } else {
    // Invalid login
    alert('Zalogowano pomyślnie!');
  }
});