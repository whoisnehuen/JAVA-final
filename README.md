# 🎮 TiendaGamer

Tienda online de productos gamer hecha como **entrega final del curso de Java Back-End**.
Tiene una **API REST en Spring Boot** que gestiona un catálogo de productos (físicos y digitales) y un **frontend en React + Vite** para ver los productos, armar un carrito y administrar el stock.

## 🌐 Demo online

El proyecto está desplegado y se puede usar sin instalar nada:

| Parte | Servicio | URL |
|---|---|---|
| Frontend | Vercel | https://java-final.vercel.app |
| API REST | Render | https://tiendaapi-xrv5.onrender.com/productos |
| Base de datos | Supabase (PostgreSQL) | — (solo accesible desde la API) |

> ⏳ **Ojo:** la API está en el plan gratuito de Render, que "duerme" el servicio cuando nadie lo usa. La primera petición puede tardar **30 a 60 segundos** en responder. Si la tienda aparece vacía, esperá un poco y recargá.

> 💡 En **local** el proyecto usa **MySQL**. La versión online usa **PostgreSQL en Supabase**. El código es el mismo: solo cambian las variables de entorno (ver [Configurar la base de datos](#configurar-la-base-de-datos)).

---

## 📋 Tabla de contenidos

- [Tecnologías](#-tecnologías)
- [Estructura del proyecto](#-estructura-del-proyecto)
- [Funcionalidades](#-funcionalidades)
- [Endpoints de la API](#-endpoints-de-la-api)
- [Validaciones y errores](#-validaciones-y-errores)
- [Correr el proyecto en local](#-correr-el-proyecto-en-local)
- [Despliegue](#-despliegue)
- [Autor](#-autor)

---

## 🛠 Tecnologías

**Backend (`tienda/`)**
- Java 21
- Spring Boot 4 (Web MVC, Data JPA, Validation)
- Hibernate / JPA con herencia `SINGLE_TABLE`
- Lombok
- MySQL (local) / PostgreSQL en Supabase (producción)
- Maven (incluye wrapper `mvnw`)
- Docker (para el deploy en Render)

**Frontend (`tienda-front/`)**
- React 19
- React Router 7
- Vite 8
- ESLint

---

## 📁 Estructura del proyecto

La API está organizada por capas: **controller → service → repository → model**.

```
JAVA-final/
├── tienda/                               # API REST (Spring Boot)
│   ├── src/main/java/com/nehueen/tienda/
│   │   ├── TiendaApplication.java        # Punto de entrada
│   │   ├── controller/
│   │   │   └── ProductoController.java   # Endpoints /productos
│   │   ├── services/
│   │   │   └── ProductoService.java      # Lógica de negocio
│   │   ├── repository/
│   │   │   └── Catalogo.java             # Repositorio JPA
│   │   ├── models/
│   │   │   ├── Producto.java             # Entidad base (abstracta) con validaciones
│   │   │   ├── Fisico.java               # Producto físico (marca, color, envío gratis)
│   │   │   └── Digital.java              # Producto digital (plataforma, licencia, desarrollador)
│   │   └── exceptions/
│   │       ├── ProductoNoEncontradoException.java   # Excepción propia (404)
│   │       └── GlobalExceptionHandler.java          # Manejo centralizado (@RestControllerAdvice)
│   ├── src/main/resources/application.properties
│   ├── Dockerfile
│   └── pom.xml
│
└── tienda-front/                         # Frontend (React + Vite)
    ├── public/img/                       # Imágenes de los productos
    ├── src/
    │   ├── components/                   # Header, Footer, ProductCard, CartModal
    │   ├── pages/                        # Home, ProductDetail, CartPage, AdminBodega
    │   ├── config.js                     # URL de la API (variable VITE_API_URL)
    │   ├── App.jsx                       # Rutas y estado del carrito
    │   └── main.jsx
    ├── vite.config.js
    └── package.json
```

---

## ✨ Funcionalidades

| Ruta del front | Qué hace |
|---|---|
| `/` | Lista todos los productos traídos de la API |
| `/producto/:id` | Detalle de un producto (especificaciones, envío, licencia) |
| `/carrito` | Carrito de compras (se guarda en memoria, se pierde al recargar) |
| `/bodega` | Panel de administración: **agregar**, **actualizar** y **eliminar** productos |

### Modelo de datos

Todos los productos se guardan en una sola tabla `producto`. La columna `tipo` indica si es `fisico` o `digital`.

| Campo | Tipo | Aplica a |
|---|---|---|
| `id` | int (autoincremental) | todos |
| `nombre`, `imagen`, `info` | texto | todos |
| `precio` | decimal | todos |
| `stock`, `cuotas` | int | todos |
| `marca`, `color` | texto | físico |
| `envioGratis` | booleano | físico |
| `plataforma`, `licencia`, `desarrollador` | texto | digital |

---

## 🔌 Endpoints de la API

URL base: `http://localhost:6767` en local, o `https://tiendaapi-xrv5.onrender.com` online.

| Método | Endpoint | Descripción | Respuestas |
|---|---|---|---|
| `GET` | `/productos` | Lista todos los productos | `200` |
| `GET` | `/productos/{id}` | Obtiene un producto por id | `200` · `404` si no existe |
| `POST` | `/productos` | Crea un producto | `201` · `400` si los datos son inválidos |
| `PUT` | `/productos/{id}` | Actualiza un producto | `200` · `400` si los datos son inválidos · `404` si no existe |
| `DELETE` | `/productos/{id}` | Elimina un producto | `204` · `404` si no existe |

**Ejemplo: crear un producto físico**

```bash
curl -X POST http://localhost:6767/productos \
  -H "Content-Type: application/json" \
  -d '{
    "tipo": "fisico",
    "nombre": "Mouse Gamer",
    "imagen": "/img/mouse.png",
    "precio": 25000,
    "stock": 10,
    "cuotas": 3,
    "info": "Mouse RGB 7200 DPI",
    "marca": "Logitech",
    "color": "Negro",
    "envioGratis": true
  }'
```

**Ejemplo: crear un producto digital**

```json
{
  "tipo": "digital",
  "nombre": "Juego X",
  "imagen": "/img/dinero.png",
  "precio": 15000,
  "stock": 100,
  "cuotas": 1,
  "info": "Juego de acción",
  "plataforma": "PC",
  "licencia": "Steam",
  "desarrollador": "Estudio Y"
}
```

> El campo `"tipo"` es **obligatorio**: la API lo usa para saber si crear un `Fisico` o un `Digital`. Mandá siempre todos los campos numéricos y booleanos (`stock`, `cuotas` y, en los físicos, `envioGratis`).

---

## ✅ Validaciones y errores

### Reglas de validación

| Campo | Regla |
|---|---|
| `nombre` | Obligatorio, máximo 100 caracteres |
| `imagen` | Obligatoria |
| `precio` | Mayor a 0 |
| `stock` | 0 o más |
| `cuotas` | 0 o más |
| `info` | Máximo 255 caracteres |

### Formato de los errores

Los errores se manejan de forma centralizada en `GlobalExceptionHandler` (`@RestControllerAdvice`).

**400: datos inválidos** (devuelve cada campo con su error):
```json
{
  "nombre": "El nombre es obligatorio",
  "precio": "El precio debe ser mayor a 0",
  "stock": "El stock no puede ser negativo"
}
```

**400: JSON mal formado, campos faltantes o `tipo` inválido:**
```json
{ "error": "JSON inválido: revisá el formato, que estén todos los campos y que \"tipo\" sea \"fisico\" o \"digital\"" }
```

**404: el producto no existe** (excepción propia `ProductoNoEncontradoException`):
```json
{ "error": "No existe el producto con id 99" }
```

---

## 💻 Correr el proyecto en local

### Requisitos

- [Java 21 (JDK)](https://adoptium.net/)
- [MySQL 8](https://dev.mysql.com/downloads/) (o XAMPP) corriendo en el puerto `3306`
- [Node.js 20+](https://nodejs.org/) y npm
- Git

> No hace falta instalar Maven: el proyecto trae el wrapper (`mvnw` / `mvnw.cmd`).

### 1. Clonar el repositorio

```bash
git clone https://github.com/whoisnehuen/JAVA-final.git
cd JAVA-final
```

### 2. Levantar la API

Con MySQL prendido:

```bash
cd tienda

# Linux / macOS
./mvnw spring-boot:run

# Windows
mvnw.cmd spring-boot:run
```

La API queda disponible en **http://localhost:6767/productos**.

No hace falta crear nada a mano: la base `tiendadb` se crea sola (`createDatabaseIfNotExist=true`) y Hibernate crea la tabla `producto` al arrancar (`ddl-auto=update`). La base empieza vacía; podés cargar productos desde `/bodega` en el front o con los ejemplos `curl` de arriba.

#### Configurar la base de datos

En `application.properties` cada dato de conexión tiene un **valor por defecto** (MySQL local) que se puede pisar con una **variable de entorno**:

| Variable | Valor por defecto | Para qué sirve |
|---|---|---|
| `DB_URL` | `jdbc:mysql://localhost:3306/tiendadb?createDatabaseIfNotExist=true` | URL de la base |
| `DB_USER` | `root` | Usuario |
| `DB_PASSWORD` | *(vacío)* | Contraseña |
| `PORT` | `6767` | Puerto de la API |

Si tu usuario `root` de MySQL tiene contraseña, pasala con la variable:

```bash
# Linux / macOS
DB_PASSWORD=tu_contraseña ./mvnw spring-boot:run
```

```powershell
# Windows (PowerShell)
$env:DB_PASSWORD="tu_contraseña"
.\mvnw.cmd spring-boot:run
```

### 3. Levantar el frontend

En otra terminal:

```bash
cd tienda-front
npm install
npm run dev
```

El front queda disponible en **http://localhost:8365** y usa la API local (`http://localhost:6767`) por defecto.

Si querés que el front local use otra API (por ejemplo, la online), creá un archivo `tienda-front/.env.local` con:

```
VITE_API_URL=https://tiendaapi-xrv5.onrender.com
```

y reiniciá `npm run dev`.

### Puertos

| Servicio | Puerto local |
|---|---|
| API (Spring Boot) | `6767` |
| Frontend (Vite) | `8365` |
| MySQL | `3306` |

### Agregar imágenes

Guardá la imagen en `tienda-front/public/img/` y, al crear el producto, poné en el campo `imagen` la ruta `/img/nombre-del-archivo.png`.

### Otros comandos del front

| Comando | Qué hace |
|---|---|
| `npm run dev` | Servidor de desarrollo |
| `npm run build` | Genera la versión de producción en `dist/` |
| `npm run preview` | Sirve la build de producción en local |
| `npm run lint` | Revisa el código con ESLint |

---

## 🚀 Despliegue

| Parte | Servicio | Configuración |
|---|---|---|
| Frontend | Vercel | Carpeta `tienda-front`, build `npm run build`, salida `dist`. Variable de entorno `VITE_API_URL=https://tiendaapi-xrv5.onrender.com` |
| API | Render | Se construye con el `Dockerfile` de `tienda/`. Variables de entorno `DB_URL`, `DB_USER` y `DB_PASSWORD` apuntando a Supabase |
| Base de datos | Supabase | PostgreSQL administrado, conexión por el *connection pooler* con SSL |

> Las credenciales de producción **no están en el repositorio**: se cargan como variables de entorno en Render.

---

## 👤 Autor

**Nehuen** — [GitHub](https://github.com/whoisnehuen) · [Instagram](https://instagram.com/bach.nehuen8)