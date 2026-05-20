ESTA API REST FUNCIONA EN LA SIGUIENTE URL: http://localhost:4000.

ENDPOINTS:

----MEMBERS-----

Método - Endpoint - Descripción

GET - /api/members - Obtener todos los miembros
GET - /api/members?status=active - Filtrar miembros activos
GET - /api/members?status=inactive - Filtrar miembros inactivos
GET - /api/members/:id - Obtener un miembro por ID
POST - /api/members - Crear un nuevo miembro
PUT - /api/members/:id - Actualizar un miembro
DELETE - /api/members/:id - Eliminar un miembro

||EJEMPLO DE USO PARA ENDPOINT POST||

http://localhost:4000/api/members
{
  "name": "Carlos Gómez",
  "email": "carlos@email.com",
  "plan": "pro" ->SOLO ACEPTA 3 VALORES: basic, pro, enterprise
}

||RESULTADO EN MONGODB||

{
  "success": true,
  "data": {
    "_id": "664f1a2b3c4d5e6f7a8b9c0d",
    "name": "Carlos Gómez",
    "email": "carlos@email.com",
    "plan": "pro",
    "active": true,
    "createdAt": "2025-05-19T10:00:00.000Z",
    "updatedAt": "2025-05-19T10:00:00.000Z"
  }
}

--------------
----ROOMS-----

Método - Endpoint - Descripción

GET - /api/rooms - Obtener todas las salas
GET - /api/rooms:id - Obtener una sala por ID
POST - /api/rooms - Crear una nueva sala
PUT - /api/rooms:id - Actualizar una sala
DELETE - /api/rooms:id - Eliminar una sala

||EJEMPLO DE USO PARA ENDPOINT POST||

http://localhost:4000/api/rooms
{
  "name": "Sala Innovación",
  "capacity": 8,
  "type": "meeting_room", -> SOLO ACEPTA 3 VALORES: private, shared, meeting_room
  "pricePerHour": 25000
}

||RESULTADO EN MONGODB||

{
  "success": true,
  "data": {
    "_id": "664f1a2b3c4d5e6f7a8b9c1e",
    "name": "Sala Innovación",
    "capacity": 8,
    "type": "meeting_room",
    "pricePerHour": 25000,
    "createdAt": "2025-05-19T10:00:00.000Z",
    "updatedAt": "2025-05-19T10:00:00.000Z"
  }
}

--------------
----BOOKING-----

Método - Endpoint - Descripción

GET - /api/bookings - Obtener todas las reservas
GET - /api/bookings?status=pending - Filtrar por estado
GET - /api/bookings?roomId=:id - Filtrar por sala
GET - /api/bookings?status=confirmed&roomId=:id - Filtrar por estado y sala
GET - /api/bookings/:id - Obtener una reserva por ID
POST - /api/bookings - Crear una nueva reserva
PATCH - /api/bookings/:id/status - Cambiar el estado de una reserva

||EJEMPLO DE USO PARA ENDPOINT POST||

http://localhost:4000/api/bookings
{
  "startDate": "2025-05-20T09:00:00.000Z",
  "endDate": "2025-05-20T11:00:00.000Z",
  "member": "664f1a2b3c4d5e6f7a8b9c0d",
  "room": "664f1a2b3c4d5e6f7a8b9c1e",
  "notes": "Reunión de equipo de diseño"
}

||RESULTADO EN MONGODB||

{
  "_id": {
    "$oid": "6a0d3d309bc6f0bacc274384"
  },
  "startDate": {
    "$date": "2025-05-20T09:00:00.000Z"
  },
  "endDate": {
    "$date": "2025-05-20T11:00:00.000Z"
  },
  "status": "pending",
  "member": {
    "$oid": "664f1a2b3c4d5e6f7a8b9c0d"
  },
  "room": {
    "$oid": "664f1a2b3c4d5e6f7a8b9c1e"
  },
  "notes": "Reunión de equipo de diseño",
  "createdAt": {
    "$date": "2026-05-20T04:48:48.692Z"
  },
  "updatedAt": {
    "$date": "2026-05-20T04:48:48.692Z"
  },
  "__v": 0
}

||EJEMPLO RESULTADO ARA ENDPOINT GET CON POPULATE||


{
  "success": true,
  "data": {
    "_id": "664f1a2b3c4d5e6f7a8b9c2f",
    "startDate": "2025-05-20T09:00:00.000Z",
    "endDate": "2025-05-20T11:00:00.000Z",
    "status": "pending",
    "member": {
      "_id": "664f1a2b3c4d5e6f7a8b9c0d",
      "name": "Carlos Gómez",
      "email": "carlos@email.com",
      "plan": "pro"
    },
    "room": {
      "_id": "664f1a2b3c4d5e6f7a8b9c1e",
      "name": "Sala Innovación",
      "type": "meeting_room",
      "pricePerHour": 25000
    },
    "notes": "Reunión de equipo de diseño",
    "createdAt": "2025-05-19T10:00:00.000Z",
    "updatedAt": "2025-05-19T10:00:00.000Z"
  }
}

||EJEMPLO DE USO PARA PATCH||

{
  "status": "confirmed"
}

CAMBIA EL STATUS DE PENDING A CONFIRMED 

--------------