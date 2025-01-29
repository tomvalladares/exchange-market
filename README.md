# Cajero P2P - Exchange Market

<div align="center">

[![Status](https://img.shields.io/badge/status-active-success.svg)]()
[![License](https://img.shields.io/badge/license-MIT-blue.svg)]()

</div>

## 📝 Tabla de Contenidos

- [Objetivo del Proyecto](#objetivo)
- [Arquitectura y Modelado](#arquitectura)
- [Diseño de UI/UX](#diseño)
- [Instrucciones de Instalación y Ejecución](#instalacion)
- [Uso de la Aplicación](#uso)
- [RFC (Desafíos Técnicos y de Producto)](#rfc)
- [Contribuciones y Contacto](#contribuciones)

## 🎯 Objetivo del Proyecto <a name="objetivo"></a>

El objetivo es desarrollar un prototipo de webapp que conecte a personas que necesiten intercambiar efectivo por dinero electrónico.

### Requisitos principales:

- ⚙️ Backend con base de datos relacional (recomendado: SQLite)
- 🎨 Frontend con la tecnología de tu preferencia
- 📱 Compatibilidad con sistema de notificaciones futuro
- 👥 UI/UX intuitiva

## 🏗 Arquitectura y Modelado <a name="arquitectura"></a>

### Entidades principales:

| Entidad | Atributos |
|---------|-----------|
| Usuario | id, nombre, email, etc. |
| Solicitud | monto, tipo_intercambio, usuarioId, estado |

// ... existing code ...

## 💻 Instrucciones de Instalación y Ejecución <a name="instalacion"></a>

### Prerequisitos

- Node.js >= 14
- npm >= 6

### Instalación

1. **Clonar el repositorio**