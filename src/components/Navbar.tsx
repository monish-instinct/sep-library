
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="fixed w-full top-0 bg-white/80 backdrop-blur-md z-50 border-b">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <Link to="/" className="flex items-center space-x-2">
          <svg 
            width="36" 
            height="36" 
            viewBox="0 0 24 24" 
            fill="none" 
            xmlns="http://www.w3.org/2000/svg"
            className="text-library-600"
          >
            <path 
              d="M12 4.5c-2.248 0-4.5.5-6 1.5V17c1.5-1 3.752-1.5 6-1.5 2.248 0 4.5.5 6 1.5V6c-1.5-1-3.752-1.5-6-1.5z" 
              stroke="currentColor" 
              strokeWidth="2" 
              strokeLinecap="round" 
              strokeLinejoin="round"
            />
            <path 
              d="M12 4.5C9.752 4.5 7.5 5 6 6M12 15.5c-2.248 0-4.5.5-6 1.5" 
              stroke="currentColor" 
              strokeWidth="2" 
              strokeLinecap="round" 
              strokeLinejoin="round"
            />
          </svg>
          <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-library-700 to-library-500">LibraryOS</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          <Link to="/features" className="text-sm font-medium hover:text-library-600 transition-colors">
            Features
          </Link>
          <Link to="/pricing" className="text-sm font-medium hover:text-library-600 transition-colors">
            Pricing
          </Link>
          <Link to="/about" className="text-sm font-medium hover:text-library-600 transition-colors">
            About
          </Link>
          <Link to="/contact" className="text-sm font-medium hover:text-library-600 transition-colors">
            Contact
          </Link>
        </nav>

        <div className="hidden md:flex items-center space-x-4">
          <Link to="/login">
            <Button variant="outline" size="sm">
              Login
            </Button>
          </Link>
          <Link to="/signup">
            <Button variant="default" size="sm">
              Get Started
            </Button>
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button 
          className="md:hidden flex items-center" 
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-b">
          <div className="container mx-auto px-4 py-4 flex flex-col space-y-4">
            <Link 
              to="/features" 
              className="px-3 py-2 rounded-md text-sm font-medium hover:bg-library-50 hover:text-library-600"
              onClick={() => setIsMenuOpen(false)}
            >
              Features
            </Link>
            <Link 
              to="/pricing" 
              className="px-3 py-2 rounded-md text-sm font-medium hover:bg-library-50 hover:text-library-600"
              onClick={() => setIsMenuOpen(false)}
            >
              Pricing
            </Link>
            <Link 
              to="/about" 
              className="px-3 py-2 rounded-md text-sm font-medium hover:bg-library-50 hover:text-library-600"
              onClick={() => setIsMenuOpen(false)}
            >
              About
            </Link>
            <Link 
              to="/contact" 
              className="px-3 py-2 rounded-md text-sm font-medium hover:bg-library-50 hover:text-library-600"
              onClick={() => setIsMenuOpen(false)}
            >
              Contact
            </Link>
            <div className="pt-2 flex flex-col space-y-2">
              <Link to="/login" onClick={() => setIsMenuOpen(false)}>
                <Button variant="outline" className="w-full">
                  Login
                </Button>
              </Link>
              <Link to="/signup" onClick={() => setIsMenuOpen(false)}>
                <Button variant="default" className="w-full">
                  Get Started
                </Button>
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
