import React from 'react';
import { Helmet } from 'react-helmet-async';

interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string;
  image?: string;
  url?: string;
}

export function SEO({
  title = 'Proffere - Bedriftssøk Norge',
  description = 'Søk etter norske bedrifter, personer og organisasjonsnumre. Få tilgang til oppdatert bedriftsinformasjon fra Brønnøysund.',
  keywords = 'bedriftssøk, norge, brønnøysund, organisasjonsnummer, bedriftsregister, proff, bedrift',
  image = 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=1200&h=630',
  url = 'https://proffere.no'
}: SEOProps) {
  const siteTitle = title.includes('Proffere') ? title : `${title} | Proffere`;

  return (
    <Helmet>
      <title>{siteTitle}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content="website" />
      <meta property="og:url" content={url} />
      <meta property="og:title" content={siteTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:url" content={url} />
      <meta name="twitter:title" content={siteTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />

      {/* Additional Meta Tags */}
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta httpEquiv="Content-Type" content="text/html; charset=utf-8" />
      <meta name="language" content="Norwegian" />
      <meta name="revisit-after" content="7 days" />
      <meta name="robots" content="index, follow" />

      {/* Favicon */}
      <link rel="icon" type="image/svg+xml" href="/vite.svg" />
    </Helmet>
  );
}