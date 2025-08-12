// js/main.js
import { changeLanguage } from './language.js';
import { initTabs } from './tabs.js';

document.addEventListener('DOMContentLoaded', () => {
  const selector = document.getElementById("languageSelector");
  const savedLang = localStorage.getItem("language") || "en";

  if (selector) {
    selector.value = savedLang;
    selector.addEventListener("change", () => {
      changeLanguage(selector.value);
    });
  }

  changeLanguage(savedLang);
  initTabs(); // Inicia los botones
});

document.body.style.visibility = "visible";

