import React from "react";
import { Link, useLocation } from "react-router-dom";

interface MenuItem {
  path: string;
  label: string;
  icon: string;
}

// Fortgate Logo Component
const FortgateLogo: React.FC = () => (
  <img
    src="/fortgate_logo.png"
    alt="Fortgate Logo"
    style={{ height: '64px', width: 'auto' }}
  />
);

// Stellar Badge Component - Powered by badge
const StellarBadge: React.FC = () => (
  <div style={{
    display: 'flex',
    alignItems: 'center',
    gap: '4px',
    fontSize: '11px',
    color: 'var(--custom-text-secondary)',
    marginLeft: '8px'
  }}>
    {/* <span style={{ fontWeight: 500 }}>Stellar</span> */}
  </div>
);

const Sidebar: React.FC = () => {
  const location = useLocation();

  const menuItems: MenuItem[] = [
    { path: "/dashboard", label: "Dashboard", icon: "📊" },
    { path: "/governance", label: "Políticas de Gobernanza", icon: "📋" },
    { path: "/reports", label: "Reportes", icon: "📈" },
    { path: "/settings", label: "Configuración", icon: "⚙️" },
  ];

  const isActive = (path: string) => {
    if (path === "/governance") {
      return location.pathname === "/" || location.pathname === "/governance";
    }
    return location.pathname.startsWith(path);
  };

  return (
    <aside
      style={{
        width: "280px",
        height: "100vh",
        backgroundColor: "var(--custom-background)",
        borderRight: "1px solid var(--custom-border)",
        display: "flex",
        flexDirection: "column",
        position: "fixed",
        left: 0,
        top: 0,
        zIndex: 100,
      }}
    >
      {/* Logo Section */}
      <div style={{
        padding: "1.5rem 1.5rem 1rem 1.5rem",
        borderBottom: "1px solid var(--custom-border)",
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}>
        <Link to="/governance" style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexWrap: 'wrap',
          gap: '12px',
          textDecoration: 'none',
          color: '#FAFAFA'
        }}>
          <FortgateLogo />
        </Link>
      </div>

      {/* Navigation Menu */}
      <nav style={{ flex: 1, padding: "1rem 0" }}>
        {menuItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "12px",
              padding: "0.875rem 1.5rem",
              textDecoration: "none",
              color: "#FAFAFA",
              backgroundColor: isActive(item.path)
                ? "var(--custom-background-tertiary)"
                : "transparent",
              borderLeft: isActive(item.path) ? "3px solid var(--custom-gray-700)" : "3px solid transparent",
              fontWeight: isActive(item.path) ? 600 : 400,
              fontSize: "14px",
              transition: "all 0.2s ease",
            }}
            onMouseEnter={(e) => {
              if (!isActive(item.path)) {
                e.currentTarget.style.backgroundColor = "var(--custom-background-secondary)";
              }
            }}
            onMouseLeave={(e) => {
              if (!isActive(item.path)) {
                e.currentTarget.style.backgroundColor = "transparent";
              }
            }}
          >
            <span style={{ fontSize: "20px" }}>{item.icon}</span>
            <span>{item.label}</span>
          </Link>
        ))}
      </nav>

      {/* Bottom Section */}
      <div
        style={{
          borderTop: "1px solid var(--custom-border)",
          padding: "1rem 0",
        }}
      >
        {/* Admin User */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "12px",
            padding: "0.875rem 1.5rem",
            color: "#FAFAFA",
            fontSize: "14px",
            cursor: "pointer",
            transition: "all 0.2s ease",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = "var(--custom-background-secondary)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = "transparent";
          }}
        >
          <span style={{ fontSize: "20px" }}>👤</span>
          <span style={{ fontWeight: 500 }}>Admin User</span>
        </div>

        {/* Help/Ayuda */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "12px",
            padding: "0.875rem 1.5rem",
            color: "#FAFAFA",
            fontSize: "14px",
            cursor: "pointer",
            transition: "all 0.2s ease",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = "var(--custom-background-secondary)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = "transparent";
          }}
        >
          <span style={{ fontSize: "20px" }}>❓</span>
          <span style={{ fontWeight: 500 }}>Ayuda</span>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
