document.getElementById('loginForm').addEventListener('submit', function(event) {
  event.preventDefault();
  const username = document.getElementById('loginUsername').value;
  const password = document.getElementById('loginPassword').value;

  // Check if username and password are valid
  if (username === 'admin' && password === 'password') {
    // Successful login
    alert('Login Successful');
  } else {
    // Invalid login
    alert('Invalid username or password');
  }
});