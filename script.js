// ---------- 1. Marcar link activo en sidebar ----------
const secciones = document.querySelectorAll("main section");
const linksNav = document.querySelectorAll(".nav-link");

const observador = new IntersectionObserver(function (entradas) {
    entradas.forEach(function (entrada) {
        if (entrada.isIntersecting) {
            linksNav.forEach(function (link) {
                link.classList.remove("active");
            });
            const idSeccion = entrada.target.getAttribute("id");
            const linkActivo = document.querySelector(`.nav-link[href="#${idSeccion}"]`);
            if (linkActivo) {
                linkActivo.classList.add("active");
            }
        }
    });
}, { threshold: 0.3 });

secciones.forEach(function (seccion) {
    observador.observe(seccion);
});


// ---------- 2. Buscador en tiempo real ----------
const campoBusqueda = document.getElementById("buscador-panel");

if (campoBusqueda) {
    campoBusqueda.addEventListener("input", function () {
        const textoBuscado = campoBusqueda.value.toLowerCase();
        const cards = document.querySelectorAll("#dashboard .card");

        cards.forEach(function (card) {
            const textoCard = card.textContent.toLowerCase();
            if (textoCard.includes(textoBuscado)) {
                card.closest(".col").style.display = "";
            } else {
                card.closest(".col").style.display = "none";
            }
        });
    });
}
