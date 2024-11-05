
# AdonisJS with PostgreSQL Docker Setup

This guide explains how to set up a PostgreSQL database for an AdonisJS project using Docker. The AdonisJS backend will run manually via the console, and the database will be managed by Docker.

## Prerequisites

- Docker and Docker Compose installed on your system.
- `.env` file configured in the `backend/` directory with the following variables:

  ```env
  TZ=UTC
  PORT=3333
  HOST=localhost
  LOG_LEVEL=info
  APP_KEY=your_app_key
  NODE_ENV=development
  DB_HOST=127.0.0.1
  DB_PORT=5432
  DB_USER=root
  DB_PASSWORD=root
  DB_DATABASE=app
  ```

## Docker Setup

### 1. Start PostgreSQL Container

To start the PostgreSQL container, run inside `backend/` directory:

```bash
docker-compose up -d db
```

This command will:
- Start the PostgreSQL database service based on the configuration in `docker-compose.yml`.
- Set up a database with the name, user, and password defined in your `.env`.

### 2. Run Migrations (if needed)

If your AdonisJS application requires migrations, you can apply them manually using the following command after starting the database:

```bash
node ace migration:run
```

### 3. Start AdonisJS Manually

With the database running, you can start your AdonisJS server manually from the `backend/` directory:

```bash
node ace serve --hmr
```
or if you prefer
```bash
npm run dev
```

Your AdonisJS application should now be available at `http://localhost:3333`.

## Stopping the Database

To stop the PostgreSQL container:

```bash
docker-compose down
```

This command will stop the database but keep the data in the `my_dbdata` volume for persistence across restarts.
