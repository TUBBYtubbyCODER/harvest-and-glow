import { Helmet } from 'react-helmet-async';

const SEOHead = ({ 
  title = "Harvest & Glow - Luxury Porch Pumpkin Decorating | Salt Lake City",
  description = "Transform your home with luxury pumpkin displays. Harvest & Glow brings effortless seasonal charm to Salt Lake City's most discerning homes.",
  canonicalUrl = "https://harvestandglow.com",
  ogImage = "/images/og-harvest-glow.jpg",
  keywords = "pumpkin decorating, luxury home services, autumn decor, Salt Lake City, seasonal displays, Halloween decorations",
  author = "Harvest & Glow",
  structuredData = null
}) => {
  const defaultStructuredData = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": "Harvest & Glow",
    "description": "Luxury porch pumpkin decorating company",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Salt Lake City",
      "addressRegion": "UT",
      "addressCountry": "US"
    },
    "telephone": "(801) 555-GLOW",
    "email": "info@harvestandglow.com",
    "url": "https://harvestandglow.com",
    "priceRange": "$299-$1299",
    "serviceArea": {
      "@type": "GeoCircle",
      "geoMidpoint": {
        "@type": "GeoCoordinates",
        "latitude": 40.7608,
        "longitude": -111.8910
      },
      "geoRadius": "50000"
    }
  };

  return (
    <Helmet>
      {/* Basic Meta Tags */}
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <meta name="author" content={author} />
      <link rel="canonical" href={canonicalUrl} />
      
      {/* Open Graph Meta Tags */}
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content="website" />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:site_name" content="Harvest & Glow" />
      <meta property="og:locale" content="en_US" />
      
      {/* Twitter Card Meta Tags */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage} />
      
      {/* Additional SEO Tags */}
      <meta name="robots" content="index, follow" />
      <meta name="googlebot" content="index, follow" />
      <meta name="rating" content="general" />
      <meta name="revisit-after" content="7 days" />
      
      {/* Structured Data */}
      <script type="application/ld+json">
        {JSON.stringify(structuredData || defaultStructuredData)}
      </script>
    </Helmet>
  );
};

export default SEOHead;