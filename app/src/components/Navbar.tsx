import { useState, useEffect, useCallback, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Sword, FlaskConical, Map, BookOpen, PawPrint, Home, Users, TreePine, Route, ChevronDown, Sparkles, Shield, Backpack, Search } from 'lucide-react';
import { OPEN_SEARCH_EVENT } from './SearchPalette';

const openSearch = () => window.dispatchEvent(new Event(OPEN_SEARCH_EVENT));

const navLinks = [
  { path: '/', label: 'Home', icon: Home },
  { path: '/adventure', label: 'Adventure Flow', icon: Route },
  { path: '/okiri', label: 'Okiri Village', icon: TreePine },
  { path: '/npcs', label: 'NPCs', icon: Users },
  { path: '/workshop', label: 'Workshop', icon: Home },
  { path: '/locations', label: 'Locations', icon: Map },
  { path: '/encounters', label: 'Encounters', icon: Sword },
  { path: '/bestiary', label: 'Bestiary', icon: PawPrint },
  { path: '/potions', label: 'Potions', icon: FlaskConical },
  { path: '/conclusion', label: 'Conclusion', icon: BookOpen },
];

const playerOptionLinks = [
  { path: '/subclasses', label: 'Subclasses', icon: Sparkles },
  { path: '/feats', label: 'Feats & Conditions', icon: Shield },
  { path: '/gear', label: 'Backgrounds & Gear', icon: Backpack },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [optionsOpen, setOptionsOpen] = useState(false);
  const optionsRef = useRef<HTMLDivElement>(null);
  const location = useLocation();

  const optionsActive = playerOptionLinks.some((l) => l.path === location.pathname);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 100);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
    setOptionsOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [mobileOpen]);

  // Close the desktop dropdown on outside click / Escape
  useEffect(() => {
    if (!optionsOpen) return;
    const onPointer = (e: MouseEvent) => {
      if (optionsRef.current && !optionsRef.current.contains(e.target as Node)) {
        setOptionsOpen(false);
      }
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOptionsOpen(false);
    };
    document.addEventListener('mousedown', onPointer);
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('mousedown', onPointer);
      document.removeEventListener('keydown', onKey);
    };
  }, [optionsOpen]);

  const handleNavClick = useCallback(() => {
    setMobileOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  return (
    <>
      <nav
        className="fixed top-0 left-0 right-0 h-16 flex items-center transition-all duration-300"
        style={{
          zIndex: 50,
          background: scrolled ? 'rgba(26, 20, 16, 0.8)' : 'transparent',
          backdropFilter: scrolled ? 'blur(12px)' : 'none',
          WebkitBackdropFilter: scrolled ? 'blur(12px)' : 'none',
          borderBottom: scrolled ? '1px solid transparent' : 'none',
        }}
      >
        {scrolled && (
          <div
            className="absolute inset-x-0 bottom-0 h-px"
            style={{
              background: 'linear-gradient(90deg, rgba(184,115,51,0) 0%, rgba(184,115,51,0.6) 50%, rgba(184,115,51,0) 100%)',
            }}
          />
        )}

        <div className="max-w-container w-full mx-auto px-4 sm:px-6 flex items-center justify-between">
          <Link
            to="/"
            className="font-label text-[0.9rem] tracking-[0.1em] text-parchment hover:text-copper-light transition-colors duration-200 shrink-0"
            onClick={handleNavClick}
          >
            The Curious World Within
          </Link>

          {/* Desktop nav links */}
          <div className="hidden lg:flex items-center gap-1">
            {navLinks.slice(1).map((link) => {
              const Icon = link.icon;
              const isActive = location.pathname === link.path;
              return (
                <Link
                  key={link.path}
                  to={link.path}
                  className="relative flex items-center gap-1.5 px-2.5 py-2 rounded-md text-sm font-body transition-all duration-200"
                  style={{
                    color: isActive ? '#D4956A' : 'rgba(245,240,230,0.7)',
                  }}
                  onMouseEnter={(e) => {
                    if (!isActive) e.currentTarget.style.color = '#F5F0E6';
                  }}
                  onMouseLeave={(e) => {
                    if (!isActive) e.currentTarget.style.color = 'rgba(245,240,230,0.7)';
                  }}
                >
                  <Icon size={15} />
                  <span className="text-xs tracking-wide">{link.label}</span>
                  {isActive && (
                    <span
                      className="absolute bottom-0 left-1/2 -translate-x-1/2 w-6 h-0.5 rounded-full"
                      style={{
                        backgroundColor: '#B87333',
                        boxShadow: '0 0 6px rgba(201,168,76,0.4)',
                      }}
                    />
                  )}
                </Link>
              );
            })}

            {/* Player Options dropdown */}
            <div className="relative" ref={optionsRef}>
              <button
                className="relative flex items-center gap-1.5 px-2.5 py-2 rounded-md text-sm font-body transition-all duration-200"
                style={{ color: optionsActive || optionsOpen ? '#D4956A' : 'rgba(245,240,230,0.7)' }}
                onClick={() => setOptionsOpen((v) => !v)}
                aria-expanded={optionsOpen}
                aria-haspopup="true"
              >
                <Sparkles size={15} />
                <span className="text-xs tracking-wide">Player Options</span>
                <ChevronDown size={13} className="transition-transform duration-200" style={{ transform: optionsOpen ? 'rotate(180deg)' : 'none' }} />
                {optionsActive && (
                  <span
                    className="absolute bottom-0 left-1/2 -translate-x-1/2 w-6 h-0.5 rounded-full"
                    style={{ backgroundColor: '#B87333', boxShadow: '0 0 6px rgba(201,168,76,0.4)' }}
                  />
                )}
              </button>
              {optionsOpen && (
                <div
                  className="absolute right-0 mt-2 w-56 rounded-lg overflow-hidden"
                  style={{
                    background: 'rgba(26,20,16,0.95)',
                    backdropFilter: 'blur(12px)',
                    WebkitBackdropFilter: 'blur(12px)',
                    border: '1px solid rgba(184,115,51,0.25)',
                    boxShadow: '0 8px 30px rgba(0,0,0,0.4)',
                  }}
                >
                  {playerOptionLinks.map((link) => {
                    const Icon = link.icon;
                    const isActive = location.pathname === link.path;
                    return (
                      <Link
                        key={link.path}
                        to={link.path}
                        className="flex items-center gap-2.5 px-4 py-2.5 text-sm font-body transition-colors duration-200"
                        style={{ color: isActive ? '#D4956A' : 'rgba(245,240,230,0.8)' }}
                        onClick={handleNavClick}
                        onMouseEnter={(e) => { if (!isActive) e.currentTarget.style.color = '#F5F0E6'; }}
                        onMouseLeave={(e) => { if (!isActive) e.currentTarget.style.color = 'rgba(245,240,230,0.8)'; }}
                      >
                        <Icon size={16} />
                        {link.label}
                      </Link>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Search trigger */}
            <button
              onClick={openSearch}
              aria-label="Search (Ctrl or Cmd + K)"
              className="ml-1 flex items-center gap-2 rounded-md px-2.5 py-1.5 transition-colors"
              style={{ border: '1px solid rgba(184,115,51,0.25)', color: 'rgba(245,240,230,0.7)' }}
              onMouseEnter={(e) => (e.currentTarget.style.color = '#F5F0E6')}
              onMouseLeave={(e) => (e.currentTarget.style.color = 'rgba(245,240,230,0.7)')}
            >
              <Search size={14} />
              <kbd className="text-[0.65rem] tracking-wider" style={{ color: 'rgba(245,240,230,0.45)' }}>⌘K</kbd>
            </button>
          </div>

          {/* Mobile controls */}
          <div className="lg:hidden flex items-center gap-1">
            <button
              className="p-2 text-parchment hover:text-copper-light transition-colors"
              onClick={openSearch}
              aria-label="Search"
            >
              <Search size={22} />
            </button>
            <button
              className="p-2 text-parchment hover:text-copper-light transition-colors"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label="Toggle menu"
              aria-expanded={mobileOpen}
              aria-controls="mobile-menu"
            >
              {mobileOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile menu overlay */}
      {mobileOpen && (
        <div
          id="mobile-menu"
          className="fixed inset-0 glass-modal flex flex-col items-center justify-center gap-4 overflow-y-auto py-20"
          style={{ zIndex: 55 }}
        >
          <button
            className="absolute top-4 right-4 p-2 text-parchment hover:text-copper-light"
            onClick={() => setMobileOpen(false)}
            aria-label="Close menu"
          >
            <X size={28} />
          </button>
          {navLinks.map((link) => {
            const Icon = link.icon;
            const isActive = location.pathname === link.path;
            return (
              <Link
                key={link.path}
                to={link.path}
                className="flex items-center gap-3 text-lg font-body transition-colors duration-200"
                style={{
                  color: isActive ? '#D4956A' : '#F5F0E6',
                }}
                onClick={handleNavClick}
              >
                <Icon size={20} />
                {link.label}
              </Link>
            );
          })}

          <div className="w-24 h-px my-1" style={{ background: 'rgba(184,115,51,0.3)' }} />
          <span className="text-label text-copper text-[0.65rem] tracking-[0.2em] uppercase">Player Options</span>

          {playerOptionLinks.map((link) => {
            const Icon = link.icon;
            const isActive = location.pathname === link.path;
            return (
              <Link
                key={link.path}
                to={link.path}
                className="flex items-center gap-3 text-lg font-body transition-colors duration-200"
                style={{
                  color: isActive ? '#D4956A' : '#F5F0E6',
                }}
                onClick={handleNavClick}
              >
                <Icon size={20} />
                {link.label}
              </Link>
            );
          })}
        </div>
      )}
    </>
  );
}
