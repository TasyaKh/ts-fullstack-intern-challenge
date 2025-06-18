import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AllCats from './pages/AllCats';
import FavoriteCats from './pages/FavoriteCats';
import './App.scss';
import Navbar from './components/Navbar/Navbar';

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
