# Product CRUD — React + ASP.NET Core Web API + SQL Server + Tailwind CSS

A complete, working CRUD example: a "Product Ledger" inventory manager.

- **Backend:** ASP.NET Core 8 Web API, EF Core, SQL Server
- **Frontend:** React (Vite), Tailwind CSS, Axios
- **Operations:** Create, Read, Update, Delete products (Name, Description, Price, Stock)

```
product-crud-app/
├── backend/ProductApi/          # ASP.NET Core Web API
│   ├── Controllers/ProductsController.cs
│   ├── Models/Product.cs
│   ├── DTOs/ProductDto.cs
│   ├── Data/ApplicationDbContext.cs
│   ├── Program.cs
│   └── appsettings.json
└── frontend/product-crud-client/  # React + Tailwind
    ├── src/App.jsx
    ├── src/components/ (ProductTable, ProductForm, ConfirmDialog, Toast)
    ├── src/services/productService.js
    └── tailwind.config.js
```

## 1. Backend setup (ASP.NET Core + SQL Server)

**Requirements:** .NET 8 SDK, SQL Server (local, Docker, or Azure SQL), EF Core CLI tools.

```bash
cd backend/ProductApi

# Restore dependencies
dotnet restore

# Install EF Core CLI tool (once, globally) if you don't have it
dotnet tool install --global dotnet-ef

# Update the connection string in appsettings.json to match your SQL Server instance
# "DefaultConnection": "Server=localhost,1433;Database=ProductCrudDb;User Id=sa;Password=YourStrong@Passw0rd;TrustServerCertificate=True;"

# Create the initial migration
dotnet ef migrations add InitialCreate

# Run the API (this also applies migrations automatically on startup, see Program.cs)
dotnet run
```

The API listens on `https://127.0.0.1:7080` (and `http://127.0.0.1:8080`) in this environment
because the default ASP.NET ports were blocked by local socket restrictions. Check the
console output or `Properties/launchSettings.json` and adjust the frontend's `API_BASE_URL`
if it differs. Swagger UI is available at `/swagger` in development.

### Don't have SQL Server installed?

Run it in Docker:

```bash
docker run -e "ACCEPT_EULA=Y" -e "MSSQL_SA_PASSWORD=YourStrong@Passw0rd" \
  -p 1433:1433 --name sql-server -d mcr.microsoft.com/mssql/server:2022-latest
```

This container is working and exposes SQL Server on port `1433`.

### API endpoints

| Method | Route              | Description       |
| ------ | ------------------ | ----------------- |
| GET    | /api/products      | List all products |
| GET    | /api/products/{id} | Get one product   |
| POST   | /api/products      | Create a product  |
| PUT    | /api/products/{id} | Update a product  |
| DELETE | /api/products/{id} | Delete a product  |

## 2. Frontend setup (React + Tailwind)

**Requirements:** Node.js 18+.

```bash
cd frontend/product-crud-client
npm install
npm run dev
```

Open `http://localhost:5173`. Before running, confirm `API_BASE_URL` in
`src/services/productService.js` matches the backend port you started. In this project,
that value is `https://127.0.0.1:7080/api/products`.

## Notes

- CORS is already configured in `Program.cs` to allow `http://localhost:5173` and
  `http://localhost:3000`.
- The database is seeded with 5 sample products via `HasData` in
  `ApplicationDbContext.cs`.
- To reset the database, drop it and re-run `dotnet ef database update`
  (or just `dotnet run`, since migrations apply automatically).
