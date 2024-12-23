import { Link } from "react-router-dom";

export const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-8">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <div className="text-sm text-gray-400">
            © 2024 MeinKinderlied.de Alle Rechte vorbehalten.
          </div>
          <div className="flex space-x-6">
            <Link to="/impressum" className="text-sm text-gray-400 hover:text-white transition-colors">
              Impressum
            </Link>
            <Link to="/agb" className="text-sm text-gray-400 hover:text-white transition-colors">
              AGB
            </Link>
            <Link to="/datenschutz" className="text-sm text-gray-400 hover:text-white transition-colors">
              Datenschutz
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
