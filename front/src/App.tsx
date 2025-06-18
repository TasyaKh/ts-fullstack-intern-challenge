import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.scss';
import Navbar from './components/Navbar/Navbar';
import AllCats from './pages/AllCats/AllCats';
import FavoriteCats from './pages/FavoriteCats/FavoriteCats';

function App() {
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
      </div>
    </Router>
  );
}

export default App;
