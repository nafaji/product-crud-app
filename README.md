# Product CRUD Inventory Management System

This project is a full-stack inventory management application built with React, ASP.NET Core, and SQL Server. It is designed for managing products, categories, units, suppliers, and stock movement activity in a clean, operational workflow.

The application includes:

- product catalog management with CRUD operations
- category, unit, and supplier setup
- stock movement tracking
- low-stock alerts and reorder suggestions
- inventory dashboard analytics
- seeded master data and EF Core migrations
- Docker-based local development setup

## Overview

The solution is split into:

- Frontend: React + Vite + Tailwind CSS
- Backend: ASP.NET Core Web API
- Database: SQL Server 2022
- Domain model: .NET entity classes and EF Core configuration

This gives a practical full-stack example of a business inventory application with a REST API, relational database, and modern UI.

## Tech stack

- ASP.NET Core Web API
- .NET 10
- Entity Framework Core
- SQL Server 2022
- React 18
- Vite
- Tailwind CSS
- Axios
- Docker Compose

## Features

### Inventory operations

- Create, edit, and delete products
- Manage categories, units, and suppliers
- Search and filter product records
- Track stock movements and inventory history
- View product-level stock and minimum stock thresholds

### Inventory monitoring

- Dashboard landing page with key operational metrics
- Low-stock alerts and warnings
- Automatic reorder suggestions based on minimum stock
- Stock movement analytics summary
- Supplier and category insight overview

### Data management

- Seeded catalog data for categories and units
- Database migrations managed through EF Core
- Automatic migration application at API startup
- Validation and confirmation dialogs in the UI
- Toast notifications for user feedback

## Project structure

The backend follows Clean Architecture. Domain contains the entities and has no project dependencies. Application contains use cases, request/response DTOs, repository abstractions, and the Unit of Work contract. Infrastructure implements persistence with EF Core and SQL Server. The API contains HTTP controllers and composes the layers; controllers return response DTOs rather than domain entities.

```text
product-crud-app/
├── backend/
│   ├── NFJ.InventoryManagementSystem.Domain/         # Entities and domain rules
│   ├── NFJ.InventoryManagementSystem.Application/    # Use cases, DTOs, repository/UoW contracts
│   ├── NFJ.InventoryManagementSystem.Infrastructure/ # EF Core, repository/UoW implementations, migrations
│   ├── NFJ.InventoryManagementSystem.Api/             # Controllers and composition root
│   └── NFJ.InventoryManagementSystem.slnx
├── frontend/
│   └── product-crud-client/
│       └── src/
├── docker-compose.yml
├── README.md
└── LICENSE
```

## Quick start with Docker Compose

From the root folder, run:

```bash
docker compose up --build
```

The app will start with:

- Frontend: http://localhost:5173
- Backend API: http://localhost:9000/api/v1
- Swagger: http://localhost:9000/swagger
- SQL Server: localhost:1433

This compose setup runs the database, API, and UI together in one local workflow.

## Local development

### 1. Backend

Requirements:

- .NET 10 SDK
- SQL Server running locally or via Docker

```bash
dotnet run --project backend/NFJ.InventoryManagementSystem.Api/NFJ.InventoryManagementSystem.Api.csproj
```

The API applies pending EF Core migrations on startup. To add a migration, run this from the repository root:

```bash
dotnet ef migrations add MigrationName \
  --project backend/NFJ.InventoryManagementSystem.Infrastructure/NFJ.InventoryManagementSystem.Infrastructure.csproj \
  --startup-project backend/NFJ.InventoryManagementSystem.Api/NFJ.InventoryManagementSystem.Api.csproj \
  --output-dir Persistence/Migrations
```

### 2. Database

The application uses the default connection string in appsettings.json:

```json
"DefaultConnection": "Server=localhost,1433;Database=ProductCrudDb;User Id=sa;Password=YourStrong@Passw0rd;TrustServerCertificate=True;MultipleActiveResultSets=true"
```

If you want to run SQL Server manually:

```bash
docker run -e "ACCEPT_EULA=Y" -e "MSSQL_SA_PASSWORD=YourStrong@Passw0rd" \
  -p 1433:1433 --name sql-server -d mcr.microsoft.com/mssql/server:2022-latest
```

### 3. Frontend

Requirements:

- Node.js 18+

```bash
cd frontend/product-crud-client
npm install
npm run dev
```

Then open:

- http://localhost:5173

## Main API endpoints

### Products

