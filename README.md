# 📚 Biblioteca API REST

API REST para gestión de biblioteca desarrollada con Node.js, Express y MongoDB.

---

## 🚀 Instalación

```bash
npm install
```

Crea un archivo `.env` en la raíz del proyecto:

```env
MONGODB_URI=mongodb://localhost:27017/biblioteca
PORT=4000
NODE_ENV=development
```

```bash
npm run dev
```

---

## 📌 Base URL

```
http://localhost:4000/api
```

---

## 🔐 Auth

### POST `/api/auth/register`
Registra un nuevo usuario con contraseña encriptada.

**Request:**
```json
{
  "nombre": "Juan Pérez",
  "email": "juan@email.com",
  "password": "123456",
  "rol": "librarian"
}
```

**Response `201`:**
```json
{
  "success": true,
  "data": {
    "_id": "664a1b2c3d4e5f6a7b8c9d0e",
    "nombre": "Juan Pérez",
    "email": "juan@email.com",
    "rol": "librarian",
    "createdAt": "2024-05-20T10:00:00.000Z",
    "updatedAt": "2024-05-20T10:00:00.000Z"
  }
}
```

---

### POST `/api/auth/login`
Inicia sesión verificando credenciales con bcrypt.

**Request:**
```json
{
  "email": "juan@email.com",
  "password": "123456"
}
```

**Response `200`:**
```json
{
  "success": true,
  "data": {
    "_id": "664a1b2c3d4e5f6a7b8c9d0e",
    "nombre": "Juan Pérez",
    "email": "juan@email.com",
    "rol": "librarian"
  }
}
```

**Response `401` (credenciales inválidas):**
```json
{
  "success": false,
  "message": "Credenciales inválidas"
}
```

---

## ✍️ Authors

### GET `/api/authors`
Lista todos los autores.

**Response `200`:**
```json
{
  "success": true,
  "data": [
    {
      "_id": "664a1b2c3d4e5f6a7b8c9d01",
      "nombre": "Gabriel García Márquez",
      "nacionalidad": "Colombiana",
      "fechaNacimiento": "1927-03-06T00:00:00.000Z"
    }
  ]
}
```

---

### GET `/api/authors/:id`
Obtiene un autor por ID.

**Response `200`:**
```json
{
  "success": true,
  "data": {
    "_id": "664a1b2c3d4e5f6a7b8c9d01",
    "nombre": "Gabriel García Márquez",
    "nacionalidad": "Colombiana",
    "fechaNacimiento": "1927-03-06T00:00:00.000Z"
  }
}
```

**Response `404`:**
```json
{
  "success": false,
  "message": "Autor no encontrado"
}
```

---

### POST `/api/authors`
Crea un nuevo autor.

**Request:**
```json
{
  "nombre": "Gabriel García Márquez",
  "nacionalidad": "Colombiana",
  "fechaNacimiento": "1927-03-06"
}
```

**Response `201`:**
```json
{
  "success": true,
  "data": {
    "_id": "664a1b2c3d4e5f6a7b8c9d01",
    "nombre": "Gabriel García Márquez",
    "nacionalidad": "Colombiana",
    "fechaNacimiento": "1927-03-06T00:00:00.000Z",
    "createdAt": "2024-05-20T10:00:00.000Z",
    "updatedAt": "2024-05-20T10:00:00.000Z"
  }
}
```

---

### PUT `/api/authors/:id`
Actualiza un autor existente.

**Request:**
```json
{
  "nacionalidad": "Colombiano-Mexicana"
}
```

**Response `200`:**
```json
{
  "success": true,
  "data": {
    "_id": "664a1b2c3d4e5f6a7b8c9d01",
    "nombre": "Gabriel García Márquez",
    "nacionalidad": "Colombiano-Mexicana",
    "fechaNacimiento": "1927-03-06T00:00:00.000Z"
  }
}
```

---

### DELETE `/api/authors/:id`
Elimina un autor.

**Response `200`:**
```json
{
  "success": true,
  "message": "Autor eliminado correctamente"
}
```

---

## 📖 Books

### GET `/api/books`
Lista todos los libros. Acepta filtros opcionales por query params.

