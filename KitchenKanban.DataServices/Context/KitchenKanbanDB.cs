using KitchenKanban.Models;
using KitchenKanban.ViewModels;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;

namespace KitchenKanban.DataServices.Context
{
    public class KitchenKanbanDB : DbContext
    {
        private readonly IHttpContextAccessor _httpContextAccessor;

        public KitchenKanbanDB(DbContextOptions<KitchenKanbanDB> dbContextOptions, IHttpContextAccessor httpContextAccessor) : base(dbContextOptions) 
        {
            _httpContextAccessor = httpContextAccessor;
        }

        public DbSet<User> Users { get; set; }
        public DbSet<Kitchen> Kitchens { get; set; }

        public UserViewModel UserInfo
        {
            get
            {
                return (UserViewModel)_httpContextAccessor.HttpContext.Items["User"]; ;
            }
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<User>().HasKey(x => x.UserId);
            modelBuilder.Entity<Kitchen>().HasKey(x => x.KitchenId);
        }
    }
}
