import { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router';
import { Menu, X, Brain, LogIn, LogOut, User, ChevronDown } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';

const navLinks = [
  { label: 'Accueil', path: '/' },
  { label: 'Professionnels', path: '/professionnels' },
  { label: 'Auto-évaluation', path: '/evaluation' },
  { label: 'Ressources', path: '/ressources' },
  { label: 'Communauté', path: '/communaute' },
  { label: 'Journal', path: '/journal' },
];

export function Navigation() {
  const { user, isLoggedIn, logout } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const location = useLocation();
  const userMenuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false);
    setShowUserMenu(false);
  }, [location.pathname]);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (userMenuRef.current && !userMenuRef.current.contains(event.target as Node)) {
        setShowUserMenu(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const roleLabel = user?.role === 'professional' ? 'Professionnel' : user?.role === 'admin' ? 'Admin' : 'Patient';

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'glass border-b border-white/5 shadow-lg'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-mind-blue to-mind-purple flex items-center justify-center shadow-glow group-hover:shadow-glow-lg transition-shadow duration-300">
              <Brain className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold text-white tracking-tight">
              Mind<span className="text-mind-blue">Care</span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`relative px-4 py-2 text-sm font-medium transition-colors duration-300 rounded-lg ${
                  location.pathname === link.path
                    ? 'text-mind-blue'
                    : 'text-slate-300 hover:text-white'
                }`}
              >
                {link.label}
                {location.pathname === link.path && (
                  <span className="absolute bottom-0 left-4 right-4 h-0.5 bg-mind-blue rounded-full" />
                )}
              </Link>
            ))}
          </div>

          {/* Right side: User or Login */}
          <div className="hidden lg:flex items-center gap-3">
            {isLoggedIn && user ? (
              <div className="relative" ref={userMenuRef}>
                <button
                  onClick={() => setShowUserMenu(!showUserMenu)}
                  className="flex items-center gap-2 px-3 py-2 rounded-xl bg-night-800/50 border border-white/5 hover:border-white/10 transition-all duration-300"
                >
                  <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-mind-blue to-mind-purple flex items-center justify-center text-white text-xs font-bold">
                    {user.avatar}
                  </div>
                  <div className="text-left">
                    <p className="text-white text-xs font-medium leading-tight">{user.name}</p>
                    <p className="text-slate-500 text-[10px] leading-tight">{roleLabel}</p>
                  </div>
                  <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform duration-200 ${showUserMenu ? 'rotate-180' : ''}`} />
                </button>

                {showUserMenu && (
                  <div className="absolute right-0 top-full mt-2 w-56 rounded-xl bg-night-800 border border-white/10 shadow-2xl py-2 animate-fade-in-up">
                    <div className="px-4 py-3 border-b border-white/5">
                      <p className="text-white text-sm font-semibold">{user.name}</p>
                      <p className="text-slate-400 text-xs">{user.email}</p>
                      <span className={`inline-block mt-1 px-2 py-0.5 rounded-full text-[10px] font-medium ${
                        user.role === 'admin' ? 'bg-red-500/10 text-red-400' :
                        user.role === 'professional' ? 'bg-emerald-500/10 text-emerald-400' :
                        'bg-mind-blue/10 text-mind-blue'
                      }`}>
                        {roleLabel}
                      </span>
                    </div>
                    <div className="py-1">
                      <Link
                        to="/journal"
                        className="flex items-center gap-2 px-4 py-2 text-sm text-slate-300 hover:text-white hover:bg-white/5 transition-colors"
                      >
                        <User className="w-4 h-4" />
                        Mon journal
                      </Link>
                    </div>
                    <div className="border-t border-white/5 py-1">
                      <button
                        onClick={() => { logout(); setShowUserMenu(false); }}
                        className="w-full flex items-center gap-2 px-4 py-2 text-sm text-red-400 hover:text-red-300 hover:bg-white/5 transition-colors text-left"
                      >
                        <LogOut className="w-4 h-4" />
                        Se déconnecter
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <>
                <Link
                  to="/login"
                  className="px-5 py-2.5 text-slate-300 hover:text-white text-sm font-medium transition-colors duration-300"
                >
                  Connexion
                </Link>
                <Link
                  to="/login"
                  className="px-5 py-2.5 bg-mind-blue hover:bg-blue-500 text-white text-sm font-semibold rounded-lg shadow-glow hover:shadow-glow-lg transition-all duration-300 hover:-translate-y-0.5 flex items-center gap-2"
                >
                  <LogIn className="w-4 h-4" />
                  Essayer
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden p-2 text-slate-300 hover:text-white transition-colors"
            aria-label="Toggle menu"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        <div
          className={`lg:hidden overflow-hidden transition-all duration-300 ${
            isOpen ? 'max-h-[600px] mt-4' : 'max-h-0'
          }`}
        >
          <div className="glass rounded-2xl p-4 space-y-1">
            {isLoggedIn && user && (
              <div className="flex items-center gap-3 px-4 py-3 mb-2 bg-white/5 rounded-xl">
                <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-mind-blue to-mind-purple flex items-center justify-center text-white text-sm font-bold">
                  {user.avatar}
                </div>
                <div>
                  <p className="text-white text-sm font-semibold">{user.name}</p>
                  <p className="text-slate-400 text-xs">{roleLabel}</p>
                </div>
              </div>
            )}

            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`block px-4 py-3 text-sm font-medium rounded-lg transition-colors ${
                  location.pathname === link.path
                    ? 'bg-mind-blue/20 text-mind-blue'
                    : 'text-slate-300 hover:bg-white/5 hover:text-white'
                }`}
              >
                {link.label}
              </Link>
            ))}

            {isLoggedIn ? (
              <button
                onClick={() => { logout(); setIsOpen(false); }}
                className="w-full mt-2 px-4 py-3 text-left text-red-400 text-sm font-medium rounded-lg hover:bg-white/5 transition-colors flex items-center gap-2"
              >
                <LogOut className="w-4 h-4" />
                Se déconnecter
              </button>
            ) : (
              <Link
                to="/login"
                className="block mt-2 px-4 py-3 bg-mind-blue text-white text-sm font-semibold text-center rounded-lg"
              >
                Connexion / Essayer
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
