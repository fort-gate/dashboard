import React from "react";
import ConnectAccount from "./ConnectAccount";

// Custom Header Component
export const CustomHeader: React.FC = () => (
  <div className="Layout__header" style={{
    backgroundColor: 'var(--color-background)',
    borderBottom: '1px solid var(--color-border)'
  }}>
    <div className="Layout__inset">
      <div className="Layout__header--left">
        {/* Empty space - logo is now in sidebar */}
      </div>
      <div className="Layout__header--right">
        <ConnectAccount />
      </div>
    </div>
  </div>
);
