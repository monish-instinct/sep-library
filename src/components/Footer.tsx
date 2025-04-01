
import { Link } from "react-router-dom";
import { Facebook, Instagram, Twitter, Github } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-gray-50 border-t">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-1">
            <Link to="/" className="flex items-center space-x-2">
              <svg 
                width="28" 
                height="28" 
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
              <span className="text-lg font-bold bg-clip-text text-transparent bg-gradient-to-r from-library-700 to-library-500">LibraryOS</span>
            </Link>
            <p className="mt-4 text-sm text-gray-600">
              Modern library management system to revolutionize your reading experience.
            </p>
            <div className="mt-6 flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-library-600 transition-colors">
                <Facebook size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-library-600 transition-colors">
                <Twitter size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-library-600 transition-colors">
                <Instagram size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-library-600 transition-colors">
                <Github size={20} />
              </a>
            </div>
          </div>
          
          <div className="col-span-1">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-gray-900">
              Resources
            </h3>
            <ul className="mt-4 space-y-2">
              <li>
                <Link to="/documentation" className="text-sm text-gray-600 hover:text-library-600 transition-colors">
                  Documentation
                </Link>
              </li>
              <li>
                <Link to="/help" className="text-sm text-gray-600 hover:text-library-600 transition-colors">
                  Help Center
                </Link>
              </li>
              <li>
                <Link to="/api" className="text-sm text-gray-600 hover:text-library-600 transition-colors">
                  API
                </Link>
              </li>
              <li>
                <Link to="/community" className="text-sm text-gray-600 hover:text-library-600 transition-colors">
                  Community
                </Link>
              </li>
            </ul>
          </div>
          
          <div className="col-span-1">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-gray-900">
              Company
            </h3>
            <ul className="mt-4 space-y-2">
              <li>
                <Link to="/about" className="text-sm text-gray-600 hover:text-library-600 transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-sm text-gray-600 hover:text-library-600 transition-colors">
                  Contact
                </Link>
              </li>
              <li>
                <Link to="/careers" className="text-sm text-gray-600 hover:text-library-600 transition-colors">
                  Careers
                </Link>
              </li>
              <li>
                <Link to="/blog" className="text-sm text-gray-600 hover:text-library-600 transition-colors">
                  Blog
                </Link>
              </li>
            </ul>
          </div>
          
          <div className="col-span-1">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-gray-900">
              Legal
            </h3>
            <ul className="mt-4 space-y-2">
              <li>
                <Link to="/privacy" className="text-sm text-gray-600 hover:text-library-600 transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="/terms" className="text-sm text-gray-600 hover:text-library-600 transition-colors">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link to="/security" className="text-sm text-gray-600 hover:text-library-600 transition-colors">
                  Security
                </Link>
              </li>
              <li>
                <Link to="/gdpr" className="text-sm text-gray-600 hover:text-library-600 transition-colors">
                  GDPR
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-12 pt-8 border-t border-gray-200">
          <p className="text-sm text-gray-400 text-center">
            © {new Date().getFullYear()} LibraryOS. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
