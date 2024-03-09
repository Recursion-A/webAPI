import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import PopularMovies from './components/PopularMovies'; 
import MovieDetails from './components/MovieDetails';

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/popular_movies" element={<PopularMovies />} />
        <Route path="/movie/:id" element={<MovieDetails/>}/>
      </Routes>
    </Router>
  );
}

export default App;
