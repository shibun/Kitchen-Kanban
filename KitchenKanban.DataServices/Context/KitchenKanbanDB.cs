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
        public DbSet<Image> Images { get; set; }
        public DbSet<DocumentSequence> DocumentSequences { get; set; }
        public DbSet<Kitchen> Kitchens { get; set; }
        public DbSet<Item> Items { get; set; }
        public DbSet<Order> Orders { get; set; }
        public DbSet<OrderLine> OrderLines { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<User>().HasKey(x => x.UserId);
            modelBuilder.Entity<Image>().HasKey(x => x.ImageId);
            modelBuilder.Entity<Kitchen>().HasKey(x => x.KitchenId);
            modelBuilder.Entity<Item>().HasKey(x => x.ItemId);
            modelBuilder.Entity<Order>().HasKey(x => x.OrderId);
            modelBuilder.Entity<OrderLine>().HasKey(x => x.OrderLineId);
            modelBuilder.Entity<DocumentSequence>().HasKey(x => x.DocumentSequenceId);
        }
    }
}
