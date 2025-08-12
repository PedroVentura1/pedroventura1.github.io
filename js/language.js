// language.js
function isMobileView() {
  return window.matchMedia("(max-width: 768px)").matches;
}

let cachedTranslations = null;

export async function loadTranslations(lang) {
  try {
    const res = await fetch(`./js/translations_${lang}.json`);
    if (!res.ok) throw new Error("No se pudo cargar traducción");
    return await res.json();
  } catch {
    return null;
  }
}

function updateTextById(id, value) {
  const el = document.getElementById(id);
  if (!el) return;

  if (typeof value === "object") {
    el.textContent = isMobileView() && value.mobileText ? value.mobileText : value.text;
  } else {
    el.textContent = value;
  }
}

function renderParagraphs(interData) {
  const container = document.getElementById("output");
  if (!container || !interData?.paragraphs) return;

  container.innerHTML = "";
  container.style.marginTop = interData.styles?.marginTop || "0";

  interData.paragraphs.forEach(({ style, parts }) => {
    const p = document.createElement("p");
    if (style === "small") p.classList.add("small");

    parts.forEach(({ bold, text }) => {
      const el = document.createElement(bold ? "strong" : "span");
      el.textContent = text;
      p.appendChild(el);
    });

    container.appendChild(p);
  });
}

export async function changeLanguage(lang) {
  localStorage.setItem("language", lang);
  document.documentElement.lang = lang;

  const t = await loadTranslations(lang);
  if (!t) return;
  cachedTranslations = t;

  const keys = ["me", "work", "case", "myButton", "welcome", "greeting", "farewell"];
  keys.forEach(key => updateTextById(key, t[key]));
  renderParagraphs(t.inter);

  const workLink = document.getElementById("work");
  const caseLink = document.getElementById("case");

  if (workLink) workLink.href = lang === "es" ? "portfolio_es.html" : "portfolio.html";
  if (caseLink) caseLink.href = lang === "es" ? "studycase_es.html" : "studycase.html";

  const current = window.location.pathname;
  let newPage = current;

  if (current.includes("portfolio") || current.includes("studycase")) {
    newPage = lang === "es"
      ? current.replace("portfolio.html", "portfolio_es.html").replace("studycase.html", "studycase_es.html")
      : current.replace("portfolio_es.html", "portfolio.html").replace("studycase_es.html", "studycase.html");

    if (newPage !== current) window.location.href = newPage;
  }
}

window.addEventListener("resize", () => {
  if (!cachedTranslations) return;
  ["me", "case"].forEach(key => updateTextById(key, cachedTranslations[key]));
});
