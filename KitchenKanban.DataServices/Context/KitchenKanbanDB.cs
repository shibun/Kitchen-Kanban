using KitchenKanban.Models;
using Microsoft.EntityFrameworkCore;

namespace KitchenKanban.DataServices.Context
{
    public class KitchenKanbanDB : DbContext
    {

        public KitchenKanbanDB(DbContextOptions<KitchenKanbanDB> dbContextOptions) : base(dbContextOptions)
        {
        }

        public DbSet<User> Users { get; set; }
        public DbSet<Kitchen> Kitchens { get; set; }
        public DbSet<Item> Items { get; set; }
        public DbSet<Order> Orders { get; set; }
        public DbSet<OrderLine> OrderLines { get; set; }
        public DbSet<TaxDetail> TaxDetails { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            //modelBuilder.Entity<Kitchen>(x =>
            //{
            //    x.HasKey(e => e.KitchenId);
            //    x.Property(e => e.KitchenId);
            //});
            modelBuilder.Entity<User>().HasKey(x => x.UserId);
            modelBuilder.Entity<Kitchen>().HasKey(x => x.KitchenId);
            modelBuilder.Entity<Item>().HasKey(x => x.ItemId);
            modelBuilder.Entity<Order>().HasKey(x => x.OrderId);
            modelBuilder.Entity<OrderLine>().HasKey(x => x.OrderLineId);
            modelBuilder.Entity<TaxDetail>().HasKey(x => x.TaxDetailId);
        }
    }
}