| Method | Route                 | Description          |
| ------ | --------------------- | -------------------- |
| GET    | /api/v1/products      | Get all products     |
| GET    | /api/v1/products/{id} | Get a single product |
| POST   | /api/v1/products      | Create a product     |
| PUT    | /api/v1/products/{id} | Update a product     |
| DELETE | /api/v1/products/{id} | Delete a product     |

### Categories

| Method | Route                   | Description        |
| ------ | ----------------------- | ------------------ |
| GET    | /api/v1/categories      | Get all categories |
| GET    | /api/v1/categories/{id} | Get a category     |
| POST   | /api/v1/categories      | Create a category  |
| PUT    | /api/v1/categories/{id} | Update a category  |
| DELETE | /api/v1/categories/{id} | Delete a category  |

### Units

| Method | Route              | Description   |
| ------ | ------------------ | ------------- |
| GET    | /api/v1/units      | Get all units |
| GET    | /api/v1/units/{id} | Get a unit    |
| POST   | /api/v1/units      | Create a unit |
| PUT    | /api/v1/units/{id} | Update a unit |
| DELETE | /api/v1/units/{id} | Delete a unit |

### Suppliers

| Method | Route                  | Description       |
| ------ | ---------------------- | ----------------- |
| GET    | /api/v1/suppliers      | Get all suppliers |
| GET    | /api/v1/suppliers/{id} | Get a supplier    |
| POST   | /api/v1/suppliers      | Create a supplier |
| PUT    | /api/v1/suppliers/{id} | Update a supplier |
| DELETE | /api/v1/suppliers/{id} | Delete a supplier |

### Stock movements

| Method | Route                                      | Description                 |
| ------ | ------------------------------------------ | --------------------------- |
| GET    | /api/v1/stockmovements                     | Get all stock movements     |
| GET    | /api/v1/stockmovements/product/{productId} | Get movements for a product |
| POST   | /api/v1/stockmovements                     | Create a stock movement     |

## Data model

The main application entities are:

- Product
- Category
- Unit
- Supplier
- StockMovement

Each product includes fields such as:

- product code
- name and description
- category relationship
- unit relationship
- supplier relationship
- purchase price
- selling price
- opening stock
- minimum stock level
- active flag
- timestamps for creation and update

## Dashboard and inventory features

The application includes a dedicated dashboard for operations and monitoring. It currently provides:

- total products and category counts
- low-stock totals
- reorder suggestions
- stock movement summary analytics
- inventory health overview

The dashboard is designed to surface operational issues quickly and help with replenishment decisions.

## Architecture

```mermaid
flowchart LR
    User[User] --> Frontend[React + Vite + Tailwind]
  Frontend --> API[ASP.NET Core API]
  API --> Application[Application: use cases and DTOs]
  API --> Infrastructure[Infrastructure: persistence adapters]
  Application --> Domain[Domain: entities and rules]
  Infrastructure --> Application
  Infrastructure --> Domain
  Infrastructure --> DB[(SQL Server)]
```

## Database and migrations

Entity Framework Core and SQL Server are owned by the Infrastructure project. Migrations are stored in `backend/NFJ.InventoryManagementSystem.Infrastructure/Persistence/Migrations`; the API applies pending migrations at startup.

Common commands:

```bash
dotnet ef migrations add <MigrationName> \
  --project backend/NFJ.InventoryManagementSystem.Infrastructure/NFJ.InventoryManagementSystem.Infrastructure.csproj \
  --startup-project backend/NFJ.InventoryManagementSystem.Api/NFJ.InventoryManagementSystem.Api.csproj \
  --output-dir Persistence/Migrations

dotnet ef database update \
  --project backend/NFJ.InventoryManagementSystem.Infrastructure/NFJ.InventoryManagementSystem.Infrastructure.csproj \
  --startup-project backend/NFJ.InventoryManagementSystem.Api/NFJ.InventoryManagementSystem.Api.csproj
```

## Notes

- CORS is configured for the local React dev server and Docker ports.
- EF Core migrations are applied automatically during API startup.
- The project includes seeded category and unit data for quick demo usage.
- The app is intended for local development, demos, and extension into a larger business inventory system.

## GitHub project summary

Product CRUD Inventory Management System is a full-stack inventory application for tracking products, stock flow, and supplier operations. It pairs a modern React interface with an ASP.NET Core API and SQL Server database, providing a practical example of a business-facing inventory dashboard and management workflow.

It includes stock monitoring, low-stock alerts, reorder suggestions, and analytics so it can function beyond a simple CRUD demo and behave more like a real operations tool.
