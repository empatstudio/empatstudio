const measurementId = document.querySelector('meta[name="ga4-measurement-id"]')?.content;
const banner = document.querySelector('[data-analytics-consent]');
const settingsButton = document.querySelector('[data-analytics-settings]');
const consentKey = 'empat-ga4-consent';

if (measurementId && banner && /^G-[A-Z0-9]+$/.test(measurementId)) {
  let openedFromSettings = false;
  const readConsent = () => {
    try { return localStorage.getItem(consentKey); } catch { return null; }
  };
  const saveConsent = (value) => {
    try { localStorage.setItem(consentKey, value); } catch { /* Private browsing may block storage. */ }
  };
  const loadAnalytics = () => {
    if (document.querySelector('[data-ga4-script]')) return;
    window.dataLayer = window.dataLayer || [];
    window.gtag = function () { window.dataLayer.push(arguments); };
    window.gtag('consent', 'default', {
      analytics_storage: 'granted',
      ad_storage: 'denied',
      ad_user_data: 'denied',
      ad_personalization: 'denied'
    });
    window.gtag('js', new Date());
    window.gtag('config', measurementId);

    const script = document.createElement('script');
    script.async = true;
    script.dataset.ga4Script = '';
    script.src = `https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(measurementId)}`;
    document.head.append(script);
  };

  if (readConsent() === 'accepted') loadAnalytics();
  else if (readConsent() !== 'declined') banner.hidden = false;

  banner.querySelector('[data-analytics-accept]')?.addEventListener('click', () => {
    saveConsent('accepted');
    banner.hidden = true;
    loadAnalytics();
    if (openedFromSettings) settingsButton?.focus();
    openedFromSettings = false;
  });
  banner.querySelector('[data-analytics-decline]')?.addEventListener('click', () => {
    const previouslyAccepted = readConsent() === 'accepted';
    saveConsent('declined');
    banner.hidden = true;
    if (previouslyAccepted) window.location.reload();
    else if (openedFromSettings) settingsButton?.focus();
    openedFromSettings = false;
  });
  settingsButton?.addEventListener('click', () => {
    openedFromSettings = true;
    banner.hidden = false;
    banner.querySelector('[data-analytics-accept]')?.focus();
  });
}
