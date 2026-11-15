(() => {
  'use strict';
  const config = window.CONTACT_PAGE || {};
  document.title = config.title || 'Contact us';
  if (config.backgroundImage) {
    try {
      const image = new URL(config.backgroundImage, location.href);
      if (['https:', 'http:'].includes(image.protocol)) {
        document.querySelector('.backdrop').style.backgroundImage = `url(${JSON.stringify(image.href)})`;
      }
    } catch (_) { /* Keep the built-in gradient if the image URL is invalid. */ }
  }
  const link = document.querySelector('#contact-link');
  let destination;
  try {
    const url = new URL(config.whatsappUrl);
    if (url.protocol === 'https:' && ['wa.me', 'api.whatsapp.com'].includes(url.hostname) && url.pathname !== '/') {
      if (config.message) url.searchParams.set('text', config.message);
      destination = url.href;
    }
  } catch (_) { /* Missing destination is a preview state, never a third-party contact. */ }
  if (destination) {
    link.href = destination;
    link.rel = 'noopener noreferrer';
  } else {
    document.querySelector('#setup').hidden = false;
    link.addEventListener('click', event => {
      event.preventDefault();
      document.querySelector('#setup').focus();
    });
  }
  // Do not prevent touchstart, contextmenu or pointerdown: iOS owns link previews.
  const ua = navigator.userAgent;
  const androidInApp = /Android/i.test(ua) && /TikTok|musical_ly|Bytedance|Instagram|FBAN|FBAV/i.test(ua);
  document.querySelector('.browser-help').hidden = !androidInApp;
})();
