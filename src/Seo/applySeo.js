/**
 * Keeps the SEO tags in step with the language the visitor is reading.
 *
 * The tags themselves live in `public/index.html`, so a crawler that does not run
 * javascript still receives a complete title, description and share card. This file
 * only updates those same elements in place when the language changes - it never
 * adds a second copy, so the page always holds exactly one of each tag.
 *
 * Values are taken from the existing Seo components so nothing new is introduced.
 */

const TAGS = {
  description: 'meta[name="description"]',
  keywords: 'meta[name="keywords"]',
  author: 'meta[name="author"]',
  ogTitle: 'meta[property="og:title"]',
  ogDescription: 'meta[property="og:description"]',
  ogLocale: 'meta[property="og:locale"]',
  twitterTitle: 'meta[name="twitter:title"]',
  twitterDescription: 'meta[name="twitter:description"]',
};

const CONTENT = {
  fa: {
    title:
      "Arash Ch - Con Dev | توسعه‌دهنده ارشد فرانت‌اند (React.js, TypeScript, Next.js)",
    description:
      "Arash (Con Dev) - توسعه‌دهنده ارشد فرانت‌اند با بیش از ۶ سال تجربه حرفه‌ای در React.js، TypeScript، Next.js و UI/UX. دارای مدارک رسمی Meta، Microsoft و IBM.",
    keywords:
      "Arash, Con Dev, فرانت‌اند, React.js, TypeScript, Next.js, UI/UX, توسعه‌دهنده وب",
    author: "Arash Ch - Con Dev",
    ogTitle:
      "Arash Ch - Con Dev | توسعه‌دهنده ارشد فرانت‌اند (React.js, TypeScript, Next.js)",
    ogDescription:
      "Arash (Con Dev) - توسعه‌دهنده ارشد فرانت‌اند با بیش از ۶ سال تجربه حرفه‌ای در React.js، TypeScript، Next.js و UI/UX. دارای مدارک رسمی Meta، Microsoft و IBM.",
    ogLocale: "fa_IR",
    twitterTitle:
      "Arash Ch - Con Dev | توسعه‌دهنده ارشد فرانت‌اند (React.js, TypeScript, Next.js)",
    twitterDescription:
      "Arash (Con Dev) - توسعه‌دهنده ارشد فرانت‌اند با بیش از ۶ سال تجربه حرفه‌ای در React.js، TypeScript، Next.js و UI/UX. دارای مدارک رسمی Meta، Microsoft و IBM.",
  },
  en: {
    title:
      "Arash - Con Dev | Senior Front-End Developer (React.js, TypeScript, Next.js)",
    description:
      "Arash Ch (Con Dev) - Senior Front-End Developer with 6+ years of experience in React.js, TypeScript, Next.js, and UI/UX. Certified by Meta, Microsoft, and IBM.",
    keywords:
      "Arash, Con Dev, Front-End, React.js, TypeScript, Next.js, UI/UX, Web Developer",
    author: "Arash - Con Dev",
    ogTitle:
      "Arash - Con Dev | Senior Front-End Developer (React.js, TypeScript, Next.js)",
    ogDescription:
      "Arash Ch (Con Dev) - Senior Front-End Developer with 6+ years of experience in React.js, TypeScript, Next.js, and UI/UX. Certified by Meta, Microsoft, and IBM.",
    ogLocale: "en_US",
    twitterTitle:
      "Arash - Con Dev | Senior Front-End Developer (React.js, TypeScript, Next.js)",
    twitterDescription:
      "Arash Ch (Con Dev) - Senior Front-End Developer with 6+ years of experience in React.js, TypeScript, Next.js, and UI/UX. Certified by Meta, Microsoft, and IBM.",
  },
};

const applySeo = (lang) => {
  const data = CONTENT[lang] || CONTENT.fa;

  if (document.title !== data.title) {
    document.title = data.title;
  }

  Object.keys(TAGS).forEach((key) => {
    const element = document.querySelector(TAGS[key]);
    if (element && element.getAttribute("content") !== data[key]) {
      element.setAttribute("content", data[key]);
    }
  });
};

export default applySeo;
