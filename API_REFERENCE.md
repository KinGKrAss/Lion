# 📖 API Reference

## Base URL
```
http://localhost:5000
```

## Authentication

All requests (except auth) should include:
```
Authorization: Bearer <token>
```

---

## 🔐 Auth Endpoints

### Register User
```
POST /api/auth/register
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "secure_password"
}

Response:
{
  "userId": "uuid",
  "email": "user@example.com",
  "message": "User registered successfully"
}
```

### Login
```
POST /api/auth/login
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "secure_password"
}

Response:
{
  "userId": "uuid",
  "email": "user@example.com",
  "token": "auth_token_here",
  "message": "Login successful"
}
```

---

## 💬 Chat Endpoints

### Create Session
```
POST /api/chat/session
Authorization: Bearer <token>
Content-Type: application/json

{
  "language": "es",
  "scenario": "cafe"
}

Response:
{
  "id": "session_uuid",
  "userId": "user_uuid",
  "language": "es",
  "scenario": "cafe",
  "messages": [],
  "createdAt": 1234567890,
  "updatedAt": 1234567890
}
```

### Send Message
```
POST /api/chat
Authorization: Bearer <token>
Content-Type: application/json

{
  "message": "Hola, quiero un café",
  "language": "es",
  "scenario": "cafe",
  "sessionId": "session_uuid"
}

Response:
{
  "message": "Excelente! Un café pequeño o grande?",
  "timestamp": 1234567890
}
```

---

## 📧 Contact Endpoints

### Submit Contact
```
POST /api/contact
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "topic": "Immobilien",
  "message": "Ich interessiere mich für Ihre Angebote"
}

Response:
{
  "message": "Contact form submitted successfully",
  "contactId": "contact_uuid"
}
```

### Get Contact
```
GET /api/contact/:id

Response:
{
  "id": "contact_uuid",
  "name": "John Doe",
  "email": "john@example.com",
  "topic": "Immobilien",
  "message": "...",
  "status": "new",
  "createdAt": 1234567890
}
```

---

## 👨‍💼 Admin Endpoints

### Get All Contacts
```
GET /api/admin/contacts
Authorization: Bearer <admin_token>

Response:
[
  { id, name, email, topic, message, status, createdAt },
  ...
]
```

### Update Contact Status
```
PATCH /api/admin/contact/:id/status
Authorization: Bearer <admin_token>
Content-Type: application/json

{
  "status": "responded"
}

Response:
{
  "message": "Status updated",
  "contact": { ... }
}
```

---

## 🏥 Health Check

```
GET /api/health

Response:
{
  "status": "ok",
  "timestamp": "2026-06-12T17:45:00Z",
  "uptime": 3600.5
}
```

---

## Error Responses

```json
{
  "error": "Error message here"
}
```

**Status Codes:**
- `200` - Success
- `201` - Created
- `400` - Bad Request
- `401` - Unauthorized
- `404` - Not Found
- `409` - Conflict
- `500` - Server Error

---

## cURL Examples

```bash
# Health check
curl http://localhost:5000/api/health

# Register
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"pass123"}'

# Send message
curl -X POST http://localhost:5000/api/chat \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer token" \
  -d '{"message":"Hola","language":"es","scenario":"cafe"}'

# Submit contact
curl -X POST http://localhost:5000/api/contact \
  -H "Content-Type: application/json" \
  -d '{"name":"John","email":"john@test.com","topic":"Test","message":"Hello"}'
```

---

**API Version:** 1.0.0  
**Last Updated:** 2026-06-12
