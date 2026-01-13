import { useEffect } from 'react';

/**
 * Google AdSense Component
 * @param {string} adSlot - AdSense ad slot ID
 * @param {string} adFormat - Ad format (auto, rectangle, horizontal, vertical)
 * @param {boolean} fullWidthResponsive - Enable full width responsive
 * @param {string} adStyle - Additional inline styles
 */
export default function AdSense({
  adSlot = '',
  adFormat = 'auto',
  fullWidthResponsive = true,
  adStyle = {}
}) {
  useEffect(() => {
    try {
      // Push ad to AdSense
      if (typeof window !== 'undefined' && window.adsbygoogle) {
        (window.adsbygoogle = window.adsbygoogle || []).push({});
      }
    } catch (err) {
      console.error('AdSense error:', err);
    }
  }, []);

  return (
    <div className="adsense-container my-4" style={{ textAlign: 'center', ...adStyle }}>
      <ins
        className="adsbygoogle"
        style={{ display: 'block' }}
        data-ad-client="ca-pub-9250566258923255"
        data-ad-slot={adSlot}
        data-ad-format={adFormat}
        data-full-width-responsive={fullWidthResponsive ? "true" : "false"}
      />
    </div>
  );
}