| Query Param | Descripción | Ejemplo |
|---|---|---|
| `genre` | Filtra por género | `?genre=fiction` |
| `authorId` | Filtra por ID de autor | `?authorId=664a...` |

**Response `200`:**
```json
{
  "success": true,
  "data": [
    {
      "_id": "664a1b2c3d4e5f6a7b8c9d02",
      "titulo": "Cien años de soledad",
      "isbn": "978-0-06-088328-7",
      "genero": "fiction",
      "anio": 1967,
      "copiasDisponibles": 5,
      "author": "664a1b2c3d4e5f6a7b8c9d01"
    }
  ]
}
```

---

### GET `/api/books/:id`
Obtiene un libro por ID con populate del autor.

**Response `200`:**
```json
{
  "success": true,
  "data": {
    "_id": "664a1b2c3d4e5f6a7b8c9d02",
    "titulo": "Cien años de soledad",
    "isbn": "978-0-06-088328-7",
    "genero": "fiction",
    "anio": 1967,
    "copiasDisponibles": 5,
    "author": {
      "_id": "664a1b2c3d4e5f6a7b8c9d01",
      "nombre": "Gabriel García Márquez",
      "nacionalidad": "Colombiana"
    }
  }
}
```

---

### POST `/api/books`
Crea un nuevo libro.

**Request:**
```json
{
  "titulo": "Cien años de soledad",
  "isbn": "978-0-06-088328-7",
  "genero": "fiction",
  "anio": 1967,
  "copiasDisponibles": 5,
  "author": "664a1b2c3d4e5f6a7b8c9d01"
}
```

**Response `201`:**
```json
{
  "success": true,
  "data": {
    "_id": "664a1b2c3d4e5f6a7b8c9d02",
    "titulo": "Cien años de soledad",
    "isbn": "978-0-06-088328-7",
    "genero": "fiction",
    "anio": 1967,
    "copiasDisponibles": 5,
    "author": "664a1b2c3d4e5f6a7b8c9d01",
    "createdAt": "2024-05-20T10:00:00.000Z",
    "updatedAt": "2024-05-20T10:00:00.000Z"
  }
}
```

---

### PUT `/api/books/:id`
Actualiza un libro existente.

**Request:**
```json
{
  "copiasDisponibles": 10
}
```

**Response `200`:**
```json
{
  "success": true,
  "data": {
    "_id": "664a1b2c3d4e5f6a7b8c9d02",
    "titulo": "Cien años de soledad",
    "copiasDisponibles": 10
  }
}
```

---

### DELETE `/api/books/:id`
Elimina un libro.

**Response `200`:**
```json
{
  "success": true,
  "message": "Libro eliminado correctamente"
}
```

---

## 👤 Readers

### GET `/api/readers`
Lista todos los lectores.

**Response `200`:**
```json
{
  "success": true,
  "data": [
    {
      "_id": "664a1b2c3d4e5f6a7b8c9d03",
      "nombre": "María López",
      "email": "maria@email.com",
      "membresia": "premium",
      "activo": true
    }
  ]
}
```

---

### GET `/api/readers/:id`
Obtiene un lector por ID.

**Response `200`:**
```json
{
  "success": true,
  "data": {
    "_id": "664a1b2c3d4e5f6a7b8c9d03",
    "nombre": "María López",
    "email": "maria@email.com",
    "membresia": "premium",
    "activo": true
  }
}
```

---

### POST `/api/readers`
Crea un nuevo lector.

**Request:**
```json
{
  "nombre": "María López",
  "email": "maria@email.com",
  "membresia": "premium"
}
```

**Response `201`:**
```json
{
  "success": true,
  "data": {
    "_id": "664a1b2c3d4e5f6a7b8c9d03",
    "nombre": "María López",
    "email": "maria@email.com",
    "membresia": "premium",
    "activo": true,
    "createdAt": "2024-05-20T10:00:00.000Z",
    "updatedAt": "2024-05-20T10:00:00.000Z"
  }
}
```

---

### PUT `/api/readers/:id`
Actualiza un lector existente.

**Request:**
```json
{
  "membresia": "standard",
  "activo": false
}
```

