import React from "react";
import ConnectAccount from "./ConnectAccount";

// Fortgate Logo Component
const FortgateLogo: React.FC = () => (
  <img
    src="/fortgate_logo.png"
    alt="Fortgate Logo"
    style={{ height: '32px', width: 'auto' }}
  />
);

// Stellar Logo Component - Powered by badge
const StellarBadge: React.FC = () => (
  <div style={{
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
    fontSize: '14px',
    color: 'var(--color-text-secondary)',
    marginLeft: '16px'
  }}>
    <span>on</span>
    <img
      src="/stellar.png"
      alt="Stellar"
      style={{ height: '18px', width: '18px' }}
    />
    <span style={{ fontWeight: 500 }}>Stellar</span>
  </div>
);

// Custom Header Component
export const CustomHeader: React.FC = () => (
  <div className="Layout__header" style={{
    backgroundColor: 'var(--color-background)',
    borderBottom: '1px solid var(--color-border)'
  }}>
    <div className="Layout__inset">
      <div className="Layout__header--left">
        <a href="/" style={{
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
          textDecoration: 'none',
          color: 'var(--color-text-primary)'
        }}>
          {/* Main Logo - Fortgate */}
          <FortgateLogo />
          <span style={{ fontSize: '32px', fontWeight: 600, color: 'var(--color-text-primary)' }}>Fortgate</span>

          {/* Stellar Badge - "on Stellar" */}
          <StellarBadge />
        </a>
      </div>
      <div className="Layout__header--right">
        <ConnectAccount />
      </div>
    </div>
  </div>
);
