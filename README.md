# Express.js + TypeScript + MySQL (Sequelize) Starter

A modern boilerplate for building scalable server-side applications using:

- **Express.js** (web server)
- **TypeScript** (strict types)
- **Sequelize ORM** (with MySQL)
- **dotenv** (for environment variables)
- **Docker** (optional containerization)

---

## 📦 Tech Stack
- Node.js 20+
- Express.js
- TypeScript
- MySQL
- Sequelize ORM
- Docker (optional)

---

## ⚙️ Project Structure

```bash
├── src/
│   ├── config/
│   │   ├── db.ts         # Database connection
│   │   └── env.ts        # Environment variables
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   └── server.ts         # Express server setup
├── index.ts              # Entry point
├── .env                  # Environment variables (NOT committed)
├── Dockerfile
├── package.json
└── tsconfig.json
```


## ⚙️ Environment file

```
MYSQL_DATABASE=your_database_name
MYSQL_USER=your_mysql_user
PASSWORD_SQL=your_mysql_password
MYSQL_HOST=your_mysql_host
MYSQL_PORT=your_mysql_port
SERVERPORT=your_app_port
```



## hotel-express-test
# ec2-express-hotel
