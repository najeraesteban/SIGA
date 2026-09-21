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
        actualizarPanel();
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

// Números, barra de ocupación y avisos del panel, calculados a partir de las
// propiedades, los contratos y los pagos cargados
function actualizarPanel() {
    const ponerTexto = function (id, valor) {
        const elemento = document.getElementById(id);
        if (elemento) {
            elemento.textContent = valor;
        }
    };

    // Propiedades
    const contar = function (estado) {
        return document.querySelectorAll('#propiedades .card[data-estado="' + estado + '"]').length;
    };
    const total = document.querySelectorAll("#propiedades .card[data-estado]").length;
    const alquiladas = contar("alquilada");
    const disponibles = contar("disponible");
    const mantenimiento = contar("mantenimiento");

    ponerTexto("panel-total", total);
    ponerTexto("panel-alquiladas", alquiladas);
    ponerTexto("panel-disponibles", disponibles);
    ponerTexto("panel-mantenimiento", mantenimiento);

    // Ocupación y barra apilada
    ponerTexto("panel-ocupacion", total > 0 ? Math.round(alquiladas / total * 100) : 0);
    ponerTexto("panel-ocupacion-detalle", alquiladas + " de " + total + " propiedades alquiladas");

    [["alquiladas", alquiladas], ["disponibles", disponibles], ["mantenimiento", mantenimiento]].forEach(function (par) {
        const barra = document.getElementById("barra-" + par[0]);
        if (barra && total > 0) {
            const ancho = par[1] / total * 100;
            barra.style.width = ancho + "%";
            barra.setAttribute("aria-valuenow", Math.round(ancho));
        }
    });

    // Contratos: ingreso mensual de los vigentes y lista de los que vencen pronto
    const porVencer = [];
    const alquilerPorContrato = {};
    let ingreso = 0;
    let vigentes = 0;

    document.querySelectorAll("#contratos tbody tr").forEach(function (fila) {
        const estado = fila.querySelector(".estado-contrato .badge");
        if (!estado || estado.textContent === "Vencido") return;

        const celdas = fila.querySelectorAll("td");
        const alquiler = parseInt(celdas[5].textContent.replace(/\D/g, ""), 10);
        alquilerPorContrato[celdas[0].textContent.trim()] = alquiler;
        ingreso += alquiler;
        vigentes++;

        if (estado.classList.contains("bg-danger")) {
            porVencer.push({
                titulo: "Contrato #" + celdas[0].textContent.trim() + " · " + celdas[1].textContent.trim(),
                detalle: "Vence " + celdas[4].textContent.trim() + " · " + celdas[2].textContent.trim(),
                fin: celdas[4].textContent.trim()
            });
        }
    });

    porVencer.sort(function (a, b) {
        return parsearFecha(a.fin) - parsearFecha(b.fin);
    });

    ponerTexto("panel-ingreso", "$" + ingreso.toLocaleString("es-AR"));
    ponerTexto("panel-ingreso-detalle", "según " + vigentes + " contratos vigentes");
    ponerTexto("panel-por-vencer", porVencer.length);
    ponerTexto("atencion-contratos", porVencer.length);

    // Pagos: los que siguen pendientes y lo cobrado en el mes
    const pendientes = [];
    let cobrado = 0;

    document.querySelectorAll("#pagos .list-group-item").forEach(function (item) {
        const concepto = item.querySelector("span").textContent.trim();

        if (item.querySelector(".badge.bg-danger")) {
            pendientes.push({
                titulo: concepto,
                detalle: item.querySelector(".fecha-pago").textContent.trim()
            });
        } else {
            const numero = concepto.match(/#(\d+)/);
            if (numero && alquilerPorContrato[numero[1]]) {
                cobrado += alquilerPorContrato[numero[1]];
            }
        }
    });

    const porcentajeCobrado = ingreso > 0 ? cobrado / ingreso * 100 : 0;
    const barraCobrado = document.getElementById("barra-cobrado");
    if (barraCobrado) {
        barraCobrado.setAttribute("aria-valuenow", Math.round(porcentajeCobrado));
        barraCobrado.querySelector(".progress-bar").style.width = porcentajeCobrado + "%";
    }
    ponerTexto("panel-cobrado", "Cobrado del mes: $" + cobrado.toLocaleString("es-AR") + " de $" + ingreso.toLocaleString("es-AR"));

    ponerTexto("panel-pendientes", pendientes.length);
    ponerTexto("atencion-pagos", pendientes.length);

    // Listas de "Requiere atención"
    llenarLista("lista-por-vencer", porVencer, "#contratos", "No hay contratos por vencer en los próximos 30 días");
    llenarLista("lista-pendientes", pendientes, "#pagos", "No hay pagos pendientes");
}

function llenarLista(idLista, elementos, enlace, mensajeVacio) {
    const lista = document.getElementById(idLista);
    if (!lista) return;

    lista.innerHTML = "";

    if (elementos.length === 0) {
        const vacio = document.createElement("li");
        vacio.className = "list-group-item px-0 text-muted";
        vacio.textContent = mensajeVacio;
        lista.appendChild(vacio);
        return;
    }

    elementos.forEach(function (elemento) {
        const item = document.createElement("li");
        item.className = "list-group-item px-0";

        const link = document.createElement("a");
        link.href = enlace;
        link.className = "fw-semibold link-body-emphasis text-decoration-none";
        link.textContent = elemento.titulo;

        const detalle = document.createElement("small");
        detalle.className = "d-block text-muted";
        detalle.textContent = elemento.detalle;

        item.appendChild(link);
        item.appendChild(detalle);
        lista.appendChild(item);
    });
}

actualizarPanel();

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


// ---------- Cerrar el menú desplegable al elegir una sección (celular) ----------
const menuDesplegable = document.getElementById("sidebarOffcanvas");

document.querySelectorAll("#sidebarOffcanvas .nav-link").forEach(function (link) {
    link.addEventListener("click", function (evento) {
        const menu = bootstrap.Offcanvas.getInstance(menuDesplegable);

        // Solo actúa si el menú está abierto (en pantallas chicas): primero lo cierra
        // y recién después salta a la sección, para que el scroll no se corte.
        if (menu && menuDesplegable.classList.contains("show")) {
            evento.preventDefault();
            menuDesplegable.addEventListener("hidden.bs.offcanvas", function () {
                window.location.hash = link.getAttribute("href");
            }, { once: true });
            menu.hide();
        }
    });
});