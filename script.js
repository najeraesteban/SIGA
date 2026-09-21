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


function actualizarContadorPagos() {
    const pendientes = document.querySelectorAll("#pagos .list-group-item .badge.bg-danger").length;
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
        item.classList.remove("pendiente");

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


function parsearFecha(fechaTexto) {
    const [dia, mes, anio] = fechaTexto.split("/");
    return new Date(anio, mes - 1, dia);
}

function evaluarVencimientoContratos() {
    const filas = document.querySelectorAll("#contratos tbody tr");
    const hoy = new Date();

    filas.forEach(function (fila) {
        const celdaFin = fila.querySelector(".fecha-fin");
        const celdaEstado = fila.querySelector(".estado-contrato");
        if (!celdaFin || !celdaEstado) return;

        const fechaFin = parsearFecha(celdaFin.textContent.trim());
        const diasRestantes = Math.ceil((fechaFin - hoy) / (1000 * 60 * 60 * 24));

        if (diasRestantes < 0) {
            celdaEstado.innerHTML = '<span class="badge bg-secondary">Vencido</span>';
        } else if (diasRestantes <= 30) {
            celdaEstado.innerHTML = '<span class="badge bg-danger">Vence pronto</span>';
        } else {
            celdaEstado.innerHTML = '<span class="badge bg-success">Vigente</span>';
        }
    });
}

evaluarVencimientoContratos();

const campoBusquedaPersonas = document.getElementById("buscador-personas");
const botonesFiltroPersona = document.querySelectorAll(".filtro-persona-btn");
const tarjetasPersonas = document.querySelectorAll(".persona-card[data-tipo]");

function filtrarPersonas() {
    const texto = campoBusquedaPersonas ? campoBusquedaPersonas.value.toLowerCase() : "";
    const filtroActivo = document.querySelector(".filtro-persona-btn.btn-primary");
    const tipo = filtroActivo ? filtroActivo.getAttribute("data-filtro-persona") : "todos";
    // Permite buscar el DNI con o sin puntos (30123456 o 30.123.456)
    const textoSinPuntos = texto.replace(/\./g, "");

    tarjetasPersonas.forEach(function (card) {
        const textoCard = card.textContent.toLowerCase();
        const tipoCard = card.getAttribute("data-tipo");
        const coincideTexto = textoCard.includes(texto) ||
            (textoSinPuntos !== "" && textoCard.replace(/\./g, "").includes(textoSinPuntos));
        const coincideTipo = tipo === "todos" || tipoCard === tipo;

        card.closest(".col").style.display = (coincideTexto && coincideTipo) ? "" : "none";
    });
}

if (campoBusquedaPersonas) {
    campoBusquedaPersonas.addEventListener("input", filtrarPersonas);
}

botonesFiltroPersona.forEach(function (boton) {
    boton.addEventListener("click", function () {
        botonesFiltroPersona.forEach(function (b) {
            b.classList.remove("btn-primary");
            b.classList.add("btn-outline-secondary");
        });
        boton.classList.remove("btn-outline-secondary");
        boton.classList.add("btn-primary");
        filtrarPersonas();
    });
});


const anioActual = document.getElementById("anio-actual");
if (anioActual) {
    anioActual.textContent = new Date().getFullYear();
}


const botonScrollTop = document.getElementById("btn-scroll-top");

if (botonScrollTop) {
    window.addEventListener("scroll", function () {
        if (window.scrollY > 400) {
            botonScrollTop.classList.add("visible");
        } else {
            botonScrollTop.classList.remove("visible");
        }
    });

    botonScrollTop.addEventListener("click", function () {
        window.scrollTo({ top: 0, behavior: "smooth" });
    });
}


function agregarBotonesWhatsapp() {
    const tarjetas = document.querySelectorAll(".persona-card");

    tarjetas.forEach(function (card) {
        const parrafos = card.querySelectorAll(".card-body p");
        let parrafoTelefono = null;

        parrafos.forEach(function (p) {
            if (p.textContent.trim().startsWith("Tel:")) {
                parrafoTelefono = p;
            }
        });

        if (!parrafoTelefono || card.querySelector(".btn-whatsapp")) return;

        const soloNumeros = parrafoTelefono.textContent.replace(/\D/g, "");
        const numeroWhatsapp = "549" + soloNumeros;

        const boton = document.createElement("a");
        boton.href = `https://wa.me/${numeroWhatsapp}`;
        boton.target = "_blank";
        boton.rel = "noopener noreferrer";
        boton.className = "btn btn-sm btn-whatsapp-custom mt-2 btn-whatsapp";
        boton.textContent = "📱 WhatsApp";

        card.querySelector(".card-body").appendChild(boton);
    });
}

agregarBotonesWhatsapp();