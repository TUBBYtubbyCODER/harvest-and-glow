import { useState, useEffect } from 'react';

const Header = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setMobileMenuOpen(false);
  };

  return (
    <header className={`header ${scrolled ? 'scrolled' : ''}`}>
      <nav className="nav">
        <button 
          onClick={() => scrollToSection('home')} 
          className="logo cursive"
          style={{ background: 'none', border: 'none', cursor: 'pointer' }}
        >
          Harvest & Glow
        </button>
        
        {/* Desktop Navigation */}
        <ul className="nav-links desktop-nav">
          <li><button onClick={() => scrollToSection('packages')}>Packages</button></li>
          <li><button onClick={() => scrollToSection('story')}>Our Story</button></li>
          <li><button onClick={() => scrollToSection('custom')}>Custom Carve</button></li>
          <li><button onClick={() => scrollToSection('gift')}>Gift</button></li>
          <li><button onClick={() => scrollToSection('contact')}>Contact</button></li>
        </ul>

        {/* Mobile Menu Button */}
        <button 
          className="mobile-menu-btn"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle mobile menu"
        >
          <span></span>
          <span></span>
          <span></span>
        </button>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="mobile-nav">
            <button onClick={() => scrollToSection('packages')}>Packages</button>
            <button onClick={() => scrollToSection('story')}>Our Story</button>
            <button onClick={() => scrollToSection('custom')}>Custom Carve</button>
            <button onClick={() => scrollToSection('gift')}>Gift</button>
            <button onClick={() => scrollToSection('contact')}>Contact</button>
          </div>
        )}
      </nav>
    </header>
  );
};

export default Header;