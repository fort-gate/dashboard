import React from "react";
import { Layout, Card } from "@stellar/design-system";

const Reports: React.FC = () => {
  return (
    <Layout.Content>
      <Layout.Inset>
        <h1 style={{ fontSize: "24px", fontWeight: 600, color: "var(--custom-text-primary)", marginBottom: "1.5rem" }}>
          Reportes
        </h1>
        <Card variant="primary">
          <div style={{
            padding: "3rem",
            textAlign: "center",
            color: "var(--custom-text-secondary)"
          }}>
            <div style={{ fontSize: "48px", marginBottom: "1rem" }}>📈</div>
            <h2 style={{
              fontSize: "20px",
              fontWeight: 600,
              color: "var(--custom-text-primary)",
              marginBottom: "0.5rem"
            }}>
              Próximamente
            </h2>
            <p style={{ fontSize: "14px" }}>
              Esta sección estará disponible pronto.
            </p>
          </div>
        </Card>
      </Layout.Inset>
    </Layout.Content>
  );
};

export default Reports;
