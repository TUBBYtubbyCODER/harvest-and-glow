// Analytics service for tracking user interactions
// For production, you would integrate with Google Analytics, Facebook Pixel, etc.

class AnalyticsService {
  constructor() {
    this.isProduction = import.meta.env.PROD;
    this.events = [];
  }

  // Track page views
  trackPageView(pageName) {
    const event = {
      type: 'page_view',
      page: pageName,
      timestamp: new Date().toISOString(),
      url: window.location.href
    };

    this.events.push(event);
    
    if (this.isProduction) {
      // In production, send to actual analytics service
      this.sendToAnalytics(event);
    } else {
      console.log('Analytics Event:', event);
    }
  }

  // Track user interactions
  trackEvent(eventName, properties = {}) {
    const event = {
      type: 'custom_event',
      name: eventName,
      properties,
      timestamp: new Date().toISOString(),
      url: window.location.href
    };

    this.events.push(event);

    if (this.isProduction) {
      this.sendToAnalytics(event);
    } else {
      console.log('Analytics Event:', event);
    }
  }

  // Track package selections
  trackPackageInterest(packageName, price) {
    this.trackEvent('package_viewed', {
      package_name: packageName,
      package_price: price,
      category: 'packages'
    });
  }

  // Track form submissions
  trackFormSubmission(formType) {
    this.trackEvent('form_submitted', {
      form_type: formType,
      category: 'conversion'
    });
  }

  // Track file uploads
  trackFileUpload(fileCount, fileTypes) {
    this.trackEvent('files_uploaded', {
      file_count: fileCount,
      file_types: fileTypes.join(','),
      category: 'custom_carve'
    });
  }

  // Send to actual analytics service (placeholder)
  sendToAnalytics(event) {
    // In production, this would send to:
    // - Google Analytics 4
    // - Facebook Pixel
    // - Your own analytics endpoint
    
    if (window.gtag) {
      window.gtag('event', event.name || event.type, {
        custom_parameter_1: event.properties || {},
        page_path: event.url
      });
    }
  }

  // Get all tracked events (for debugging)
  getEvents() {
    return this.events;
  }

  // Clear events (for testing)
  clearEvents() {
    this.events = [];
  }
}

// Create singleton instance
const analytics = new AnalyticsService();

export default analytics;

// Named exports for specific functions
export const trackPageView = (pageName) => analytics.trackPageView(pageName);
export const trackEvent = (eventName, properties) => analytics.trackEvent(eventName, properties);
export const trackPackageInterest = (packageName, price) => analytics.trackPackageInterest(packageName, price);
export const trackFormSubmission = (formType) => analytics.trackFormSubmission(formType);
export const trackFileUpload = (fileCount, fileTypes) => analytics.trackFileUpload(fileCount, fileTypes);