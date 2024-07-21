// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import RegisterPage from './components/RegisterPage';
import QrScanner from './components/QrScanner'; // Ensure correct import

function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/scanner" element={<QrScanner />} /> {/* Ensure correct route */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
