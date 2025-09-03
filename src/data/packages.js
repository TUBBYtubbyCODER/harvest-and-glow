export const packages = [
  {
    id: 'classic-charm',
    title: "Classic Charm",
    price: 299,
    originalPrice: null,
    description: "Perfect starter display with elegant simplicity",
    emoji: "🎃",
    popular: false,
    features: [
      "6 premium carved pumpkins",
      "Warm LED lighting", 
      "Professional arrangement",
      "1-hour setup included",
      "Basic maintenance guide"
    ],
    highlights: [
      "Perfect for smaller porches",
      "Classic autumn aesthetic",
      "Includes cleanup service"
    ],
    deliveryTime: "3-5 business days",
    setupTime: "1 hour",
    maintenanceIncluded: false,
    customizationLevel: "Low",
    recommendedFor: ["First-time customers", "Smaller spaces", "Budget-conscious"]
  },
  {
    id: 'harvest-walkway',
    title: "Harvest Walkway", 
    price: 549,
    originalPrice: 599,
    description: "Transform your entire walkway into autumn magic",
    emoji: "🍂",
    popular: true,
    features: [
      "12 assorted pumpkins & gourds",
      "Autumn leaf garlands", 
      "Solar pathway lighting",
      "Corn stalks & seasonal mums",
      "Hay bales for seating"
    ],
    highlights: [
      "Most popular package",
      "Complete walkway transformation",
      "Weather-resistant materials"
    ],
    deliveryTime: "5-7 business days",
    setupTime: "2-3 hours",
    maintenanceIncluded: true,
    customizationLevel: "Medium",
    recommendedFor: ["Medium to large homes", "Entertainment-focused families", "Neighborhood showcases"]
  },
  {
    id: 'deluxe-dreams',
    title: "Deluxe Dreams",
    price: 899, 
    originalPrice: 999,
    description: "The ultimate porch transformation experience",
    emoji: "✨",
    popular: false,
    features: [
      "20+ premium pumpkins",
      "Custom carved family designs",
      "Professional hay bale arrangement",
      "Complimentary family photo session",
      "Seasonal flower arrangements"
    ],
    highlights: [
      "Custom carving included",
      "Professional photography",
      "Premium material upgrade"
    ],
    deliveryTime: "7-10 business days",
    setupTime: "4-5 hours",
    maintenanceIncluded: true,
    customizationLevel: "High",
    recommendedFor: ["Luxury homes", "Special occasions", "Social media enthusiasts"]
  },
  {
    id: 'custom-glow-experience',
    title: "Custom Glow Experience",
    price: 1299,
    originalPrice: null,
    description: "Bespoke design tailored to your home's unique style",
    emoji: "🌟", 
    popular: false,
    features: [
      "Unlimited pumpkins & decorations",
      "Custom theme design consultation",
      "Premium LED lighting effects",
      "Weekly maintenance visits",
      "Seasonal transition service"
    ],
    highlights: [
      "Completely customizable",
      "Designer consultation included",
      "Maintenance through season"
    ],
    deliveryTime: "10-14 business days",
    setupTime: "Full day installation",
    maintenanceIncluded: true,
    customizationLevel: "Complete",
    recommendedFor: ["Luxury estates", "Event hosting", "Year-round decorating enthusiasts"]
  }
];

// Helper functions for filtering and sorting packages
export const getPopularPackages = () => packages.filter(pkg => pkg.popular);
export const getPackageById = (id) => packages.find(pkg => pkg.id === id);
export const getPackagesByPriceRange = (min, max) => packages.filter(pkg => pkg.price >= min && pkg.price <= max);
export const sortPackagesByPrice = (ascending = true) => {
  return [...packages].sort((a, b) => ascending ? a.price - b.price : b.price - a.price);
};