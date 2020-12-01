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

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<User>().HasKey(x => x.UserId);
            modelBuilder.Entity<Kitchen>().HasKey(x => x.KitchenId);
        }
    }
}
