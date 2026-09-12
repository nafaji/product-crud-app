using Microsoft.EntityFrameworkCore;
using ProductApi.Models;

namespace ProductApi.Data
{
    public class ApplicationDbContext : DbContext
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options)
        {
        }

        public DbSet<Product> Products => Set<Product>();

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            var seedDate = new DateTime(2026, 1, 1, 0, 0, 0, DateTimeKind.Utc);

            modelBuilder.Entity<Product>().HasData(
                new Product { Id = 1, Name = "Wireless Mouse", Description = "Ergonomic wireless mouse with USB receiver", Price = 19.99m, Stock = 150, CreatedAt = seedDate },
                new Product { Id = 2, Name = "Mechanical Keyboard", Description = "RGB backlit mechanical keyboard, tenkeyless", Price = 59.99m, Stock = 80, CreatedAt = seedDate },
                new Product { Id = 3, Name = "USB-C Hub", Description = "7-in-1 USB-C hub with HDMI and card reader", Price = 29.99m, Stock = 200, CreatedAt = seedDate },
                new Product { Id = 4, Name = "27-inch Monitor", Description = "1440p IPS monitor, 144Hz refresh rate", Price = 279.00m, Stock = 35, CreatedAt = seedDate },
                new Product { Id = 5, Name = "Laptop Stand", Description = "Aluminum adjustable laptop stand", Price = 34.50m, Stock = 120, CreatedAt = seedDate }
            );
        }
    }
}
