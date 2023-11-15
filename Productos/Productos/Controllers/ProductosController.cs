using System.Collections.Generic;
using System.IO;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc;
using examen_parcial2.Models;
using Newtonsoft.Json;

namespace examen_parcial2.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProductosController : ControllerBase
    {
        private readonly IWebHostEnvironment _env;

        public ProductosController(IWebHostEnvironment env)
        {
            _env = env;
        }

        [HttpGet]
        public ActionResult<IEnumerable<Product>> GetProducts()
        {
            // Obtener la ruta completa al archivo JSON
            string filePath = Path.Combine(_env.ContentRootPath, "ProductsData", "products.json");

            // Leer el contenido del archivo JSON
            string jsonContent = System.IO.File.ReadAllText(filePath);

            // Deserializar el JSON a la clase ProductsContainer
            var container = JsonConvert.DeserializeObject<ProductsContainer>(jsonContent);

            // Devolver la lista de productos desde la propiedad Products del contenedor
            return Ok(container.Products);
        }

        [HttpGet("{id}")]
        public ActionResult<Product> GetProduct(int id)
        {
            // Obtener la ruta completa al archivo JSON
            string filePath = Path.Combine(_env.ContentRootPath, "ProductsData", "products.json");

            // Leer el contenido del archivo JSON
            string jsonContent = System.IO.File.ReadAllText(filePath);

            // Deserializar el JSON a la clase ProductsContainer
            var container = JsonConvert.DeserializeObject<ProductsContainer>(jsonContent);

            // Buscar el producto por ID en la lista de productos dentro del contenedor
            var product = container.Products.Find(p => p.Id == id);

            if (product == null)
            {
                return NotFound();
            }

            return product;
        }
    }
}
