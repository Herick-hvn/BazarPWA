import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const Resultados = ({ searchTerm }) => {
  const [productos, setProductos] = useState([]);

  useEffect(() => {
    // Simulación de llamada a la API con fetch y filtrado por término de búsqueda
    fetch('https://productosexamen.azurewebsites.net/api/productos')
      .then(response => response.json())
      .then(data => {
        // Filtrar productos por término de búsqueda
        const resultados = data.filter(producto =>
          producto.title.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setProductos(resultados);
      })
      .catch(error => console.error('Error fetching data:', error));
  }, [searchTerm]);

  return (
    <div className="container mt-4">
      <div className="row">
        <div className="col-md-12">
          <h2>Resultados de búsqueda</h2>
          <p>{productos.length} productos encontrados</p>
        </div>
      </div>
      <div className="row">
        {productos.map(producto => (
          <div key={producto.id} className="col-md-4 mb-4">
            <div className="card h-100">
              <img
                src={producto.thumbnail}
                className="card-img-top"
                alt={producto.title}
                style={{ width: '100%', height: '200px', objectFit: 'cover' }}
              />
              <div className="card-body">
                <h5 className="card-title" style={{ fontSize: '1.25rem', fontWeight: 'bold', maxHeight: '60px', overflow: 'hidden' }}>
                  {producto.title}
                </h5>
                <p className="card-text" style={{ fontSize: '0.875rem', maxHeight: '80px', overflow: 'hidden' }}>
                  {producto.description}
                </p>
                <div className="row">
                  <div className="col-md-6">
                    <p className="card-text" style={{ fontSize: '1rem' }}>Precio: ${producto.price}</p>
                    <p className="card-text" style={{ fontSize: '0.875rem' }}>Categoría: {producto.category}</p>
                    <p className="card-text" style={{ fontSize: '0.875rem' }}>Descuento: {producto.discountPercentage}%</p>
                  </div>
                  <div className="col-md-6">
                    <p className="card-text" style={{ fontSize: '0.875rem' }}>Marca: {producto.brand}</p>
                    {/* Estrellas amarillas */}
                    <p className="card-text" style={{ fontSize: '0.875rem' }}>
                      Rating: {Array.from({ length: Math.round(producto.rating) }, (_, index) => (
                        <span key={index} style={{ color: '#FFD700' }}>&#9733;</span>
                      ))}
                    </p>
                  </div>
                </div>
                {/* Botón de Ver Detalle */}
                <div className="d-flex justify-content-end align-items-center">
                  <Link to={`/item/${producto.id}`} className="btn btn-primary" style={{ fontSize: '1rem' }}>
                    Ver Detalle
                  </Link>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Resultados;