**Response `200`:**
```json
{
  "success": true,
  "data": {
    "_id": "664a1b2c3d4e5f6a7b8c9d03",
    "nombre": "María López",
    "email": "maria@email.com",
    "membresia": "standard",
    "activo": false
  }
}
```

---

### DELETE `/api/readers/:id`
Elimina un lector.

**Response `200`:**
```json
{
  "success": true,
  "message": "Lector eliminado correctamente"
}
```

---

## 📋 Loans

### GET `/api/loans`
Lista todos los préstamos con populate de Book y Reader. Acepta filtros opcionales.

| Query Param | Descripción | Ejemplo |
|---|---|---|
| `status` | Filtra por estado | `?status=active` |
| `genre` | Filtra por género del libro | `?genre=fiction` |

**Response `200`:**
```json
{
  "success": true,
  "data": [
    {
      "_id": "664a1b2c3d4e5f6a7b8c9d04",
      "fechaPrestamo": "2024-05-20T00:00:00.000Z",
      "fechaDevolucionEsperada": "2024-06-20T00:00:00.000Z",
      "fechaDevuelto": null,
      "estado": "active",
      "book": {
        "_id": "664a1b2c3d4e5f6a7b8c9d02",
        "titulo": "Cien años de soledad",
        "isbn": "978-0-06-088328-7"
      },
      "reader": {
        "_id": "664a1b2c3d4e5f6a7b8c9d03",
        "nombre": "María López",
        "email": "maria@email.com"
      }
    }
  ]
}
```

---

### GET `/api/loans/:id`
Obtiene un préstamo por ID con populate completo de Book y Reader.

**Response `200`:**
```json
{
  "success": true,
  "data": {
    "_id": "664a1b2c3d4e5f6a7b8c9d04",
    "fechaPrestamo": "2024-05-20T00:00:00.000Z",
    "fechaDevolucionEsperada": "2024-06-20T00:00:00.000Z",
    "fechaDevuelto": null,
    "estado": "active",
    "notas": "Préstamo especial",
    "book": {
      "_id": "664a1b2c3d4e5f6a7b8c9d02",
      "titulo": "Cien años de soledad",
      "genero": "fiction"
    },
    "reader": {
      "_id": "664a1b2c3d4e5f6a7b8c9d03",
      "nombre": "María López",
      "membresia": "premium"
    }
  }
}
```

---

### POST `/api/loans`
Crea un nuevo préstamo. Valida que `fechaDevolucionEsperada` sea posterior a `fechaPrestamo`.

**Request:**
```json
{
  "fechaPrestamo": "2024-05-20",
  "fechaDevolucionEsperada": "2024-06-20",
  "book": "664a1b2c3d4e5f6a7b8c9d02",
  "reader": "664a1b2c3d4e5f6a7b8c9d03",
  "notas": "Préstamo especial"
}
```

**Response `201`:**
```json
{
  "success": true,
  "data": {
    "_id": "664a1b2c3d4e5f6a7b8c9d04",
    "fechaPrestamo": "2024-05-20T00:00:00.000Z",
    "fechaDevolucionEsperada": "2024-06-20T00:00:00.000Z",
    "fechaDevuelto": null,
    "estado": "active",
    "notas": "Préstamo especial",
    "book": "664a1b2c3d4e5f6a7b8c9d02",
    "reader": "664a1b2c3d4e5f6a7b8c9d03",
    "createdAt": "2024-05-20T10:00:00.000Z",
    "updatedAt": "2024-05-20T10:00:00.000Z"
  }
}
```

**Response `400` (fecha inválida):**
```json
{
  "success": false,
  "message": "La fecha de devolución esperada debe ser posterior a la fecha de préstamo"
}
```

---

### PATCH `/api/loans/:id/status`
Cambia únicamente el estado del préstamo.

**Request:**
```json
{
  "estado": "returned"
}
```

**Response `200`:**
```json
{
  "success": true,
  "data": {
    "_id": "664a1b2c3d4e5f6a7b8c9d04",
    "estado": "returned",
    "fechaPrestamo": "2024-05-20T00:00:00.000Z",
    "fechaDevolucionEsperada": "2024-06-20T00:00:00.000Z"
  }
}
```