# Employee Management System

This project simplifies managing employee records for an organization. It keeps essential employee information organized and offers an easy-to-use interface for accessing and updating this data.

### Tech Stack

- **Next.js:** A React framework used for building the frontend of the application. It provides a fast and responsive user interface with features like server-side rendering and static site generation.

- **NestJS:** A TypeScript-based framework for building the backend API. It helps manage business logic and database interactions with a modular and scalable architecture.

- **Prisma ORM:** An Object-Relational Mapping (ORM) tool used to interact with the database. It simplifies database operations and ensures type safety, making it easier to manage data.

- **MongoDB:** A NoSQL database that stores data in flexible, JSON-like documents. It’s used here to manage and retrieve employee records efficiently.

- **Turborepo:** A monorepo management tool that organizes and streamlines the development process. It helps manage multiple packages and ensures efficient builds and collaboration.

### Installation

```bash
# Install dependencies
# Recommend to use pnpm (Don't use "bun" There are still some problems with the bun env)
pnpm i

# Configure environment variables
# There is an `.env.example` in the root directory you can use for reference
# Change env according to environment type
cp .env.example .env

# Push the Prisma schema to the database
pnpm run db:seed

# Run development environment
pnpm run dev

```

#### Sample of env

```bash
NEXT_PUBLIC_BASE_API_URL="http://localhost:4000/v1"
DATABASE_URL="mongodb+srv://<user>:<password>@<db_url>/<db_name>?retryWrites=true&w=majority"
```

### About

It uses [Turborepo](https://turborepo.org) and contains:

```text
.github
  └─ workflows
        └─ CI with pnpm cache setup
.vscode
  └─ Recommended extensions and settings for VSCode users
apps
  ├─ nest.js
  |   ├─ backend API
  └─ next.js
      ├─ Next.js 14
      ├─ React 18
      ├─ Tailwind CSS
      └─ E2E Typesafe Client
packages
  ├─ db
  |   └─ connect to db using Prisma & MongoDB
  ├─ ui
  |   └─ Start of a UI package for the webapp using shadcn-ui
  └─ validators
      └─ Validation with zod
tooling
  ├─ eslint
  |   └─ shared, fine-grained, eslint presets
  ├─ prettier
  |   └─ shared prettier configuration
  ├─ tailwind
  |   └─ shared tailwind configuration
  └─ typescript
      └─ shared tsconfig you can extend from
```
