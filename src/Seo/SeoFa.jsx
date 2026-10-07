import { Helmet } from "react-helmet";

const SeoFa = () => (
  <Helmet>
    <html lang="fa" dir="rtl" />
    <title>
      Arash Ch - Con Dev | توسعه‌دهنده ارشد فرانت‌اند (React.js, TypeScript,
      Next.js)
    </title>
    <meta
      name="description"
      content="Arash (Con Dev) - توسعه‌دهنده ارشد فرانت‌اند با بیش از ۶ سال تجربه حرفه‌ای در React.js، TypeScript، Next.js و UI/UX. دارای مدارک رسمی Meta، Microsoft و IBM."
    />
    <meta
      name="keywords"
      content="Arash, Con Dev, فرانت‌اند, React.js, TypeScript, Next.js, UI/UX, توسعه‌دهنده وب"
    />
    <meta name="author" content="Arash Ch - Con Dev" />
    <meta name="robots" content="index, follow" />
    <link rel="canonical" href="https://cv.condev.ir/" />

    {/* Open Graph */}
    <meta
      property="og:title"
      content="Arash Ch - Con Dev | توسعه‌دهنده ارشد فرانت‌اند"
    />
    <meta
      property="og:description"
      content="Arash - متخصص React.js، TypeScript و Next.js با مدارک معتبر بین‌المللی"
    />
    <meta property="og:image" content="https://cv.condev.ir/img/og-image.webp" />
    <meta property="og:url" content="https://cv.condev.ir/" />
    <meta property="og:type" content="website" />
    <meta property="og:site_name" content="Arash Ch - Con Dev" />
    <meta property="og:locale" content="fa_IR" />

    {/* Twitter */}
    <meta name="twitter:card" content="summary_large_image" />
    <meta
      name="twitter:title"
      content="Arash Ch - Con Dev | توسعه‌دهنده ارشد فرانت‌اند"
    />
    <meta
      name="twitter:description"
      content="متخصص فرانت‌اند - React، TypeScript و Next.js"
    />
    <meta name="twitter:image" content="https://cv.condev.ir/img/og-image.webp" />

    {/* Structured Data */}
    <script type="application/ld+json">
      {`
      {
        "@context": "https://schema.org",
        "@type": "Person",
        "name": "Arash Ch",
        "alternateName": "Con Dev",
        "jobTitle": "توسعه‌دهنده ارشد فرانت‌اند",
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

export default SeoFa;
