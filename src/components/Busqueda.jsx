// Busqueda.jsx

import React, { useState } from 'react';
import Resultados from './Resultados';
import './Busqueda.css';

const Busqueda = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchPerformed, setSearchPerformed] = useState(false);

  const handleSearch = () => {
    setSearchPerformed(true);
    // Realiza la lógica de búsqueda solo si el término no está vacío
    if (searchTerm.trim() === '') {
      setSearchPerformed(true); // Cambia a false si el término está vacío
    }
    // Puedes agregar la lógica de búsqueda aquí
  };

  const searchContainerClass = `search-container mt-4 d-flex justify-content-center align-items-center flex-column${searchPerformed ? ' move-up' : ''}${searchPerformed ? ' small' : ''}`;

  return (
    <div className="container">
      <div className={searchContainerClass}>
        <div className="row">
          <div className="col-md-6 mx-auto text-center">
            <img
              src="https://cdn.freebiesupply.com/logos/large/2x/bazar-logo-png-transparent.png"
              className="logo"
              alt="Logo"
              style={{ maxWidth: '40%', height: 'auto' }}
            />
            <div className="input-group mt-0">
              <input
                type="text"
                className="form-control"
                placeholder="Buscar productos..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="input-group-append mt-5">
              <button
                className="btn btn-primary btn-sm"
                style={{ padding: '.7rem 2.5rem' }}
                type="button"
                onClick={handleSearch}
              >
                Buscar
              </button>
            </div>
          </div>
        </div>
      </div>
      {/* Mostrar todos los resultados si searchTerm está vacío */}
      {searchPerformed && (
        <div className="container mt-4">
          <Resultados searchTerm={searchTerm.trim()} />
        </div>
      )}
    </div>
  );
};

export default Busqueda;
