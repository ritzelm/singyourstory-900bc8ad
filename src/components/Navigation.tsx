import { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";
import { DiscountBanner } from "./DiscountBanner";

export const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showBanner, setShowBanner] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();

  // Scroll to top when route changes
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  const handleLogoClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (location.pathname === '/') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      navigate('/');
    }
  };

  const handleFAQClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (location.pathname !== '/') {
      navigate('/', { state: { scrollToFAQ: true } });
    } else {
      document.getElementById('faqs')?.scrollIntoView({ behavior: 'smooth' });
    }
    setIsOpen(false);
  };

  // Handle FAQ scroll after navigation
  useEffect(() => {
    if (location.state?.scrollToFAQ) {
      setTimeout(() => {
        document.getElementById('faqs')?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
      // Clear the state
      navigate(location.pathname, { state: {}, replace: true });
    }
  }, [location.state, navigate]);

  const menuItems = [
    { title: "Über uns", link: "/about" },
    { title: "Erstellen", link: "/create" },
    { title: "Preise", link: "/pricing" },
    { title: "FAQs", link: "/#faqs", onClick: handleFAQClick },
  ];

  const MobileMenu = () => (
    <div className="flex flex-col space-y-4">
      {menuItems.map((item) => (
        <div key={item.title}>
          {item.onClick ? (
            <a
              href={item.link}
              className="block py-2 text-left hover:text-primary"
              onClick={item.onClick}
            >
              {item.title}
            </a>
          ) : (
            <Link
              to={item.link}
              className="block py-2 text-left hover:text-primary"
              onClick={() => setIsOpen(false)}
            >
              {item.title}
            </Link>
          )}
        </div>
      ))}
    </div>
  );

  return (
    <>
      <DiscountBanner onClose={() => setShowBanner(false)} />
      <nav className={`fixed ${showBanner ? 'top-[48px]' : 'top-0'} left-0 right-0 z-50 bg-white/80 backdrop-blur-sm border-b transition-all duration-300 w-full`}>
        <div className="max-w-6xl mx-auto px-4 w-full">
          <div className="flex items-center justify-between h-16">
            <a href="/" onClick={handleLogoClick} className="text-xl font-bold text-primary">
              MeinKinderlied.de
            </a>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-4">
              {menuItems.map((item) => (
                item.onClick ? (
                  <a
                    key={item.title}
                    href={item.link}
                    className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-primary"
                    onClick={item.onClick}
                  >
                    {item.title}
                  </a>
                ) : (
                  <Link
                    key={item.title}
                    to={item.link}
                    className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-primary"
                  >
                    {item.title}
                  </Link>
                )
              ))}
              <Link to="/create">
                <Button className="bg-primary hover:bg-primary/90 text-white">
                  Deinen Song erstellen
                </Button>
              </Link>
            </div>

            {/* Mobile Navigation */}
            <div className="md:hidden">
              <Sheet open={isOpen} onOpenChange={setIsOpen}>
                <SheetTrigger asChild>
                  <Button variant="ghost" size="icon">
                    {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                  </Button>
                </SheetTrigger>
                <SheetContent side="right" className="w-[300px] sm:w-[400px]">
                  <div className="py-4">
                    <MobileMenu />
                    <div className="mt-4">
                      <Link to="/create" onClick={() => setIsOpen(false)}>
                        <Button className="w-full bg-primary hover:bg-primary/90 text-white">
                          Deinen Song erstellen
                        </Button>
                      </Link>
                    </div>
                  </div>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </div>
      </nav>
      {/* Spacer div to prevent content from being hidden under the fixed navigation */}
      <div className={`${showBanner ? 'h-[112px]' : 'h-16'} transition-all duration-300 w-full`} />
    </>
  );
};
