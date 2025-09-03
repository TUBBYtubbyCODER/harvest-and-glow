import { Helmet } from 'react-helmet-async'

const SEOHead = ({ 
  title, 
  description, 
  keywords, 
  image, 
  url,
  type = 'website' 
}) => {
  const siteTitle = 'Harvest & Glow - Luxury Pumpkin Decorating | Salt Lake City'
  const fullTitle = title ? `${title} | ${siteTitle}` : siteTitle
  const defaultImage = '/images/hero/hero-pumpkin-display.jpg'
  const defaultUrl = 'https://harvestandglow.com'

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      
      {/* Open Graph */}
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content={type} />
      <meta property="og:url" content={url || defaultUrl} />
      <meta property="og:image" content={image || defaultImage} />
      <meta property="og:site_name" content="Harvest & Glow" />
      
      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image || defaultImage} />
      
      {/* Additional SEO */}
      <meta name="robots" content="index, follow" />
      <meta name="author" content="Harvest & Glow" />
      <link rel="canonical" href={url || defaultUrl} />
      
      {/* Structured Data */}
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "LocalBusiness",
          "name": "Harvest & Glow",
          "description": description,
          "url": url || defaultUrl,
          "telephone": "(801) 555-4569",
          "address": {
            "@type": "PostalAddress",
            "addressLocality": "Salt Lake City",
            "addressRegion": "Utah",
            "addressCountry": "US"
          },
          "geo": {
            "@type": "GeoCoordinates",
            "latitude": "40.7608",
            "longitude": "-111.8910"
          },
          "priceRange": "$299-$1299",
          "image": image || defaultImage
        })}
      </script>
    </Helmet>
  )
}

export default SEOHead