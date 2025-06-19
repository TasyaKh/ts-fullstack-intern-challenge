import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useState } from 'react';
import './App.scss';
import Navbar from './components/Navbar/Navbar';
import AllCats from './pages/AllCats/AllCats';
import FavoriteCats from './pages/FavoriteCats/FavoriteCats';
import TokenModal from './components/TokenModal';

function App() {
  const [showTokenModal] = useState(() => !localStorage.getItem('token'));

  const handleTokenSubmit = (token: string) => {
    localStorage.setItem('token', token);
    window.location.reload();
  };

  return (
    <Router>
      <div className="app">
        <Navbar />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<AllCats />} />
            <Route path="/favorites" element={<FavoriteCats />} />
          </Routes>
        </main>
        {showTokenModal && <TokenModal onSubmit={handleTokenSubmit} />}
      </div>
    </Router>
  );
}

export default App;
