# SIGA — Sistema Integral de Gestión de Alquileres

## Integrantes

- Esteban Nájera
- Magui Guerrero
- Claudia López

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

En la sección **Propiedades**, para organizar las tarjetas de propiedades en
fila con ajuste automático (`flex-wrap`) según el ancho de pantalla; también
en la barra de navegación y en los ítems de la lista de pagos.

## ¿Dónde utilizaron Grid?

En el **Dashboard**, para distribuir las tarjetas de indicadores generales
(propiedades totales, alquiladas, disponibles, en mantenimiento y contratos
por vencer) en una grilla de columnas.

## ¿Qué variables CSS crearon?

`--color-primario`, `--color-secundario`, `--fuente-principal`,
`--espaciado-base` y `--radio-borde`, definidas en `:root` para mantener
consistencia visual en todo el sitio y facilitar cambios de estilo globales.

## ¿Cómo implementaron el Responsive Design?

Mediante Media Queries en los breakpoints de tablet (768px) y celular
(480px), ajustando la cantidad de columnas del Grid del dashboard y la
disposición de la navegación y los pagos de fila a columna.

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
