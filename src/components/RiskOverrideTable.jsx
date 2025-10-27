import React, { useState, useEffect } from "react";

const RiskOverrideTable = () => {
  const [overrideFactors, setOverrideFactors] = useState([
    { id: 1, factor: "Suspicious Transaction (or) Suspicious Activity Identified", applicable: "No", score: 0 },
    { id: 2, factor: "Customers who fail to provide clear and verifiable documentation for the source of funds", applicable: "No", score: 0 },
    { id: 3, factor: "Customers controlled by third parties (e.g., gatekeepers like accountants or lawyers)", applicable: "No", score: 0 },
    { id: 4, factor: "Buyers using large amounts of cash for property purchases", applicable: "No", score: 0 },
    { id: 5, factor: "Customer failed to Disclose Beneficial Ownership", applicable: "No", score: 0 },
    { id: 6, factor: "Larger or irregular transactions which pose higher risks", applicable: "No", score: 0 },
    { id: 7, factor: "Customers engaging in frequent property flipping or resale shortly after purchase may be attempting to layer illicit funds", applicable: "No", score: 0 },
    { id: 8, factor: "Transactions involving unconventional payment methods (e.g., third-party, cryptocurrency, complex financing)", applicable: "No", score: 0 },
    { id: 9, factor: "Buyers and sellers colluding to create legitimate transactions may hide proceeds of crime", applicable: "No", score: 0 },
    { id: 10, factor: "Transactions involving mismatched property prices or manipulated valuations", applicable: "No", score: 0 },
  ]);
  // 🔹 Handle change for dropdown
  const handleApplicableChange = (index, value) => {
    const updated = [...overrideFactors];
    updated[index].applicable = value;
    updated[index].score = value === "Yes" ? 1 : 0;
    setOverrideFactors(updated);
  };

  return (
    <div>
      <h2
        style={{
          backgroundColor: "#880000",
          color: "white",
          textAlign: "center",
          padding: "10px",
          fontWeight: "bold",
          marginTop: "30px",
        }}
      >
        NATURAL PERSON RISK OVERRIDE FACTORS
      </h2>

      <table
        style={{
          width: "100%",
          borderCollapse: "collapse",
          textAlign: "center",
        }}
      >
        <thead>
          <tr>
            <th
              style={{
                backgroundColor: "#f2f2f2",
                border: "1px solid #000",
                padding: "8px",
                fontWeight: "bold",
                width: "5%",
              }}
            >
              S.No
            </th>
            <th
              style={{
                backgroundColor: "#f2f2f2",
                border: "1px solid #000",
                padding: "8px",
                fontWeight: "bold",
                width: "70%",
              }}
            >
              Risk Override Factors
            </th>
            <th
              style={{
                backgroundColor: "#f2f2f2",
                border: "1px solid #000",
                padding: "8px",
                fontWeight: "bold",
                width: "10%",
              }}
            >
              Applicable
            </th>
            <th
              style={{
                backgroundColor: "#f2f2f2",
                border: "1px solid #000",
                padding: "8px",
                fontWeight: "bold",
                width: "10%",
              }}
            >
              Override Score
            </th>
          </tr>
        </thead>

        <tbody>
          {overrideFactors.map((item, index) => (
            <tr key={item.id}>
              <td
                style={{
                  border: "1px solid #000",
                  padding: "6px",
                  fontWeight: "bold",
                }}
              >
                {item.id}
              </td>

              <td
                style={{
                  border: "1px solid #000",
                  padding: "6px",
                  textAlign: "left",
                }}
              >
                {item.factor}
              </td>

              <td
                style={{
                  border: "1px solid #000",
                  padding: "6px",
                  backgroundColor: "#e2f0d9",
                }}
              >
                {/* ✅ Dropdown (default No, arrow hidden) */}
                <select
                  value={item.applicable}
                  onChange={(e) =>
                    handleApplicableChange(index, e.target.value)
                  }
                  style={{
                    padding: "5px 10px",
                    fontWeight: "bold",
                    appearance: "none",
                    WebkitAppearance: "none",
                    MozAppearance: "none",
                    backgroundColor: "#e2f0d9",
                    border: "none",
                    outline: "none",
                    cursor: "pointer",
                    textAlign: "center",
                  }}
                >
                  <option value="No">No</option>
                  <option value="Yes">Yes</option>
                </select>
              </td>

              <td
                style={{
                  border: "1px solid #000",
                  padding: "6px",
                  backgroundColor: "#e2f0d9",
                }}
              >
                {item.score}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default RiskOverrideTable;