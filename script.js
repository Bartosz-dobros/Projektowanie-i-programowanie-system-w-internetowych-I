const nav = document.querySelector(".nav-menu");
const hamburger = document.querySelector(".hamburger-menu");

 hamburger.onclick = function () {
     if (nav.className == "nav-menu hide") {
      nav.className = "nav-menu";

     } else {
       nav.className = "nav-menu hide";

     }
  };
