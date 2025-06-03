const locales = {
  en: () => import("../locales/en.js"),
  ja: () => import("../locales/ja.json"),
};

export async function loadLocale(lang) {
  const loader = locales[lang] || locales['en'];
  const module = await loader();
  return module.default;
}

export async function getLocale(Astro, langOverride) {
  // Check for langOverride, then cookie, then accept-language
  let userLang = langOverride;

  if (!userLang) {
    // Parse cookies
    const cookie = Astro.request.headers.get('cookie') || '';
    const match = cookie.match(/(?:^|;\s*)lang=([^;]+)/);
    if (match) userLang = match[1];
  }

  if (!userLang) {
    userLang = Astro.request.headers.get('accept-language')?.split(',')[0]?.split('-')[0] || 'en';
  }

  return await loadLocale(userLang);
}