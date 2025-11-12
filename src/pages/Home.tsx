import React, { useState, useEffect } from "react";
import { Layout, Card, Input } from "@stellar/design-system";
import checkerContract from "../contracts/checker";
import { Box } from "../components/layout/Box";
import { useWallet } from "../hooks/useWallet";

interface Policy {
  protocol: string;
  policyId: string;
  policyValue: string;
  policyDescription: string;
}

const Home: React.FC = () => {
  const { signTransaction, address } = useWallet();
  const [policies, setPolicies] = useState<Policy[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedProtocol, setSelectedProtocol] = useState("");
  const [selectedPolicyType, setSelectedPolicyType] = useState("");
  const [policyValue, setPolicyValue] = useState("");
  const [isUpdating, setIsUpdating] = useState(false);

  useEffect(() => {
    const fetchPolicyData = async () => {
      try {
        setIsLoading(true);
        setError(null);

        // Llamar al contrato con el protocolo hardcodeado "test_protocol"
        const result = await checkerContract.get_policy({
          protocol_id: "test_protocol",
        });

        // Extraer el valor i128 del resultado
        // El resultado viene en: result.simulation.result.retval._value.lo
        // @ts-ignore - Complex nested type from contract simulation
        const policyValue = ((result?.simulation?.result?.retval?._value?._attributes?.lo?._value?.toString() || "0") / 10000000).toString();

        // Crear la política con datos hardcodeados excepto el valor
        const policy: Policy = {
          protocol: "Blend",
          policyId: "1",
          policyValue: policyValue,
          policyDescription: "Max amount",
        };

        setPolicies([policy]);
      } catch (err) {
        console.error("Error fetching policy:", err);
        setError(
          err instanceof Error ? err.message : "Failed to fetch policy data"
        );
      } finally {
        setIsLoading(false);
      }
    };

    void fetchPolicyData();
  }, []);

  const handleUpdatePolicy = async () => {
    try {
      setIsUpdating(true);
      setError(null);

      const valueToSend = Math.round(parseFloat(policyValue) * 10000000);

      console.log("policyValue", policyValue);
      console.log("valueToSend", valueToSend);

      // Create a new contract instance with the user's public key
      // @ts-ignore - Contract constructor type inference issue
      const contractWithUser = new checkerContract.constructor({
        ...checkerContract.options,
        publicKey: address,
      });

      const tx = await contractWithUser.create_policy({
        protocol_id: "test_protocol",
        max_amount: BigInt(valueToSend),
      });

      await tx.signAndSend({ signTransaction });

      setIsEditModalOpen(false);

      // Refetch policies to update the UI
      const result = await checkerContract.get_policy({
        protocol_id: "test_protocol",
      });

      // @ts-ignore - Complex nested type from contract simulation
      const updatedPolicyValue = ((result?.simulation?.result?.retval?._value?._attributes?.lo?._value?.toString() || "0") / 10000000).toString();

      const policy: Policy = {
        protocol: "Blend",
        policyId: "1",
        policyValue: updatedPolicyValue,
        policyDescription: "Max amount",
      };

      setPolicies([policy]);
    } catch (err) {
      console.error("Error updating policy:", err);
      setError(
        err instanceof Error ? err.message : "Failed to update policy"
      );
    } finally {
      setIsUpdating(false);
    }
  };

  return (
    <Layout.Content>
      <Layout.Inset>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.5rem" }}>
          <h1 style={{ fontSize: "24px", fontWeight: 600, color: "var(--custom-text-primary)" }}>Policies</h1>
          <button
            onClick={() => setIsEditModalOpen(true)}
            style={{
              padding: "0.625rem 1.25rem",
              fontSize: "14px",
              fontWeight: 600,
              backgroundColor: "var(--custom-gray-800)",
              color: "#ffffff",
              border: "1px solid var(--custom-gray-700)",
              borderRadius: "6px",
              cursor: "pointer",
              transition: "all 0.2s ease",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = "var(--custom-gray-700)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = "var(--custom-gray-800)";
            }}
          >
            Edit Policy
          </button>
        </div>

        {isLoading && <p style={{ color: "var(--custom-text-secondary)" }}>Loading policies...</p>}

        {error && (
          <Card variant="primary">
            <p style={{ color: "#ef4444" }}>Error: {error}</p>
          </Card>
        )}

        {!isLoading && !error && policies.length > 0 && (
          <Box gap="md">
            <Card variant="primary">
              <table
                style={{
                  width: "100%",
                  borderCollapse: "collapse",
                }}
              >
                <thead>
                  <tr
                    style={{
                      borderBottom: "2px solid var(--custom-border)",
                      backgroundColor: "var(--custom-background-tertiary)",
                    }}
                  >
                    <th
                      style={{
                        textAlign: "left",
                        padding: "1rem",
                        fontWeight: "bold",
                        fontSize: "14px",
                        color: "var(--custom-text-secondary)",
                      }}
                    >
                      PROTOCOL
                    </th>
                    <th
                      style={{
                        textAlign: "left",
                        padding: "1rem",
                        fontWeight: "bold",
                        fontSize: "14px",
                        color: "var(--custom-text-secondary)",
                      }}
                    >
                      POLICY ID
                    </th>
                    <th
                      style={{
                        textAlign: "left",
                        padding: "1rem",
                        fontWeight: "bold",
                        fontSize: "14px",
                        color: "var(--custom-text-secondary)",
                      }}
                    >
                      POLICY VALUE
                    </th>
                    <th
                      style={{
                        textAlign: "left",
                        padding: "1rem",
                        fontWeight: "bold",
                        fontSize: "14px",
                        color: "var(--custom-text-secondary)",
                      }}
                    >
                      POLICY DESCRIPTION
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {policies.map((policy, index) => (
                    <tr
                      key={index}
                      style={{
                        borderBottom: "1px solid var(--custom-border)",
                        backgroundColor: index % 2 === 0 ? "var(--custom-background)" : "var(--custom-background-secondary)",
                      }}
                    >
                      <td style={{ padding: "1rem", color: "var(--custom-text-primary)" }}>{policy.protocol}</td>
                      <td style={{ padding: "1rem", color: "var(--custom-text-primary)" }}>{policy.policyId}</td>
                      <td style={{ padding: "1rem", color: "var(--custom-text-primary)", fontWeight: 500 }}>{policy.policyValue} XLM</td>
                      <td style={{ padding: "1rem", color: "var(--custom-text-secondary)" }}>
                        {policy.policyDescription}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </Card>
          </Box>
        )}

        {!isLoading && !error && policies.length === 0 && (
          <p style={{ color: "var(--custom-text-secondary)" }}>No policies found.</p>
        )}

        {/* Edit Policy Modal */}
        {isEditModalOpen && (
          <div
            style={{
              position: "fixed",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundColor: "rgba(17, 24, 39, 0.7)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              zIndex: 1000,
            }}
            onClick={() => setIsEditModalOpen(false)}
          >
            <div
              style={{
                maxWidth: "500px",
                width: "90%",
                padding: "2rem",
                backgroundColor: "var(--custom-background)",
                borderRadius: "12px",
                border: "1px solid var(--custom-border)",
                boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
              }}
              onClick={(e) => e.stopPropagation()}
            >
              <Card variant="primary" noPadding>
              <div style={{ padding: "2rem" }}>
              <h2 style={{ marginTop: 0, color: "var(--custom-text-primary)", fontSize: "20px", fontWeight: 600 }}>Edit Policy</h2>

              <div style={{ marginBottom: "1.5rem" }}>
                <label
                  style={{
                    display: "block",
                    marginBottom: "0.5rem",
                    fontWeight: 600,
                    fontSize: "14px",
                    color: "var(--custom-text-primary)",
                  }}
                >
                  Protocol
                </label>
                <select
                  value={selectedProtocol}
                  onChange={(e) => setSelectedProtocol(e.target.value)}
                  onClick={(e) => e.stopPropagation()}
                  style={{
                    width: "100%",
                    padding: "0.75rem",
                    borderRadius: "6px",
                    border: "1px solid var(--custom-border)",
                    backgroundColor: "var(--custom-background)",
                    color: "var(--custom-text-primary)",
                    fontSize: "14px",
                  }}
                >
                  <option value="" disabled>
                    Select a protocol
                  </option>
                  <option value="Blend">Blend</option>
                  <option value="Soroswap" disabled>
                    Soroswap
                  </option>
                </select>
              </div>

              <div style={{ marginBottom: "1.5rem" }}>
                <label
                  style={{
                    display: "block",
                    marginBottom: "0.5rem",
                    fontWeight: 600,
                    fontSize: "14px",
                    color: "var(--custom-text-primary)",
                  }}
                >
                  Policy
                </label>
                <select
                  value={selectedPolicyType}
                  onChange={(e) => setSelectedPolicyType(e.target.value)}
                  onClick={(e) => e.stopPropagation()}
                  style={{
                    width: "100%",
                    padding: "0.75rem",
                    borderRadius: "6px",
                    border: "1px solid var(--custom-border)",
                    backgroundColor: "var(--custom-background)",
                    color: "var(--custom-text-primary)",
                    fontSize: "14px",
                  }}
                >
                  <option value="" disabled>
                    Select a policy
                  </option>
                  <option value="Max Amount">Max Amount</option>
                  <option value="Min Amount" disabled>
                    Min Amount
                  </option>
                  <option value="Min Period" disabled>
                    Min Period
                  </option>
                  <option value="Max Period" disabled>
                    Max Period
                  </option>
                  <option value="Min Balance" disabled>
                    Min Balance
                  </option>
                  <option value="Max Balance" disabled>
                    Max Balance
                  </option>
                  <option value="Allowed Tokens" disabled>
                    Allowed Tokens
                  </option>
                </select>
              </div>

              <div style={{ marginBottom: "1.5rem" }}>
                <label
                  style={{
                    display: "block",
                    marginBottom: "0.5rem",
                    fontWeight: 600,
                    fontSize: "14px",
                    color: "var(--custom-text-primary)",
                  }}
                >
                  Value (XLM)
                </label>
                <Input
                  id="policyValue"
                  fieldSize="md"
                  type="number"
                  value={policyValue}
                  onChange={(e) => setPolicyValue(e.target.value)}
                  onClick={(e) => e.stopPropagation()}
                  placeholder="Enter policy value in XLM"
                />
              </div>

              <div
                style={{
                  display: "flex",
                  gap: "1rem",
                  justifyContent: "flex-end",
                }}
              >
                <button
                  onClick={() => setIsEditModalOpen(false)}
                  disabled={isUpdating}
                  style={{
                    padding: "0.625rem 1.25rem",
                    fontSize: "14px",
                    fontWeight: 600,
                    backgroundColor: "var(--custom-background)",
                    color: "var(--custom-text-primary)",
                    border: "1px solid var(--custom-border)",
                    borderRadius: "6px",
                    cursor: isUpdating ? "not-allowed" : "pointer",
                    opacity: isUpdating ? 0.5 : 1,
                    transition: "all 0.2s ease",
                  }}
                  onMouseEnter={(e) => {
                    if (!isUpdating) {
                      e.currentTarget.style.backgroundColor = "var(--custom-background-tertiary)";
                    }
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = "var(--custom-background)";
                  }}
                >
                  Cancel
                </button>
                <button
                  onClick={handleUpdatePolicy}
                  disabled={isUpdating || !policyValue || !selectedProtocol || !selectedPolicyType}
                  style={{
                    padding: "0.625rem 1.25rem",
                    fontSize: "14px",
                    fontWeight: 600,
                    backgroundColor: "var(--custom-gray-800)",
                    color: "#ffffff",
                    border: "1px solid var(--custom-gray-700)",
                    borderRadius: "6px",
                    cursor: (isUpdating || !policyValue || !selectedProtocol || !selectedPolicyType) ? "not-allowed" : "pointer",
                    opacity: (isUpdating || !policyValue || !selectedProtocol || !selectedPolicyType) ? 0.5 : 1,
                    transition: "all 0.2s ease",
                  }}
                  onMouseEnter={(e) => {
                    if (!isUpdating && policyValue && selectedProtocol && selectedPolicyType) {
                      e.currentTarget.style.backgroundColor = "var(--custom-gray-700)";
                    }
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = "var(--custom-gray-800)";
                  }}
                >
                  {isUpdating ? "Updating..." : "Update Policy"}
                </button>
              </div>
              </div>
              </Card>
            </div>
          </div>
        )}
      </Layout.Inset>
    </Layout.Content>
  );
};

export default Home;
