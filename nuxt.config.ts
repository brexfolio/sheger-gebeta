// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-01-01',
  future: {
    compatibilityVersion: 4
  },
  app: {
    head: {
      htmlAttrs: {
        lang: 'en'
      },
      title: 'Sheger Gebeta - Your Gateway to Discover Addis',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1.0, viewport-fit=cover' },
        {
          name: 'description',
          content: 'Discover Addis together. Explore food reviews, cafes, dining, and top places in Addis Ababa with Sheger Gebeta.'
        }
      ],
      link: [
        { rel: 'icon', type: 'image/svg+xml', href: '/assets/favicon.svg', id: 'appFavicon' },
        { rel: 'alternate icon', type: 'image/png', href: '/assets/crop_logo_mark.png' },
        { rel: 'apple-touch-icon', href: '/assets/crop_logo_mark.png' },
        { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
        { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' },
        {
          rel: 'stylesheet',
          href: 'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap'
        }
      ],
      script: [
        {
          innerHTML: `(function(){try{var s=localStorage.getItem('sheger_theme');if(s==='light'){document.documentElement.removeAttribute('data-theme');}else{document.documentElement.setAttribute('data-theme','dark');}}catch(e){}})();`,
          type: 'text/javascript'
        }
      ]
    }
  },
  css: ['~/assets/css/main.css']
})

