# Prisma ORM + Nuxt 3.x

## 1. Install Prisma

Install the Prisma CLI and Prisma Client:

```bash
yarn install prisma @prisma/client
```

## 2. Initialize Prisma

Run the following command to initialize Prisma:

```bash
npx prisma init
```

This will create:

A prisma folder with a schema.prisma file.
An `.env` file to store the DATABASE_URL for your database connection.

## 3. Configure Database URL

Update the DATABASE_URL in your `.env` file to match your database connection details. For PostgreSQL, it typically looks like this:

```bash
DATABASE_URL=postgresql://username:password@host:port/database
```

## 4. Run Migrations

To apply your schema changes to the database, run migrations:

```bash
npx prisma migrate dev --name init
```

This will:

Create a migrations folder to track schema changes.
Update your database schema.

## 5. Generate Prisma Client

Generate the Prisma Client, which allows you to interact with your database:

```bash
npx prisma generate
```

The generated client will be located in node_modules/@prisma/client.

## 6. Run Prisma Studio

Use Prisma Studio to interact with your database via a web interface. Run:

```bash
npx prisma studio
```

## 7. Optional Prisma Commands

To update your schema after changes:

```bash
npx prisma migrate dev --name migration_name
```

To reset the database:

```bash
npx prisma migrate reset
```

To introspect an existing database schema:

```bash
npx prisma introspect
```

**Readmore about Schema in [Prisma](https://www.prisma.io/)**

## 9. To make it work you will need more packages

You will need: `typescript`, `@types/node` and `tsx`. Run:

```bash
yarn add -D tsx @types/node typescript
```

## 10. Config your `tsconfig.sjon` for ORM compatibility

```graphql
    Prisma/
    -----schema.prisma
    -----merge-schema.ts
    -----tsconfig.json
```

`tsconfig.json`:

```json
{
    "compilerOptions": {
      "target": "ES2020",
      "module": "ESNext",
      "strict": true,
      "esModuleInterop": true,
      "moduleResolution": "Node",
      "skipLibCheck": true,
      "outDir": "../dist"
    },
    "include": ["merge-schema.ts"]
  }
```
