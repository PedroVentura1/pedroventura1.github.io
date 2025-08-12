// tabs.js

export function initTabs() {
  const tabLinks = document.querySelectorAll('ul.cases li a');
  const articles = document.querySelectorAll('.pages2 article');

  if (!tabLinks.length || !articles.length) return;

  // Mostrar primer tab
  tabLinks[0].classList.add('activo');
  articles.forEach((article, i) => {
    article.style.display = i === 0 ? 'block' : 'none';
  });

  tabLinks.forEach(link => {
    link.addEventListener('click', event => {
      event.preventDefault();

      // Limpiar clases previas
      tabLinks.forEach(l => l.classList.remove('activo', 'activo_red', 'activo_green'));

      const href = link.getAttribute('href');
      const targetArticle = document.querySelector(href);

      // Mostrar el artículo correspondiente
      articles.forEach(article => article.style.display = 'none');
      if (targetArticle) targetArticle.style.display = 'block';

      // Agregar clase correspondiente según tab
      if (href === '#page1') link.classList.add('activo');
      else if (href === '#page2') link.classList.add('activo_red');
      else if (href === '#page3') link.classList.add('activo_green');

      // Scroll suave si tiene data-target
      const targetId = link.getAttribute('data-target');
      if (targetId) {
        const el = document.getElementById(targetId);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth' });
        }
      }
    });
  });
}
