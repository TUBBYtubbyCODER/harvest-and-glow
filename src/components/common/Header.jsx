import { useState, useEffect } from 'react'
import { useScrollPosition } from '@hooks/useScrollPosition'

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const scrolled = useScrollPosition() > 50

  const navItems = [
    { href: '#packages', label: 'Packages' },
    { href: '#story', label: 'Our Story' },
    { href: '#custom', label: 'Custom Carve' },
    { href: '#gift', label: 'Gift' },
    { href: '#contact', label: 'Contact' }
  ]

  return (
    <header className={`header ${scrolled ? 'scrolled' : ''}`}>
      <nav className="nav">
        <a href="#home" className="logo cursive">
          Harvest & Glow
        </a>
        
        <div className="nav-desktop">
          <ul className="nav-links">
            {navItems.map((item, index) => (
              <li key={index}>
                <a href={item.href}>{item.label}</a>
              </li>
            ))}
          </ul>
        </div>

        <button 
          className="mobile-menu-toggle"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Toggle mobile menu"
        >
          <span></span>
          <span></span>
          <span></span>
        </button>

        {isMenuOpen && (
          <div className="mobile-menu">
            <ul className="mobile-nav-links">
              {navItems.map((item, index) => (
                <li key={index}>
                  <a 
                    href={item.href}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        )}
      </nav>
    </header>
  )
}

export default Header