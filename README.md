# SIGA — Sistema Integral de Gestión de Alquileres

## Integrantes

- Esteban Nájera
- Magali Guerrero
- Claudia Lopez

**Institución:** Universidad Tecnológica Nacional — Facultad Regional Tucumán (UTN FRT)
**Carrera:** Tecnicatura/Ingeniería en Programación
**Proyecto:** Trabajo Final Integrador (TFI)

## Descripción

SIGA es un sistema web pensado para digitalizar la gestión operativa de una
inmobiliaria. Centraliza la administración de propiedades, propietarios,
inquilinos y contratos de alquiler, junto con el seguimiento de pagos,
vencimientos y liquidaciones, reemplazando planillas y procesos manuales por
un panel único y organizado.

El sistema contempla dos roles de usuario:

- **Administrador**: gestión completa de usuarios, propiedades, contratos,
  pagos y acceso a reportes.
- **Empleado**: registro de propietarios, inquilinos, propiedades, contratos
  y pagos en el día a día operativo.

## Tecnologías utilizadas

- HTML5 semántico
- CSS3 (Flexbox, variables CSS, Media Queries)
- Bootstrap 5.3 (sistema de grilla, componentes y utilidades)
- JavaScript (manipulación del DOM: buscadores, filtros y estados de pago)
- Git y GitHub para control de versiones y trabajo colaborativo

## ¿Dónde utilizaron Flexbox?

En la lista de **Pagos y Vencimientos**, para organizar cada ítem con sus
datos (contrato, vencimiento, estado) distribuidos y alineados de forma
flexible según el ancho de pantalla.

## ¿Dónde utilizaron Grid?

Se utilizó el sistema de grilla de Bootstrap (`row` y `row-cols-*`) en el
**Dashboard** (resumen general) y en las secciones de **Propiedades**,
**Propietarios e Inquilinos** y **Sobre Nosotros**, para distribuir tarjetas en
columnas que se adaptan automáticamente según el ancho de pantalla. La grilla
de Bootstrap 5 funciona internamente con Flexbox.

## ¿Qué variables CSS crearon?

Colores de la paleta (`--pino`, `--ocre`, `--ladrillo`, `--verde-ok`, entre
otros), tipografías (`--fuente-titulo`, `--fuente-texto`), y variables de
layout (`--ancho-nav`, `--radio-borde`, `--sombra-card`), definidas en
`:root` para mantener consistencia visual y facilitar cambios globales.

## ¿Cómo implementaron el Responsive Design?

Combinando las clases responsive de Bootstrap (`row-cols-*`, `d-md-*`) con
Media Queries propias en los breakpoints de 768px (a partir de ahí se muestra
la barra lateral fija y el contenido se desplaza a la derecha; por debajo se
usa una barra superior con menú desplegable) y 576px (ajuste de espaciado en la
sección Sobre Nosotros para celulares).

## SEO

- Atributo `lang="es"` en la etiqueta `<html>`.
- `<title>` descriptivo, con las palabras clave del sistema.
- `<meta name="description">` con un resumen de lo que ofrece SIGA.
- Metaetiquetas `robots` (`index, follow`) y `author`.
- Jerarquía de encabezados ordenada: un único `<h1>`, `<h2>` para las
  secciones y `<h3>` para las tarjetas.
- HTML semántico (`header`, `nav`, `main`, `section`, `article`, `footer`).
- Texto alternativo (`alt`) descriptivo en todas las imágenes.
- Carga diferida de imágenes (`loading="lazy"`) y fuentes con `preconnect` y
  `display=swap` para mejorar el rendimiento.

## Estructura del proyecto

```
SIGA/
├── img/
├── style.css
├── script.js
├── index.html
└── README.md
```

## Organización del repositorio

El desarrollo se organiza con las ramas `main` (versión estable) y `dev`
(rama principal de desarrollo). Cada integrante trabaja sobre su propia rama
siguiendo la convención `<token>/<nombre-corto>` (por ejemplo,
`feature/dashboard-nav`), integrando el trabajo a `dev` mediante Pull
Requests revisados por el resto del equipo.

---

*Se utilizaron herramientas de IA como apoyo para organizar el flujo de
trabajo en Git y para la generación de código de referencia, comprendido y
adaptado por el equipo.*
