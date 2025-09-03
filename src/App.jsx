import { useEffect, Suspense } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import './App.css';

// Core Components
import SEOHead from '@components/common/SEOHead';
import Header from '@components/common/Header';
import Footer from '@components/common/Footer';

// Section Components
import Hero from '@components/sections/Hero';
import Packages from '@components/sections/Packages';
import Story from '@components/sections/Story';
import Testimonials from '@components/sections/Testimonials';
import Sourcing from '@components/sections/Sourcing';
import CustomCarve from '@components/sections/CustomCarve';
import Gift from '@components/sections/Gift';
import Newsletter from '@components/sections/Newsletter';

// UI Components
import FloatingActions from '@components/ui/FloatingActions';
import CookieBanner from '@components/ui/CookieBanner';

// Hooks and Services
import useScrollAnimations from '@hooks/useScrollAnimations';
import analytics from '@services/analytics';

// Error Fallback Component
function ErrorFallback({ error, resetErrorBoundary }) {
  useEffect(() => {
    analytics.trackEvent('error', {
      message: error.message,
      stack: error.stack
    });
  }, [error]);

  return (
    <div className="error-fallback">
      <div className="container">
        <h2>Oops! Something went wrong</h2>
        <p>We're sorry for the inconvenience. Please try refreshing the page.</p>
        <div className="error-actions">
          <button className="btn btn-primary" onClick={resetErrorBoundary}>
            Try again
          </button>
          <a href="/" className="btn btn-secondary">
            Go home
          </a>
        </div>
        <details style={{ marginTop: '2rem', fontSize: '0.9rem', color: '#666' }}>
          <summary>Technical details</summary>
          <pre style={{ 
            background: '#f5f5f5', 
            padding: '1rem', 
            borderRadius: '5px',
            overflow: 'auto',
            fontSize: '0.8rem' 
          }}>
            {error.message}
          </pre>
        </details>
      </div>
    </div>
  );
}

// Loading Component
function LoadingSpinner() {
  return (
    <div className="loading-spinner">
      <div className="spinner"></div>
      <p>Loading magical autumn experiences...</p>
    </div>
  );
}

function App() {
  // Initialize scroll animations
  useScrollAnimations();

  // App initialization effects
  useEffect(() => {
    // Track app initialization
    analytics.trackPageView('App');
    
    // Performance monitoring
    const navigationStart = performance.timing.navigationStart;
    const loadComplete = performance.timing.loadEventEnd;
    const loadTime = loadComplete - navigationStart;
    
    analytics.trackEvent('performance', {
      page_load_time: loadTime,
      user_agent: navigator.userAgent,
      viewport_width: window.innerWidth,
      viewport_height: window.innerHeight
    });

    // Service worker registration for PWA capabilities
    if ('serviceWorker' in navigator && process.env.NODE_ENV === 'production') {
      navigator.serviceWorker
        .register('/sw.js')
        .then((registration) => {
          console.log('SW registered: ', registration);
        })
        .catch((registrationError) => {
          console.log('SW registration failed: ', registrationError);
        });
    }

    // Preload critical resources
    const preloadLink = document.createElement('link');
    preloadLink.rel = 'preload';
    preloadLink.href = 'https://fonts.googleapis.com/css2?family=Dancing+Script:wght@400;500;600;700&family=Crimson+Text:wght@400;600&display=swap';
    preloadLink.as = 'style';
    document.head.appendChild(preloadLink);

    // Cleanup function
    return () => {
      // Clean up any ongoing analytics or tracking
      analytics.trackEvent('app_unmount');
    };
  }, []);

  // Handle global keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (event) => {
      // Press 'h' to go to home
      if (event.key === 'h' && !event.ctrlKey && !event.metaKey) {
        const homeSection = document.getElementById('home');
        if (homeSection && document.activeElement.tagName !== 'INPUT' && document.activeElement.tagName !== 'TEXTAREA') {
          homeSection.scrollIntoView({ behavior: 'smooth' });
          analytics.trackEvent('keyboard_navigation', { key: 'h', target: 'home' });
        }
      }
      
      // Press 'p' to go to packages
      if (event.key === 'p' && !event.ctrlKey && !event.metaKey) {
        const packagesSection = document.getElementById('packages');
        if (packagesSection && document.activeElement.tagName !== 'INPUT' && document.activeElement.tagName !== 'TEXTAREA') {
          packagesSection.scrollIntoView({ behavior: 'smooth' });
          analytics.trackEvent('keyboard_navigation', { key: 'p', target: 'packages' });
        }
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Handle offline/online status
  useEffect(() => {
    const handleOnline = () => {
      analytics.trackEvent('network_status', { status: 'online' });
    };
    
    const handleOffline = () => {
      analytics.trackEvent('network_status', { status: 'offline' });
    };

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);
    
    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  return (
    <ErrorBoundary FallbackComponent={ErrorFallback}>
      <div className="App">
        {/* SEO and Meta Tags */}
        <SEOHead />
        
        {/* Skip to main content for accessibility */}
        <a href="#main-content" className="skip-link">
          Skip to main content
        </a>
        
        {/* Header Navigation */}
        <Header />
        
        {/* Main Content */}
        <main id="main-content">
          {/* Hero Section */}
          <Suspense fallback={<LoadingSpinner />}>
            <Hero />
          </Suspense>
          
          {/* Packages Section */}
          <Suspense fallback={<LoadingSpinner />}>
            <Packages />
          </Suspense>
          
          {/* Story Section */}
          <Suspense fallback={<LoadingSpinner />}>
            <Story />
          </Suspense>
          
          {/* Testimonials Section */}
          <Suspense fallback={<LoadingSpinner />}>
            <Testimonials />
          </Suspense>
          
          {/* Sourcing Information */}
          <Suspense fallback={<LoadingSpinner />}>
            <Sourcing />
          </Suspense>
          
          {/* Custom Carve Section */}
          <Suspense fallback={<LoadingSpinner />}>
            <CustomCarve />
          </Suspense>
          
          {/* Gift Section */}
          <Suspense fallback={<LoadingSpinner />}>
            <Gift />
          </Suspense>
          
          {/* Newsletter Signup */}
          <Suspense fallback={<LoadingSpinner />}>
            <Newsletter />
          </Suspense>
        </main>
        
        {/* Footer */}
        <Footer />
        
        {/* Floating Action Buttons */}
        <FloatingActions />
        
        {/* Cookie Consent Banner */}
        <CookieBanner />
        
        {/* Accessibility Announcements */}
        <div 
          id="a11y-announcements" 
          className="sr-only" 
          aria-live="polite" 
          aria-atomic="true"
        ></div>
      </div>
    </ErrorBoundary>
  );
}

export default App;