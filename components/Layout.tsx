import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Facebook, Twitter, Linkedin, Instagram, Youtube, ArrowUp } from 'lucide-react';
import { useSite } from '../context/SiteContext';

export const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { state } = useSite();
  const { layout } = state.theme;

  const maxWidthClass = 
    layout === 'boxed' ? 'max-w-5xl' : 
    layout === 'wide' ? 'max-w-7xl' : 
    'max-w-full px-8';

  return (
    <div className={`min-h-screen flex flex-col bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 transition-colors duration-300 ${state.theme.cursor === 'circle' ? 'cursor-circle' : state.theme.cursor === 'dot' ? 'cursor-dot' : ''}`}>
      <Navbar maxWidthClass={maxWidthClass} />
      <main className="flex-grow pt-16">
        {children}
      </main>
      <Footer maxWidthClass={maxWidthClass} />
      <ScrollToTop />
    </div>
  );
};

const Navbar: React.FC<{ maxWidthClass: string }> = ({ maxWidthClass }) => {
  const [isOpen, setIsOpen] = useState(false);
  const { state } = useSite();
  const location = useLocation();

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Services', path: '/services' },
    { name: 'About', path: '/about' },
    { name: 'Blog', path: '/blog' },
    { name: 'Contact', path: '/contact' },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="fixed w-full z-50 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 transition-colors duration-300">
      <div className={`mx-auto px-4 sm:px-6 lg:px-8 ${maxWidthClass}`}>
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex-shrink-0 flex items-center">
            <span className="text-2xl font-bold text-primary dark:text-white" style={{color: state.theme.primaryColor}}>
              {state.content.company.logoText}
            </span>
          </Link>
          
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className={`text-sm font-medium transition-colors hover:text-primary ${
                  isActive(link.path) 
                    ? 'text-primary' 
                    : 'text-slate-600 dark:text-slate-300'
                }`}
                style={isActive(link.path) ? { color: state.theme.primaryColor } : {}}
              >
                {link.name}
              </Link>
            ))}
            <Link 
              to={state.isAuthenticated ? "/admin" : "/admin/login"}
              className="px-4 py-2 rounded-md text-sm font-medium text-white transition-opacity hover:opacity-90"
              style={{ 
                backgroundColor: state.theme.primaryColor,
                borderRadius: state.theme.buttonStyle === 'pill' ? '9999px' : state.theme.buttonStyle === 'sharp' ? '0px' : '0.375rem'
              }}
            >
              {state.isAuthenticated ? 'Dashboard' : 'Admin'}
            </Link>
          </div>

          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-md text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div className="md:hidden bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                onClick={() => setIsOpen(false)}
                className={`block px-3 py-2 rounded-md text-base font-medium ${
                  isActive(link.path)
                    ? 'text-primary bg-slate-50 dark:bg-slate-800'
                    : 'text-slate-600 dark:text-slate-300 hover:text-primary hover:bg-slate-50 dark:hover:bg-slate-800'
                }`}
                style={isActive(link.path) ? { color: state.theme.primaryColor } : {}}
              >
                {link.name}
              </Link>
            ))}
             <Link 
              to="/admin"
              onClick={() => setIsOpen(false)}
              className="block px-3 py-2 rounded-md text-base font-medium text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800"
            >
              Admin Area
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

const Footer: React.FC<{ maxWidthClass: string }> = ({ maxWidthClass }) => {
  const { state } = useSite();
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-slate-50 dark:bg-slate-950 pt-16 pb-8 border-t border-slate-200 dark:border-slate-800">
      <div className={`mx-auto px-4 sm:px-6 lg:px-8 ${maxWidthClass}`}>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          <div>
            <span className="text-2xl font-bold mb-4 block" style={{ color: state.theme.primaryColor }}>
              {state.content.company.logoText}
            </span>
            <p className="text-slate-600 dark:text-slate-400 mb-6">
              {state.content.company.description}
            </p>
            <div className="flex space-x-4">
              <SocialIcon Icon={Facebook} href={state.content.company.facebook} />
              <SocialIcon Icon={Twitter} href={state.content.company.twitter} />
              <SocialIcon Icon={Linkedin} href={state.content.company.linkedin} />
              <SocialIcon Icon={Instagram} href={state.content.company.instagram} />
            </div>
          </div>

          <div>
            <h3 className="font-bold text-lg mb-4 text-slate-900 dark:text-white">Quick Links</h3>
            <ul className="space-y-3">
              <li><Link to="/about" className="text-slate-600 dark:text-slate-400 hover:text-primary transition-colors">About Us</Link></li>
              <li><Link to="/services" className="text-slate-600 dark:text-slate-400 hover:text-primary transition-colors">Services</Link></li>
              <li><Link to="/blog" className="text-slate-600 dark:text-slate-400 hover:text-primary transition-colors">Blog</Link></li>
              <li><Link to="/contact" className="text-slate-600 dark:text-slate-400 hover:text-primary transition-colors">Contact</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="font-bold text-lg mb-4 text-slate-900 dark:text-white">Contact Info</h3>
            <ul className="space-y-3 text-slate-600 dark:text-slate-400">
              <li>{state.content.company.address}</li>
              <li>{state.content.company.phone}</li>
              <li>{state.content.company.email}</li>
            </ul>
          </div>

          <div>
            <h3 className="font-bold text-lg mb-4 text-slate-900 dark:text-white">Newsletter</h3>
            <p className="text-slate-600 dark:text-slate-400 mb-4 text-sm">Subscribe to our newsletter for the latest updates.</p>
            <form className="flex flex-col space-y-2" onSubmit={(e) => e.preventDefault()}>
              <input 
                type="email" 
                placeholder="Enter your email" 
                className="px-4 py-2 rounded-md border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 focus:ring-2 focus:ring-blue-500 outline-none"
              />
              <button 
                className="px-4 py-2 rounded-md text-white font-medium transition-opacity hover:opacity-90"
                style={{ backgroundColor: state.theme.primaryColor }}
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>

        <div className="border-t border-slate-200 dark:border-slate-800 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-slate-500 text-sm">
            © {currentYear} {state.content.company.name}. All rights reserved.
          </p>
          <div className="flex space-x-6 mt-4 md:mt-0 text-sm text-slate-500">
            <a href="#" className="hover:text-primary">Privacy Policy</a>
            <a href="#" className="hover:text-primary">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

const SocialIcon: React.FC<{ Icon: React.ElementType, href: string }> = ({ Icon, href }) => (
  <a href={href} className="text-slate-400 hover:text-primary transition-colors">
    <Icon size={20} />
  </a>
);

const ScrollToTop = () => {
  const [isVisible, setIsVisible] = useState(false);
  const { state } = useSite();

  React.useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };
    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (!isVisible) return null;

  return (
    <button
      onClick={scrollToTop}
      className="fixed bottom-8 right-8 p-3 text-white rounded-full shadow-lg transition-all hover:scale-110 z-50"
      style={{ backgroundColor: state.theme.secondaryColor }}
    >
      <ArrowUp size={24} />
    </button>
  );
};
