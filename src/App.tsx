// src/App.tsx
import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import Contacts from './pages/Contacts';
import ChartsAndMaps from './pages/ChartsAndMaps';
import 'leaflet/dist/leaflet.css';

const App: React.FC = () => {
  return (
    <div className="min-h-screen flex">
      <nav className="w-1/4 bg-gray-800 text-white">
        <ul>
          <li className="p-4">
            <Link to="/contacts">Contacts</Link>
          </li>
          <li className="p-4">
            <Link to="/charts-and-maps">Charts and Maps</Link>
          </li>
        </ul>
      </nav>
      <main className="w-3/4 p-4">
        <Routes>
          <Route path="/contacts" element={<Contacts />} />
          <Route path="/charts-and-maps" element={<ChartsAndMaps />} />
        </Routes>
      </main>
    </div>
  );
};

export default App;
