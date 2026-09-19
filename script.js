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
        const cards = document.querySelectorAll("#dashboard .siga-ledger-item");

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


function actualizarContadorPagos() {
    const pendientes = document.querySelectorAll("#pagos .badge.bg-danger").length;
    const contador = document.getElementById("contador-pendientes");
    if (contador) {
        contador.textContent = pendientes + (pendientes === 1 ? " pendiente" : " pendientes");
        contador.className = "badge " + (pendientes === 0 ? "bg-success" : "bg-danger");
    }
}

const botonesPagar = document.querySelectorAll(".btn-pagar");

botonesPagar.forEach(function (boton) {
    boton.addEventListener("click", function () {
        const item = boton.closest(".list-group-item");
        const badge = item.querySelector(".badge");
        badge.textContent = "Pagado";
        badge.className = "badge bg-success";

        const spanFecha = item.querySelector(".fecha-pago");
        if (spanFecha) {
            const hoy = new Date().toLocaleDateString("es-AR");
            spanFecha.textContent = "Pagado: " + hoy;
        }

        boton.remove();
        actualizarContadorPagos();
    });
});

actualizarContadorPagos();


// ---------- 3. Filtro de propiedades por estado ----------
const botonesEstado = document.querySelectorAll(".filtro-btn");
const tarjetasPropiedades = document.querySelectorAll(".card[data-estado]");

botonesEstado.forEach(function (boton) {
    boton.addEventListener("click", function () {
        botonesEstado.forEach(function (b) {
            b.classList.remove("btn-primary");
            b.classList.add("btn-outline-secondary");
        });
        boton.classList.remove("btn-outline-secondary");
        boton.classList.add("btn-primary");

        const filtro = boton.getAttribute("data-filtro");

        tarjetasPropiedades.forEach(function (card) {
            const estadoCard = card.getAttribute("data-estado");
            if (filtro === "todas" || estadoCard === filtro) {
                card.closest(".col").style.display = "";
            } else {
                card.closest(".col").style.display = "none";
            }
        });
    });
});
