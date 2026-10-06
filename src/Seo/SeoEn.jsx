import { Helmet } from "react-helmet";

const SeoEn = () => (
  <Helmet>
    <html lang="en" dir="ltr" />
    <title>
      Arash - Con Dev | Senior Front-End Developer (React.js, TypeScript,
      Next.js)
    </title>
    <meta
      name="description"
      content="Arash Ch (Con Dev) - Senior Front-End Developer with 6+ years of experience in React.js, TypeScript, Next.js, and UI/UX. Certified by Meta, Microsoft, and IBM."
    />
    <meta
      name="keywords"
      content="Arash, Con Dev, Front-End, React.js, TypeScript, Next.js, UI/UX, Web Developer"
    />
    <meta name="author" content="Arash - Con Dev" />
    <meta name="robots" content="index, follow" />
    <link rel="canonical" href="https://cv.condev.ir/" />

    {/* Open Graph */}
    <meta
      property="og:title"
      content="Arash Ch - Con Dev | Senior Front-End Developer"
    />
    <meta
      property="og:description"
      content="Arash Ch - Expert in React.js, TypeScript, and Next.js with certified international certificates"
    />
    <meta property="og:image" content="https://cv.condev.ir/img/og-image.png" />
    <meta property="og:url" content="https://cv.condev.ir/" />
    <meta property="og:type" content="website" />
    <meta property="og:site_name" content="Arash Ch - Con Dev" />
    <meta property="og:locale" content="en_US" />

    {/* Twitter */}
    <meta name="twitter:card" content="summary_large_image" />
    <meta
      name="twitter:title"
      content="Arash Ch - Con Dev | Senior Front-End Developer"
    />
    <meta
      name="twitter:description"
      content="Expert Front-End Developer - React, TypeScript, Next.js"
    />
    <meta name="twitter:image" content="https://cv.condev.ir/img/og-image.png" />

    {/* Structured Data */}
    <script type="application/ld+json">
      {`
      {
        "@context": "https://schema.org",
        "@type": "Person",
        "name": "Arash Ch",
        "alternateName": "Con Dev",
        "jobTitle": "Senior Front-End Developer",
        "url": "https://cv.condev.ir/",
        "sameAs": [
          "https://www.instagram.com/con.dev",
          "https://github.com/condev-dev",
          "https://www.linkedin.com/in/con-dev-5b43a538b"
        ],
        "alumniOf": [
          { "@type": "Organization", "name": "Meta" },
          { "@type": "Organization", "name": "Microsoft" },
          { "@type": "Organization", "name": "IBM" }
        ],
        "knowsAbout": [
          "React.js",
          "TypeScript",
          "Next.js",
          "UI/UX",
          "Front-End Development"
        ]
      }
      `}
    </script>
  </Helmet>
);

export default SeoEn;
