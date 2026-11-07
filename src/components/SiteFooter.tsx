import React from 'react';
import { COUPLE } from '../data/weddingData';

interface Props {
  isHost?: boolean;
  onOpenHost?: () => void;
}

const SiteFooter: React.FC<Props> = ({ isHost, onOpenHost }) => (
  <footer className="site-footer">
    <div className="footer-inner">
      <div className="footer-ganesha-small">ॐ</div>
      <h3 className="footer-names">{COUPLE.groomFirst} &amp; {COUPLE.brideFirst}</h3>
      <p className="footer-date">12 – 14 December 2026 · Surat, Gujarat</p>
      <p className="footer-hashtag">{COUPLE.hashtag}</p>
      <div className="footer-divider" />
      <p className="footer-note">
        Made with <span style={{ color: '#C5A059' }}>♥</span> for our most cherished guests
      </p>
      <p className="footer-copy">© 2026 {COUPLE.groomFirst} &amp; {COUPLE.brideFirst}. All love reserved.</p>
      {isHost && onOpenHost && (
        <div style={{ marginTop: '0.8rem' }}>
          <button
            onClick={onOpenHost}
            className="footer-host-portal-btn"
          >
            🔒 Family Host Portal (Create Invitations)
          </button>
        </div>
      )}
    </div>
  </footer>
);

export default SiteFooter;
