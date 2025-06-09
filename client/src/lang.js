const translations = {
    en: {
        siteTitle: "Music Website",
        navHome: "Home",
        navLibrary: "Library",
        navFavorite: "My Favorite",
        titleHome: "Music Website – Home",
        homeWelcomeTitle: "Welcome",
        homeHeading: "Welcome to Music Website!",
        homeParagraph: `This site allows you to listen to music at any time of day.
Tracks are available in various playlists in our library.
You can also add selected songs to your favorites playlist, or remove them from it.
We encourage you to log in, and if you don't have an account yet, please register.`,
        homeAuthors: "Website created by: Maksym Wilk, Bartosz Dobroś, Michał Żmuda. © All rights reserved.",
        titleLibrary: "Music Website – Library",
        libraryTitle: "Library",
        titleFavorite: "Music Website – My Favorite",
        favoriteTitle: "My Favorite",
        titleLogin: "Music Website – Login",
        loginHeading: "Sign In",
        loginUsernameLabel: "Email",
        loginUsernamePlaceholder: "Email",
        loginPasswordLabel: "Password",
        loginPasswordPlaceholder: "Password",
        loginButton: "Log In",
        loginNoAccount: "I don't have an account",
        titleRegister: "Music Website – Register",
        registerHeading: "Sign Up",
        registerUsernameLabel: "Username",
        registerUsernamePlaceholder: "Username",
        registerEmailLabel: "Email",
        registerEmailPlaceholder: "Email",
        registerPasswordLabel: "Password",
        registerPasswordPlaceholder: "Password",
        registerConfirmLabel: "Confirm Password",
        registerConfirmPlaceholder: "Confirm Password",
        registerButton: "Register",
        registerHasAccount: "I already have an account",
        title404: "404 – Not Found",
        notFoundMessage: "Sorry – the page you’re looking for doesn’t exist.",
        backHome: "Back to home",
        audioNotSupported: "Your browser does not support the audio element.",
        loggedInAs: "Logged in as:",
        logout: "Logout",
        login: "Login",
        register: "Register",
        verify: "Please verify your email before using the app."
    },

    pl: {
        siteTitle: "Music Website",
        navHome: "Strona główna",
        navLibrary: "Biblioteka",
        navFavorite: "Ulubione",
        titleHome: "Music Website – Strona główna",
        homeWelcomeTitle: "Witaj",
        homeHeading: "Witajcie w Music Website!",
        homeParagraph: `Ta strona umożliwia słuchanie muzyki o każdej porze dnia. 
Utwory dostępnie są w różnych playlistach naszej biblioteki. 
Można również dodawać wybrane piosenki do playlisty ulubionych, jak i usuwać je stamtąd. 
Zachęcamy do zalogowania się, a jeśli nie masz jeszcze konta to do rejestracji.`,
        homeAuthors: "Strona autorstwa: Maksym Wilk, Bartosz Dobroś, Michał Żmuda. © Wszelkie prawa zastrzeżone",
        titleLibrary: "Music Website – Biblioteka",
        libraryTitle: "Biblioteka",
        titleFavorite: "Music Website – Ulubione",
        favoriteTitle: "Ulubione",
        titleLogin: "Music Website – Logowanie",
        loginHeading: "Zaloguj się",
        loginUsernameLabel: "Email",
        loginUsernamePlaceholder: "Email",
        loginPasswordLabel: "Hasło",
        loginPasswordPlaceholder: "Hasło",
        loginButton: "Zaloguj się",
        loginNoAccount: "Nie mam konta",
        titleRegister: "Music Website – Rejestracja",
        registerHeading: "Zarejestruj się",
        registerUsernameLabel: "Nazwa użytkownika",
        registerUsernamePlaceholder: "Nazwa użytkownika",
        registerEmailLabel: "Email",
        registerEmailPlaceholder: "Email",
        registerPasswordLabel: "Hasło",
        registerPasswordPlaceholder: "Hasło",
        registerConfirmLabel: "Potwierdź hasło",
        registerConfirmPlaceholder: "Potwierdź hasło",
        registerButton: "Zarejestruj się",
        registerHasAccount: "Mam już konto",
        title404: "404 – Nie znaleziono",
        notFoundMessage: "Przepraszamy – szukana strona nie istnieje.",
        backHome: "Powrót do strony głównej",
        audioNotSupported: "Twoja przeglądarka nie obsługuje elementu audio.",
        loggedInAs: "Zalogowano jako:",
        logout: "Wyloguj",
        login: "Logowanie",
        register: "Rejestracja",
        verify: "Potwierdź swój e-mail przed korzystaniem z aplikacji."
    }
};

let currentLang = localStorage.getItem("lang");
if (!currentLang) {
    currentLang = navigator.language.startsWith("pl") ? "pl" : "en";
    localStorage.setItem("lang", currentLang);
}

function applyTranslations(lang) {
    document.documentElement.setAttribute("lang", lang);
    const elements = document.querySelectorAll("[data-i18n]");
    elements.forEach(el => {
        const key = el.getAttribute("data-i18n");
        if (translations[lang] && translations[lang][key]) {
            if (el.innerHTML.includes('<') || el.innerHTML.includes('</')) {
                el.innerHTML = translations[lang][key];
            } else {
                el.textContent = translations[lang][key];
            }
        }
        const attr = el.getAttribute("data-i18n-attr");
        if (attr && translations[lang] && translations[lang][key]) {
            el.setAttribute(attr, translations[lang][key]);
        }
    });

    const btn = document.getElementById("lang-toggle");
    if (btn) btn.textContent = lang === "en" ? "PL" : "EN";

    localStorage.setItem("lang", lang);
    currentLang = lang;
}

function t(key) {
    return translations[currentLang]?.[key] || key;
}

const langToggleBtn = document.getElementById("lang-toggle");
if (langToggleBtn) {
    langToggleBtn.addEventListener("click", () => {
        const newLang = currentLang === "en" ? "pl" : "en";
        applyTranslations(newLang);
    });
}

applyTranslations(currentLang);

export { translations, currentLang, t, applyTranslations };
