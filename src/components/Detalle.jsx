// Detalle.jsx
import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';

const Detalle = () => {
  const { id } = useParams();
  const [producto, setProducto] = useState(null);

  useEffect(() => {
    fetch(`https://productosexamen.azurewebsites.net/api/productos/${id}`)
      .then(response => response.json())
      .then(data => setProducto(data))
      .catch(error => console.error('Error fetching data:', error));
  }, [id]);

  const handleCompra = () => {
    alert('¡Producto comprado!');
  };

  if (!producto) {
    return <p>Cargando...</p>;
  }

  return (
    <div className="container mt-4">
      <div className="row">
        <div className="col-md-8 offset-md-2">
          <h2 className="text-center mb-3">{producto.title}</h2>
        </div>
      </div>
      <div className="row">
        <div className="col-md-4">
          <img
            src={producto.thumbnail}
            className="img-fluid rounded"
            alt={producto.title}
          />
        </div>
        <div className="col-md-8">
          <p className="lead mt-3">{producto.description}</p>
          <div className="mb-2">
            <strong>Precio:</strong> ${producto.price}
          </div>
          <div className="mb-2">
            <strong>Categoría:</strong> {producto.category}
          </div>
          <div className="mb-2">
            <strong>Descuento:</strong> {producto.discountPercentage}%
          </div>
          <div className="mb-2">
            <strong>Marca:</strong> {producto.brand}
          </div>
          <div className="mb-2">
            <strong>Rating:</strong> {Array.from({ length: Math.round(producto.rating) }, (_, index) => (
              <span key={index} className="text-warning" style={{ fontSize: '1rem' }}>&#9733;</span>
            ))}
          </div>
          <div className="mt-3">
            <h4 className="mb-2">Imágenes adicionales:</h4>
            <div className="row">
              {producto.images.map((image, index) => (
                <div key={index} className="col-md-3 mb-2">
                  <img
                    src={image}
                    className="img-fluid rounded"
                    alt={`Image ${index + 1}`}
                  />
                </div>
              ))}
            </div>
          </div>
          <div className="mt-3 text-center">
            <Link to="/" className="btn btn-primary">
              Volver a Buscar
            </Link>

            <Link  className="btn btn-primary mx-4" onClick={handleCompra}>
              Comprar
            </Link>

          </div>
        </div>
      </div>
    </div>
  );
};

export default Detalle;
