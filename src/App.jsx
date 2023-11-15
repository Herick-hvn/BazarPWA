// App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Busqueda from './components/Busqueda';
import Resultados from './components/Resultados';
import Detalle from './components/Detalle';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Busqueda />} />
        <Route path="/items" element={<Resultados />} />
        <Route path="/item/:id" element={<Detalle />} />
      </Routes>
    </Router>
  );
}

export default App;
