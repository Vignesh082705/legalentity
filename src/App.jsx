import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Forms from './components/Forms';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-100 p-4">
        <Routes>
          <Route path="/" element={<Forms />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
