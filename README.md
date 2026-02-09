
# 💳 ePayco Wallet API

API REST desarrollada con **NestJS** que simula el funcionamiento de una billetera digital.  
Este proyecto forma parte de una **prueba técnica**, enfocada en buenas prácticas de arquitectura backend, validación de datos y flujo de pagos.

La API permite:

- Registrar clientes
- Recargar saldo en una billetera
- Solicitar pagos mediante token de seguridad
- Confirmar pagos
- Consultar el saldo disponible

---

## 🛠️ Tecnologías utilizadas

- **Node.js** 18+
- **NestJS**
- **MySQL** 8+
- **TypeORM**
- **Class Validator / Transformer**
- **UUID**
- **Nodemailer**
- **dotenv**

---

## 📋 Requisitos previos

Asegúrate de tener instalado:

- Node.js 18 o superior
- MySQL 8 o superior
- npm o yarn

---

## 🚀 Instalación y ejecución

### 1. Clonar el repositorio

```bash
git clone https://github.com/juancodev/epayco_app_backend.git
cd epayco_app_backend
````

### 2. Instalar dependencias

```bash
npm install
```

### 3. Configurar variables de entorno

Copia el archivo de ejemplo y edítalo con tus credenciales:

```bash
cp .env.example .env
```

Ejemplo de variables requeridas:

```env
DB_HOST=localhost
DB_PORT=3306
DB_USERNAME=root
DB_PASSWORD=password
DB_NAME=epayco_db
```

### 4. Crear la base de datos

```sql
CREATE DATABASE epayco_db;
```

### 5. Ejecutar la aplicación en modo desarrollo

```bash
npm run start:dev
```

La API estará disponible en:

```
http://localhost:3000
```

---

## 📌 Estructura de la API

La aplicación está organizada por módulos, siguiendo el enfoque modular de NestJS:

* **Clients** → Gestión de clientes
* **Wallet** → Operaciones de la billetera digital

---

## 🔗 Endpoints disponibles

### 🧑‍💼 Clients

| Método | Endpoint                | Descripción                |
| ------ | ----------------------- | -------------------------- |
| POST   | `/api/clients/registroCliente` | Registrar un nuevo cliente |

### 💰 Wallet

| Método | Endpoint                      | Descripción                     |
| ------ | ----------------------------- | ------------------------------- |
| POST   | `/api/wallet/recargarBilletera`        | Recargar saldo en la billetera  |
| POST   | `/api/wallet/solicitarPago` | Solicitar un pago (envía token) |
| POST   | `/api/wallet/confirmarPago` | Confirmar pago con token        |
| GET    | `/api/wallet/consultarSaldo?documento=123456789&celular=123456789`         | Consultar saldo disponible      |

---

## 🧪 Ejemplos de uso

### 📌 Registrar cliente

```http
POST /api/clients/registroCliente
```

```json
{
  "documento": "123456789",
  "nombres": "Juan Pérez",
  "email": "juan@email.com",
  "celular": "3001234567"
}
```

---

### 💳 Recargar billetera

```http
POST /api/wallet/recargarBilletera
```

```json
{
  "documento": "123456789",
  "celular": "3001234567",
  "valor": 50000
}
```

---

### 🔐 Solicitar pago

Este endpoint genera un **token de confirmación** que simula el envío por correo electrónico.

```http
POST /api/wallet/solicitarPago
```

```json
{
  "documento": "123456789",
  "celular": "3001234567",
  "valor": 25000
}
```

---

### ✅ Confirmar pago

```http
POST /api/wallet/confirmarPago
```

```json
{
  "sessionId": "uuid-de-la-sesion",
  "token": "123456"
}
```

---

### 📊 Consultar saldo

```http
GET /api/wallet/consultarSaldo?documento=123456789&celular=123456789
```

---

## 🔐 Consideraciones técnicas

* Validaciones implementadas con `class-validator`
* Arquitectura modular siguiendo buenas prácticas de NestJS
* Separación clara de responsabilidades (controllers, services, entities)
* Flujo de pago basado en sesión + token
* Preparado para escalar o integrarse con servicios reales de pago

---

## 👨‍💻 Autor

**Juan Montilla**
Backend / Full Stack Developer

---

## ⚙️ Comandos usados para crear el proyecto

```bash
# Crear proyecto
npx @nestjs/cli new epayco_app_backend

# Instalar dependencias
npm install @nestjs/typeorm typeorm mysql2 @nestjs/config \
class-validator class-transformer nodemailer uuid

npm install -D @types/nodemailer

# Ejecutar proyecto
npm run start:dev
```
