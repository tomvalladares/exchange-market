# Cajero P2P - Exchange Market

<div align="left">

[![Status](https://img.shields.io/badge/status-active-success.svg)]()

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

El objetivo es desarrollar un prototipo de webapp que conecte a personas que necesiten intercambiar efectivo por dinero electrónico y viceversa.

### Stack elegido:

- ⚙️ Backend fastify con base de datos relacional (SQLite)
- 🎨 Frontend vuejs + pug + stylus + pinia + custom fluid postcss plugin.

## 💻 Instrucciones de Instalación y Ejecución <a name="instalacion"></a>

### Instalación

1. **Clonar el repositorio**
```bash
git clone <repo>
```

2. **Instalar todas las dependencias**
```bash
npm run install:all
```

### Ejecución

1. **Iniciar el backend**
```bash
cd backend
npm run dev
```

2. **Iniciar el frontend**
```bash
cd frontend
npm run dev
```

# Developer Notes

> **Disclaimer:** Para testear correctamente el flujo:
> - Presionar tecla `D` para habilitar una custom toolbar.
> - Usar la toolbar para inyectar y resetear casos de matching


## 🎨 Diseño de UI/UX <a name="diseño"></a>

La interfaz de usuario ha sido diseñada siguiendo principios básicos de usabilidad y enfocada en ser user friendly, posee un diseño responsivo que se adapta a diferentes dispositivos. Los principales aspectos del diseño incluyen:

- Paleta de colores consistente y accesible siguiendo reglas de marca
- Navegación intuitiva
- Formularios claros y validación en tiempo real(pendiente)
- Feedback inmediato al usuario
- Diseño mobile-first
- Espaciados consistentes con uso de escala major third

## 📱 Uso de la Aplicación actual y futuros features(*)<a name="uso"></a>

1. **Registro/Login** (** next feature)
   - Crear una cuenta nueva, capturando datos esenciales.
   - Iniciar sesión con credenciales existentes desde grupalia.

2. **Crear un Intercambio**
   - Especificar monto y tipo de intercambio
   - Establecer ubicación y método de pago (** next feature)
   - Definir condiciones del intercambio(** next feature)

3. **Buscar Intercambios en backend**
   - Filtrar por monto, ubicación(*) y método.
   - Ver detalles de intercambios disponibles (*).
   - Notificar a usuarios de un match (*).
   - Generar match de fraccionados, para un match, encontrar fracciones que completen la solicitud.
   - Generar un match incompleto, para un match, encontrar fracciones y notificar si falta menos de un 10-20% por completar, para realizar transacción por un monto menor al solicitado.
   - Contactar con otros usuarios.

4. **Realizar Intercambio**
   - Acordar detalles con la contraparte.
   - Confirmar y completar la transacción (*).
   - En caso de existir un match y no validar transacción, estas debiesen eliminarse del pool.
   - Calificar la experiencia, para generar reputación.

## 📋 RFC (Desafíos Técnicos y de Producto) <a name="rfc"></a>

### Desafíos Técnicos

1. **Seguridad**
   - Implementación de autenticación robusta, JWT, Tokens
   - Implementación de CORS para manejo de XHR
   - Gestión de variables de entorno
   - Protección contra XSS
   - Encriptación de datos sensibles
   - Manejo de lógicas de match y entrega de información sensible desde backend

2. **Arquitectura Backend**
   - Optimización de consultas a base de datos
   - Caché y manejo de sesiones
   - Sistema de colas para operaciones asíncronas
   - Manejo de conflictos en transacciones
   - Mejora de sistema de logging
   - Sistema de notificaciones (SES o similar)
   - Actualizaciones en tiempo real de intercambios

3. **Arquitectura Frontend**
   - Implementación de arquitectura de componentes (átomos, moléculas, organismos)
   - Design system y documentación
   - Sistema de manejo de estados global
   - Implementación de Fluid Typography
   - Sistema de manejo de errores y fallbacks
   - Optimización de performance y lazy loading
   - Integración de mapas y geolocalización
   - Captura, procesamiento y upload a algún bucket (s3) de imagen de usuario.

### Desafíos de Producto

1. **Seguridad y Confianza**
   - Sistema de reputación de usuarios
   - Proceso de verificación de identidad (Carnet ID)
   - Capturar imagen en vivo de la persona, no permitir imagenes de HDD.
   - Sistema de resolución de disputas
   - Definición de términos y condiciones
   - Modulo de mapas intuitivo para definir areas y puntos de encuentro seguros.

2. **Experiencia de Usuario**
   - Onboarding intuitivo
   - Optimización de flujos de usuario, animaciones y helpers
   - Sistema de feedback y reportes
   - Diseño de interfaces responsivas, adecuadas
   - Sistema de notificaciones push
   - Experiencia de matching y coordinación

### Próximos Pasos

1. **Fase 1: MVP**
   - [x] Implementación de funcionalidades core.
   - [x] Testing con usuarios dummy.
   - [x] Testing devtool bar al presionar tecla d.
   - [x] Sistema de match básico.
   - [x] Maqueta en figma.
   - [ ] Sistema de match parcial
   - [ ] Sistema de notificación
   - [ ] Login / Auth
   - [ ] Seteo básico de ubicación
   - [ ] Match en base a monto y ubicación

2. **Fase 2: Mejoras**
   - [ ] Sistema de reputación
   - [ ] Implementación de seguridad
   - [ ] Sistema de componetización frontend
   - [ ] Mejoras en UX/UI
   - [ ] Optimizaciones de rendimiento

3. **Fase 3: Escalamiento**
   - [ ] Implementación de características avanzadas
   - [ ] Expansión de la base de usuarios
   - [ ] Integración con servicios adicionales