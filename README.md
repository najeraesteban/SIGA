# SIGA — Sistema Integral de Gestión de Alquileres

## Integrantes

- Esteban Nájera
- Magui [Apellido]
- Claudia [Apellido]

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
- CSS3 (Flexbox, Grid, variables CSS, Media Queries)
- Git y GitHub para control de versiones y trabajo colaborativo

## ¿Dónde utilizaron Flexbox?

En la lista de **Pagos y Vencimientos**, para organizar cada ítem con sus
datos (contrato, vencimiento, estado) distribuidos y alineados de forma
flexible según el ancho de pantalla.

## ¿Dónde utilizaron Grid?

En el **Dashboard** (resumen general) y en las secciones de **Propiedades**
y **Propietarios**, para distribuir tarjetas en columnas que se adaptan
automáticamente según el espacio disponible.

## ¿Qué variables CSS crearon?

Colores de la paleta (`--pino`, `--ocre`, `--ladrillo`, `--verde-ok`, entre
otros), tipografías (`--fuente-titulo`, `--fuente-texto`), y variables de
layout (`--ancho-nav`, `--radio-borde`, `--sombra-card`), definidas en
`:root` para mantener consistencia visual y facilitar cambios globales.

## ¿Cómo implementaron el Responsive Design?

Mediante Media Queries en los breakpoints de 860px (donde la barra lateral
fija pasa a ser una barra horizontal) y 480px (ajustes de tipografía y
disposición para celulares).

## Estructura del proyecto

```
SIGA/
├── img/
├── style.css
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
