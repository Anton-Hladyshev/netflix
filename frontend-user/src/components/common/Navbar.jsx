import { useEffect, useState } from "react";
import SearchBar from "../movies/SearchBar";
import moviesData from '../../../../data/movies.json';
import CartButton from "./Cartbutton";
import { NavLink, Link } from "react-router-dom";

function Navbar({ cartItems, removeFromCart }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [movies] = useState(moviesData);

    useEffect(() => {
        const handleScroll = () => setIsScrolled(window.scrollY > 50);

            window.addEventListener('scroll', handleScroll);

            return () => {
                window.removeEventListener('scroll', handleScroll);
            }
    }, []);

  return (
    <nav className={`fixed top-0 left-0 right-0 w-full z-50 transition-colors duration-300 ${isScrolled ? 'bg-black' : 'bg-gradient-to-b from-black/80 to-transparent'}`}>
      <div className="container mx-auto px-4 py-4 max-w-7xl">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center space-x-8">
            <h1 className="text-primary text-3xl font-bold tracking-tight">
              NETFLIX
            </h1>
            {/* Navigation Links */}
            <ul className="hidden md:flex space-x-6 text-white">
              <li>
                <NavLink to="/" className="hover:text-gray-300 transition-colors">
                  Accueil
                </NavLink>
              </li>
              <li>
                <NavLink to="/films" className="hover:text-gray-300 transition-colors">
                  Films
                </NavLink>
              </li>
              <li>
                <NavLink to="/my-rentals" className="hover:text-gray-300 transition-colors">
                  Mes locations
                </NavLink>
              </li>
            </ul>
          </div>
          {/* User Section */}
          <div className="flex items-center space-x-4">
            <SearchBar movies={movies} onSearch={(movie) => console.log(movie)} />
            <CartButton cartItems={cartItems} removeFromCart={removeFromCart} />
            {/* User Avatar */}
            <div className="w-8 h-8 bg-primary rounded flex items-center justify-center cursor-pointer hover:bg-primary-dark transition-colors text-white">
              <span className="text-sm font-bold">U</span>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
        
}

export default Navbar;