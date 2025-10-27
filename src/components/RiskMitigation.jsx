import React, { useState, useEffect } from "react";

const RiskMitigation = () => {
  const [risks, setRisks] = useState([
    { id: 1, factor: "Source of Funds Verification", applicable: "No", score: 0 },
    { id: 2, factor: "Enhanced Due Diligence (EDD)", applicable: "No", score: 0 },
    { id: 3, factor: "Customer Identification and Verification (KYC)", applicable: "No", score: 0 },
    { id: 4, factor: "Ultimate Beneficial Owner Declaration", applicable: "No", score: 0 },
    { id: 5, factor: "Senior Management Approval", applicable: "No", score: 0 },
  ]);

  const handleChange = (index, value) => {
    const updated = [...risks];
    updated[index].applicable = value;
    updated[index].score = value === "Yes" ? 1 : 0;
    setRisks(updated);
  };

  return (
    <div style={{ margin: "20px" }}>
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
            <th style={styles.th}>S.No</th>
            <th style={styles.th}>Risk Override Factors</th>
            <th style={styles.th}>Applicable</th>
            <th style={styles.th}>Override Score</th>
          </tr>
        </thead>

        <tbody>
          {risks.map((r, index) => (
            <tr key={r.id}>
              <td style={styles.tdBold}>{r.id}</td>
              <td style={styles.tdText}>{r.factor}</td>
              <td style={styles.tdSelect}>
                <select
                  value={r.applicable}
                  onChange={(e) => handleChange(index, e.target.value)}
                  style={styles.select}
                >
                  <option value="No">No</option>
                  <option value="Yes">Yes</option>
                </select>
              </td>
              <td style={styles.tdScore}>{r.score}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

// 🎨 Inline styles for Excel-like look
const styles = {
  th: {
    border: "1px solid #000",
    padding: "8px",
    backgroundColor: "#f2f2f2",
    fontWeight: "bold",
  },
  tdBold: {
    border: "1px solid #000",
    padding: "6px",
    fontWeight: "bold",
  },
  tdText: {
    border: "1px solid #000",
    padding: "6px",
    textAlign: "left",
  },
  tdSelect: {
    border: "1px solid #000",
    backgroundColor: "#e2f0d9",
  },
  tdScore: {
    border: "1px solid #000",
    backgroundColor: "#e2f0d9",
  },
  select: {
    padding: "5px",
    fontWeight: "bold",
    appearance: "none",
    WebkitAppearance: "none",
    MozAppearance: "none",
    backgroundColor: "#e2f0d9",
    border: "none",
    outline: "none",
    width: "100%",
    textAlign: "center",
    cursor: "pointer",
  },
  totalLabel: {
    border: "1px solid #000",
    textAlign: "right",
    fontWeight: "bold",
    padding: "8px",
  },
  totalScore: {
    border: "1px solid #000",
    backgroundColor: "#e2f0d9",
    fontWeight: "bold",
  },
};

export default RiskMitigation;