import './App.css'
import Home from './pages/Home'
import movies from '../../data/movies.json';

function App() {
  return (
    <div className="min-h-screen bg-black text-white">
      <Home movies={movies} />
    </div>
  )
}
export default App