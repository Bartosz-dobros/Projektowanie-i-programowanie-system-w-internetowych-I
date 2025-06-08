import { auth } from './firebase.js';
import { signInWithEmailAndPassword } from 'firebase/auth';

const form = document.getElementById('loginForm');
const emailField = form.querySelector('#email');
const passField  = form.querySelector('#password');

form.addEventListener('submit', async (e) => {
    e.preventDefault();

    try {
        await signInWithEmailAndPassword(auth, emailField.value, passField.value);
        window.location.href = './index.html';
    } catch (err) {
        alert(parseFirebaseError(err.code));
    }
});

function parseFirebaseError(code) {
    switch (code) {
        case 'auth/invalid-email':      return 'Niepoprawny e-mail';
        case 'auth/user-not-found':     return 'Nie znaleziono użytkownika';
        case 'auth/wrong-password':     return 'Błędne hasło';
        default:                        return 'Błąd logowania: ' + code;
    }
}
