

var builder = WebApplication.CreateBuilder(args);



// Add services to the container.

builder.Services.AddControllers();

builder.Services.AddEndpointsApiExplorer();

builder.Services.AddSwaggerGen();





// Enable CORS (permitir solicitudes desde cualquier origen)

builder.Services.AddCors(options =>

{

    options.AddDefaultPolicy(builder =>

    {

        builder.AllowAnyOrigin()

               .AllowAnyMethod()

               .AllowAnyHeader();

    });

});



var app = builder.Build();



// Configure the HTTP request pipeline.

if (app.Environment.IsProduction())

{

    app.UseSwagger();

    app.UseSwaggerUI();

}



app.UseHttpsRedirection();



// Habilitar CORS en el pipeline de solicitudes.

app.UseCors();



app.UseAuthorization();



app.MapControllers();



app.Run();
