using KitchenKanban.BusinessServices;
using KitchenKanban.BusinessServices.Interfaces;
using KitchenKanban.DataServices.Context;
using KitchenKanban.DataServices.UserInfo;
using KitchenKanban.WebAPI.Providers;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;

namespace KitchenKanban.WebAPI
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // Use this method to add services to the container. This method gets called by the runtime. 
        public void ConfigureServices(IServiceCollection services)
        {
            services.Configure<AppSettings>(Configuration.GetSection("AppSettings"));

            ConfigureTransientServices(services);
            ConfigureEntityFramework(services);
            services.AddHttpContextAccessor();
            services.AddControllers();
        }

        private static void ConfigureTransientServices(IServiceCollection services)
        {
            services.AddTransient<IUserInfo, UserInfo>();
            services.AddTransient<IUserService, UserService>();
            services.AddTransient<IKitchenService, KitchenService>();
            services.AddTransient<IItemService, ItemService>();
            services.AddTransient<IDocumentSequenceService, DocumentSequenceService>();
            services.AddTransient<IOrderService, OrderService>();
        }

        private static void ConfigureEntityFramework(IServiceCollection services)
        {
            services.AddDbContext<KitchenKanbanDB>(context => { context.UseInMemoryDatabase("KitchenKanbanDB"); });
        }

        // Use this method to configure the HTTP request pipeline and this method gets called by the runtime.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }

            app.UseRouting();

            // global cors policy
            app.UseCors(x => x
                .AllowAnyOrigin()
                .AllowAnyMethod()
                .AllowAnyHeader());

            // custom jwt auth middleware
            app.UseMiddleware<JwtMiddleware>();
            
            app.UseAuthorization();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
            });

            SeedData.EnsurePopulated(app);
        }
    }
}
