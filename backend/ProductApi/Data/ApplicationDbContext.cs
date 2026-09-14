using Microsoft.EntityFrameworkCore;
using InventoryManagementSystem.Domain.Entities;

namespace ProductApi.Data
{
    public class ApplicationDbContext : DbContext
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options)
        {
        }

        public DbSet<Product> Products => Set<Product>();
        public DbSet<Category> Categories => Set<Category>();
        public DbSet<Unit> Units => Set<Unit>();
        public DbSet<Supplier> Suppliers => Set<Supplier>();
        public DbSet<StockMovement> StockMovements => Set<StockMovement>();

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            var seedDate = new DateTime(2026, 1, 1, 0, 0, 0, DateTimeKind.Utc);

            var electronicsCategory = new Category
            {
                Id = Guid.Parse("11111111-1111-1111-1111-111111111111"),
                Name = "Electronics",
                Description = "Electronic devices and accessories",
                IsActive = true,
                CreatedAt = seedDate
            };

            var officeCategory = new Category
            {
                Id = Guid.Parse("22222222-2222-2222-2222-222222222222"),
                Name = "Office Supplies",
                Description = "Essential office items and accessories",
                IsActive = true,
                CreatedAt = seedDate
            };

            var apparelCategory = new Category
            {
                Id = Guid.Parse("33333333-3333-3333-3333-333333333333"),
                Name = "Apparel",
                Description = "Clothing and personal wear items",
                IsActive = true,
                CreatedAt = seedDate
            };

            var furnitureCategory = new Category
            {
                Id = Guid.Parse("44444444-4444-4444-4444-444444444444"),
                Name = "Furniture",
                Description = "Home and office furniture pieces",
                IsActive = true,
                CreatedAt = seedDate
            };

            var cleaningCategory = new Category
            {
                Id = Guid.Parse("55555555-5555-5555-5555-555555555555"),
                Name = "Cleaning Products",
                Description = "Cleaning and sanitation supplies",
                IsActive = true,
                CreatedAt = seedDate
            };

            var healthcareCategory = new Category
            {
                Id = Guid.Parse("66666666-6666-6666-6666-666666666666"),
                Name = "Healthcare",
                Description = "Health, wellness, and first aid essentials",
                IsActive = true,
                CreatedAt = seedDate
            };

            var foodCategory = new Category
            {
                Id = Guid.Parse("77777777-7777-7777-7777-777777777777"),
                Name = "Food & Beverage",
                Description = "Consumable food and beverage goods",
                IsActive = true,
                CreatedAt = seedDate
            };

            var automotiveCategory = new Category
            {
                Id = Guid.Parse("88888888-8888-8888-8888-888888888888"),
                Name = "Automotive",
                Description = "Vehicle maintenance and accessory items",
                IsActive = true,
                CreatedAt = seedDate
            };

            var booksCategory = new Category
            {
                Id = Guid.Parse("99999999-9999-9999-9999-999999999999"),
                Name = "Books",
                Description = "Printed books and educational resources",
                IsActive = true,
                CreatedAt = seedDate
            };

            var decorCategory = new Category
            {
                Id = Guid.Parse("aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa"),
                Name = "Home Decor",
                Description = "Decorative and lifestyle home items",
                IsActive = true,
                CreatedAt = seedDate
            };

            var hardwareCategory = new Category
            {
                Id = Guid.Parse("bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb"),
                Name = "Hardware",
                Description = "Tools, fasteners, and building materials",
                IsActive = true,
                CreatedAt = seedDate
            };

            var sportsCategory = new Category
            {
                Id = Guid.Parse("cccccccc-cccc-cccc-cccc-cccccccccccc"),
                Name = "Sports & Outdoors",
                Description = "Outdoor and fitness-related items",
                IsActive = true,
                CreatedAt = seedDate
            };

            var toysCategory = new Category
            {
                Id = Guid.Parse("dddddddd-dddd-dddd-dddd-dddddddddddd"),
                Name = "Toys & Games",
                Description = "Playtime and entertainment products",
                IsActive = true,
                CreatedAt = seedDate
            };

            var jewelryCategory = new Category
            {
                Id = Guid.Parse("eeeeeeee-eeee-eeee-eeee-eeeeeeeeeeee"),
                Name = "Jewelry",
                Description = "Accessories and personal adornments",
                IsActive = true,
                CreatedAt = seedDate
            };

            var gardenCategory = new Category
            {
                Id = Guid.Parse("ffffffff-ffff-ffff-ffff-ffffffffffff"),
                Name = "Garden & Outdoor",
                Description = "Outdoor gardening and landscaping essentials",
                IsActive = true,
                CreatedAt = seedDate
            };

            var stationeryCategory = new Category
            {
                Id = Guid.Parse("01234567-89ab-cdef-0123-456789abcdef"),
                Name = "Stationery",
                Description = "Paper, writing, and office stationery items",
                IsActive = true,
                CreatedAt = seedDate
            };

            var beautyCategory = new Category
            {
                Id = Guid.Parse("11111111-2222-3333-4444-555555555555"),
                Name = "Beauty & Personal Care",
                Description = "Cosmetics and personal care products",
                IsActive = true,
                CreatedAt = seedDate
            };

            var musicCategory = new Category
            {
                Id = Guid.Parse("12345678-1234-1234-1234-123456789abc"),
                Name = "Music",
                Description = "Musical instruments and accessories",
                IsActive = true,
                CreatedAt = seedDate
            };

            var travelCategory = new Category
            {
                Id = Guid.Parse("abcdabcd-abcd-abcd-abcd-abcdabcdabcd"),
                Name = "Travel Accessories",
                Description = "Travel essentials and luggage accessories",
                IsActive = true,
                CreatedAt = seedDate
            };

            var petsCategory = new Category
            {
                Id = Guid.Parse("fedcba98-7654-3210-fedc-ba9876543210"),
                Name = "Pet Supplies",
                Description = "Products for pets and animal care",
                IsActive = true,
                CreatedAt = seedDate
            };

            var fitnessCategory = new Category
            {
                Id = Guid.Parse("0f0f0f0f-0f0f-0f0f-0f0f-0f0f0f0f0f0f"),
                Name = "Fitness",
                Description = "Exercise and wellness equipment",
                IsActive = true,
                CreatedAt = seedDate
            };

            var industrialCategory = new Category
            {
                Id = Guid.Parse("1a2b3c4d-5e6f-7081-9203-456789abcdef"),
                Name = "Industrial",
                Description = "Industrial supply and maintenance goods",
                IsActive = true,
                CreatedAt = seedDate
            };

            var pcsUnit = new Unit
            {
                Id = Guid.Parse("33333333-3333-3333-3333-333333333333"),
                Name = "Pieces",
                ShortName = "pcs",
                IsActive = true
            };

            var boxUnit = new Unit
            {
                Id = Guid.Parse("44444444-4444-4444-4444-444444444444"),
                Name = "Box",
                ShortName = "box",
                IsActive = true
            };

            var packUnit = new Unit
            {
                Id = Guid.Parse("55555555-5555-5555-5555-555555555555"),
                Name = "Pack",
                ShortName = "pack",
                IsActive = true
            };

            var kgUnit = new Unit
            {
                Id = Guid.Parse("66666666-6666-6666-6666-666666666666"),
                Name = "Kilogram",
                ShortName = "kg",
                IsActive = true
            };

            var literUnit = new Unit
            {
                Id = Guid.Parse("77777777-7777-7777-7777-777777777777"),
                Name = "Liter",
                ShortName = "L",
                IsActive = true
            };

            var setUnit = new Unit
            {
                Id = Guid.Parse("88888888-8888-8888-8888-888888888888"),
                Name = "Set",
                ShortName = "set",
                IsActive = true
            };

            var pairUnit = new Unit
            {
                Id = Guid.Parse("99999999-9999-9999-9999-999999999999"),
                Name = "Pair",
                ShortName = "pair",
                IsActive = true
            };

            var bottleUnit = new Unit
            {
                Id = Guid.Parse("aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa"),
                Name = "Bottle",
                ShortName = "btl",
                IsActive = true
            };

            var cartonUnit = new Unit
            {
                Id = Guid.Parse("bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb"),
                Name = "Carton",
                ShortName = "ctn",
                IsActive = true
            };

            modelBuilder.Entity<Category>(entity =>
            {
                entity.HasKey(x => x.Id);
                entity.Property(x => x.Name).IsRequired().HasMaxLength(150);
                entity.Property(x => x.Description).HasMaxLength(500);
                entity.HasIndex(x => x.Name).IsUnique();
            });

            modelBuilder.Entity<Unit>(entity =>
            {
                entity.HasKey(x => x.Id);
                entity.Property(x => x.Name).IsRequired().HasMaxLength(100);
                entity.Property(x => x.ShortName).IsRequired().HasMaxLength(20);
                entity.HasIndex(x => x.Name).IsUnique();
                entity.HasIndex(x => x.ShortName).IsUnique();
            });

            modelBuilder.Entity<Product>(entity =>
            {
                entity.HasKey(x => x.Id);
                entity.Property(x => x.ProductCode).IsRequired().HasMaxLength(50);
                entity.Property(x => x.Name).IsRequired().HasMaxLength(200);
                entity.Property(x => x.Description).HasMaxLength(500);
                entity.Property(x => x.PurchasePrice).HasColumnType("decimal(18,2)");
                entity.Property(x => x.SellingPrice).HasColumnType("decimal(18,2)");
                entity.Property(x => x.OpeningStock).HasColumnType("decimal(18,2)");
                entity.Property(x => x.MinimumStockLevel).HasColumnType("decimal(18,2)");
                entity.HasIndex(x => x.ProductCode).IsUnique();
                entity.HasOne(x => x.Category)
                    .WithMany(c => c.Products)
                    .HasForeignKey(x => x.CategoryId)
                    .OnDelete(DeleteBehavior.Restrict);
                entity.HasOne(x => x.Unit)
                    .WithMany(u => u.Products)
                    .HasForeignKey(x => x.UnitId)
                    .OnDelete(DeleteBehavior.Restrict);
                entity.HasOne(x => x.Supplier)
                    .WithMany(s => s.Products)
                    .HasForeignKey(x => x.SupplierId)
                    .OnDelete(DeleteBehavior.SetNull);
            });

            modelBuilder.Entity<Supplier>(entity =>
            {
                entity.HasKey(x => x.Id);
                entity.Property(x => x.Name).IsRequired().HasMaxLength(200);
                entity.Property(x => x.ContactPerson).HasMaxLength(200);
                entity.Property(x => x.Phone).HasMaxLength(50);
                entity.Property(x => x.Email).HasMaxLength(250);
                entity.Property(x => x.Address).HasMaxLength(500);
                entity.HasIndex(x => x.Name).IsUnique();
            });

            modelBuilder.Entity<StockMovement>(entity =>
            {
                entity.HasKey(x => x.Id);
                entity.Property(x => x.Type).IsRequired().HasMaxLength(50);
                entity.Property(x => x.Quantity).HasColumnType("decimal(18,2)");
                entity.Property(x => x.Reference).HasMaxLength(500);
                entity.Property(x => x.Notes).HasMaxLength(500);
                entity.HasOne(x => x.Product)
                    .WithMany(p => p.StockMovements)
                    .HasForeignKey(x => x.ProductId)
                    .OnDelete(DeleteBehavior.Cascade);
            });

            modelBuilder.Entity<Category>().HasData(
                electronicsCategory,
                officeCategory,
                apparelCategory,
                furnitureCategory,
                cleaningCategory,
                healthcareCategory,
                foodCategory,
                automotiveCategory,
                booksCategory,
                decorCategory,
                hardwareCategory,
                sportsCategory,
                toysCategory,
                jewelryCategory,
                gardenCategory,
                stationeryCategory,
                beautyCategory,
                musicCategory,
                travelCategory,
                petsCategory,
                fitnessCategory,
                industrialCategory
            );
            modelBuilder.Entity<Unit>().HasData(pcsUnit, boxUnit, packUnit, kgUnit, literUnit, setUnit, pairUnit, bottleUnit, cartonUnit);

            modelBuilder.Entity<Product>().HasData(
                new Product
                {
                    Id = Guid.Parse("aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa"),
                    ProductCode = "P-1001",
                    Name = "Wireless Mouse",
                    Description = "Ergonomic wireless mouse with USB receiver",
                    CategoryId = electronicsCategory.Id,
                    UnitId = pcsUnit.Id,
                    PurchasePrice = 14.50m,
                    SellingPrice = 19.99m,
                    OpeningStock = 150m,
                    MinimumStockLevel = 20m,
                    IsActive = true,
                    CreatedAt = seedDate
                },
                new Product
                {
                    Id = Guid.Parse("bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb"),
                    ProductCode = "P-1002",
                    Name = "Mechanical Keyboard",
                    Description = "RGB backlit mechanical keyboard, tenkeyless",
                    CategoryId = electronicsCategory.Id,
                    UnitId = pcsUnit.Id,
                    PurchasePrice = 42.00m,
                    SellingPrice = 59.99m,
                    OpeningStock = 85m,
                    MinimumStockLevel = 15m,
                    IsActive = true,
                    CreatedAt = seedDate
                },
                new Product
                {
                    Id = Guid.Parse("cccccccc-cccc-cccc-cccc-cccccccccccc"),
                    ProductCode = "P-1003",
                    Name = "USB-C Hub",
                    Description = "7-in-1 USB-C hub with HDMI and card reader",
                    CategoryId = electronicsCategory.Id,
                    UnitId = boxUnit.Id,
                    PurchasePrice = 22.25m,
                    SellingPrice = 29.99m,
                    OpeningStock = 200m,
                    MinimumStockLevel = 25m,
                    IsActive = true,
                    CreatedAt = seedDate
                },
                new Product
                {
                    Id = Guid.Parse("dddddddd-dddd-dddd-dddd-dddddddddddd"),
                    ProductCode = "P-1004",
                    Name = "Notebook Pack",
                    Description = "Premium notebook pack for office use",
                    CategoryId = officeCategory.Id,
                    UnitId = boxUnit.Id,
                    PurchasePrice = 18.00m,
                    SellingPrice = 26.50m,
                    OpeningStock = 120m,
                    MinimumStockLevel = 18m,
                    IsActive = true,
                    CreatedAt = seedDate
                }
            );
        }
    }
}
