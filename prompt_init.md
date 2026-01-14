Prompt para Antigravity — Pastelería Artesanal (Next.js + Supabase)

Quiero desarrollar una aplicación web profesional para una pastelería artesanal, orientada a pedidos por encargo, con carrito de compras, panel de administración con autenticación, y envío automático del pedido vía WhatsApp.

La aplicación debe ser moderna, minimalista y elegante, pensada como un emprendimiento real, sin sobreingeniería.

Stack tecnológico
Frontend

Next.js (App Router)

React + JavaScript

Tailwind CSS

Framer Motion (animaciones sutiles)

Backend / Base de datos

Supabase

Base de datos PostgreSQL

Autenticación integrada

Storage para imágenes de productos

Uso del cliente oficial de Supabase

Estructura del sitio
Rutas públicas

/ → Inicio

/nosotros → Quiénes somos

/productos → Catálogo

/contacto → Contacto

/carrito → Carrito

Rutas privadas (Admin)

/admin/login

/admin/dashboard

/admin/productos

Las rutas admin deben estar protegidas mediante sesión de Supabase.

Diseño y experiencia de usuario

Diseño profesional, moderno y minimalista

Identidad artesanal (colores suaves, tipografía elegante)

Mobile-first

Microinteracciones

Transiciones suaves

Secciones institucionales
Inicio

Hero con propuesta de valor

Productos destacados

Llamado a la acción

Mensaje artesanal / hecho a mano

Nosotros

Historia del emprendimiento

Filosofía de trabajo artesanal

Producción limitada y personalizada

Contacto

Botón directo a WhatsApp

Datos de contacto

Formulario simple opcional

Catálogo de productos

Cada producto debe incluir:

Nombre

Descripción

Precio

Imagen (Supabase Storage)

Stock disponible

Activo / inactivo

Comportamiento:

Mostrar stock

Deshabilitar compra si stock = 0

Cards modernas

Carga optimizada de imágenes

Carrito de compras

Funcionalidades:

Agregar / quitar productos

Modificar cantidades

Subtotal por producto

Total general

Persistencia en cliente (localStorage)

Restricciones:

No permitir cantidades mayores al stock

Revalidar stock al finalizar compra

Finalización de compra

Formulario obligatorio:

Nombre del comprador

Número de celular

Validaciones:

Campos requeridos

Validación básica del teléfono

Pedido por WhatsApp

Al confirmar la compra:

Generar automáticamente un mensaje con:

Nombre del comprador

Teléfono

Lista de productos

Cantidades

Precios

Total

Abrir WhatsApp usando wa.me

Número de WhatsApp configurable mediante variable de entorno

Animaciones

Animación elegante al confirmar compra

Feedback visual de éxito

Desactivar botón para evitar doble envío

Transiciones suaves en carrito

Panel de administración (Supabase Auth)
Autenticación

Login con email y contraseña

Supabase Auth

Solo usuarios admin pueden acceder

Protección de rutas

CRUD de productos (Admin)

Permitir:

Crear productos

Editar productos

Eliminar productos

Activar / desactivar productos

Modificar stock manualmente

Subir imágenes a Supabase Storage

Requisitos:

Formularios validados

Feedback visual

Actualización inmediata del catálogo

El stock debe disminuir al concretar un pedido

Modelo de base de datos (Simple y suficiente)
products

id (uuid)

name

description

price

image_url

stock

active

created_at

orders (opcional, recomendado)

id

customer_name

customer_phone

total

created_at

order_items (opcional)

order_id

product_id

quantity

price

Nota: Aunque el pedido se envíe por WhatsApp, guardar órdenes permite control de stock y métricas.

Seguridad y buenas prácticas

Variables sensibles en .env

Roles simples (admin)

Validación frontend y backend

Manejo correcto de errores

Evitar exponer claves públicas incorrectamente

Observaciones importantes

Supabase reemplaza backend tradicional, no usar solo localStorage para productos

El proyecto debe quedar listo para:

Agregar pagos online en el futuro

Agregar más productos o admins

No sobredimensionar la arquitectura, pero mantener orden

Resultado esperado

Una web de pastelería artesanal lista para producción, con:

Navegación institucional

Carrito funcional

Panel admin seguro

Stock real

Pedido por WhatsApp

Diseño moderno y profesional