import React, { useRef, useState,useEffect } from "react";
import RiskOverrideTable from "./RiskOverrideTable";
import html2pdf from "html2pdf.js";
import RiskMitigation from "./RiskMitigation";

const Forms = () => {
  const formRef = useRef();
  
  const legalStructureOptions = {
    "Public Listed JSC": 1, "Full / Partial UAE Government owned entity": 1,
    "Public Unlisted JSC": 2, "Sole Establishment": 2, "Financial Freezone": 3,
    "Br. of UAE Company": 3, "Private Joint Stock Company": 3, "Single Person LLC": 3,
    "Br. of Foreign Company": 4, "Other Freezone entity": 4, "Limited Liability Company": 5,
    "Co-Operative Society": 5, "Non-Profit Organization / Licensed Trust / Foundations": 5, "Others": 5,
  };

  const [screeningFindings, setScreeningFindings] = useState([
    { question: "Is there any Domestic PEP match on the Owners / GM / related parties names?", answer: "No", score: 1 },
    { question: "Is there any Foreign PEP match on the Owners / GM / related parties names?", answer: "No", score: 1 },
    { question: "Are there any Red Flags noticed against the company / Owner / BOD / GM / related parties names?", answer: "No", score: 1 },
    { question: "Are there any Owners / BOD / GM names categorized as Very High Net-worth Individual?", answer: "No", score: 1 },
    { question: "Are there a sanction match against other than UAE local list or UNSC consolidated list on the company/ Owners / BOD /GM/ related parties’ names?", answer: "No", score: 1 },
    { question: "Are there a sanction match against UAE local list or UNSC consolidated list on the company/ Owners / BOD /GM/ related parties’ names?", answer: "No", score: 1 },
  ]);

  const [totalRiskScore, setTotalRiskScore] = useState(0);

  // 🔹 Whenever screeningFindings changes, recalculate average
  useEffect(() => {
    const total = screeningFindings.reduce((acc, item) => acc + item.score, 0);
    const avg = (total / screeningFindings.length).toFixed(2);
    setTotalRiskScore(avg);
  }, [screeningFindings]);

  // 🔹 Dropdown change handler
  const handleAnswerChange = (index, value) => {
    const updated = [...screeningFindings];
    updated[index].answer = value;
    updated[index].score = value === "Yes" ? 0 : 1;
    setScreeningFindings(updated);
  };
  
  const businessActivityOptions = {
  "Education, Elementary, Secondary, High and Universities": 1, "Libraries, Archives and Museums": 1,
  "Healthcare activities including Diagnostic Laboratories, Doctors, Health Care Practitioners, Pharmaceuticals and Hospitals/Clinics": 1,
  "Veterinary Clinics and Services": 1, "Water Treatment and Utilities": 1, "Sewage Treatment Facilities": 1,
  "Waste Management and Recycling": 1, "Alternative Energy Sources": 1, "Funeral Homes and Services": 1,
  
  "Agriculture, Fishing, Hunting and Forestry and Logging and related activities": 2,
  "Food and Dairy Product Manufacturing and Packaging": 2, "Manufacturing": 2,
  "Construction Equipment, Supplies, Remodeling, and Building Materials": 2, "Mining and Quarrying": 2,
  "Audio, Video and Photography": 2, "Motion Picture and Recording Producers/Exhibitors": 2, "Music": 2, "Performing Arts": 2,
  "Radio, Television Broadcasting": 2, "Cable and Television Providers": 2, "Telephone Service Providers and Carriers": 2, 
  "IT hardware, Network Services Support and Electronic equipment": 2, "Data and Records Management": 2, "HR, Payroll and Recruiting Services": 2,
  "Facilities Management, Maintenance, Parking Lots and Garage Management": 2, "Warehousing and Storage": 2,
  "Laundry and Dry Cleaning": 2, "Advertising, Marketing and PR": 2, "Call Centers": 2,
  
  "Banking": 3, "Insurance and Risk Management": 3, "Biotechnology": 3,
  "Aerospace, Air Airline/Aircraft, Airport, Harbor, Sea Port and Terminal Operations, Cruise Ship Operations, etc": 3,
  "Automobile and related activities": 3, "Apparel, Accessories, Clothing and Shoe Stores": 3, "Department Stores": 3,
  "Grocery": 3, "Restaurants and Bars": 3, "Retail trade and services": 3, "Amusement Parks and Attractions, Hotels and Resorts": 3,
  "Software Development": 3, "Rental Cars": 3, "Alcoholic Beverages, Beer, Wine and Liquor Stores and related activities": 3, "Others": 3,

  "Consumer Electronics, Parts and Repair": 4, "Machinery and Equipment": 4, "Medical Devices, Supplies and Equipment": 4,
  "Semiconductor and Microchip Manufacturing": 4, "Textiles": 4, "Air Couriers and Cargo Handling Services, Freight Hauling (Rail and Truck)": 4,
  "Transportation, Taxi, Buses, Trucking and Transit Systems": 4, "Travel Agents and Services": 4, "Telecommunications, and Equipment and Accessories": 4,
  "Property Leasing and Management": 4, "Real Estate sector": 4, "Auctions": 4, "Used Cars": 4, "Metal and Mineral Wholesalers": 4,
  "Wholesale Distribution Other": 4, "Newspaper Publishers": 4, "Chemicals and Petrochemicals": 4,
  
  "Adult Entertainment, Entertainment & Leisure, Gambling, Gaming and Casinos": 5, "Jewelry Precious Metal": 5,
  "Accounting, Tax Preparation, and Management Consulting": 5, "Legal practice": 5, "Brokerage": 5,
  "Financial Services, Financial Planning, Private/Investment Banking and Venture Capital": 5, "E-Commerce and Fintech": 5,
  "Payment Service Providers and Related Services": 5, "Trust, Fiduciary, and Custody Activities": 5, "General Trading": 5,
  "Energy and related activities like Oil and Gas exploration": 5, "Defense and related activities": 5,
  "Charitable Organizations and Foundations": 5, "Religious Organizations": 5, "Social and Membership Organizations": 5, "Tobacco": 5,
};

  const [legalStructure, setLegalStructure] = useState([]);
  const [businessActivity, setBusinessActivity] = useState("");
  const [riskTable, setRiskTable] = useState([]);
  const [dualUsage, setDualUsage] = useState({ name: "", score: 0 });

  const [clientRisk, setClientRisk] = useState({
    legalStructure: { name: "", score: "" },
    businessActivity: { name: "", score: "" },
  });

  
  // ---------- Geographic Risk states (new) ----------
  // Fixed example options per your instruction:
  const countryOfIncorpOptions = {
    "None": 0,"Afghanistan": 5,"Aland Islands": 1,"Albania": 4,"Algeria": 5,"American Samoa": 2,"Andorra": 1,"Angola": 5,
    "Anguilla": 3,"Antigua and Barbuda": 4,"Argentina": 3,"Armenia": 3,"Aruba": 3,"Australia": 1,"Austria": 1,"Azerbaijan": 4,
    "Bahamas": 3,"Bahrain": 3,"Bangladesh": 4,"Barbados": 4,"Belarus": 4,"Belgium": 3,"Belize": 4,"Benin": 4,"Bermuda": 1,
    "Bhutan": 3,"Bolivia": 3,"Bonaire, Sint Eustatius and Saba": 2,"Bosnia-Herzegovina": 4,"Botswana": 3,"Brazil": 4,
    "British Indian Ocean Territory": 1,"British Virgin Islands": 4,"Brunei Darussalam": 1,"Bulgaria": 5,"Burkina Faso": 5,"Burundi": 5,
    "Cambodia": 4,"Cameroon": 5,"Canada": 2,"Cape Verde": 3,"Cayman Islands": 3,"Central African Rep": 5,"Chad": 4,"Chile": 3,
    "China": 4,"Christmas Island": 1,"Cocos (Keeling) Islands": 1,"Colombia": 4,"Comoros": 4,"Congo (Brazzaville)": 4,"Congo, the Democratic Republic": 5,
    "Cook Islands": 3,"Costa Rica": 3,"Cote D'Ivoire": 5,"Croatia": 5,"Cuba": 4,"Curacao": 4,"Cyprus": 3,"Czech Republic": 3,"Denmark": 1,
    "Djibouti": 4,"Dominica": 3,"Dominican Republic": 3,"Ecuador": 4,"Egypt": 3,"El Salvador": 4,"Equatorial Guinea": 4,"Eritrea": 5,
    "Estonia": 1,"Eswatini": 4,"Ethiopia": 4,"Falkland Islands (Malvinas)": 1,"Faroe Islands": 1,"Fiji": 3,"Finland": 1,"France": 1,
    "French Guiana": 1,"French Polynesia": 1,"Gabon": 4,"Gambia": 3,"Gaza Strip": 5,"Georgia": 3,"Germany": 1,"Ghana": 3,
    "Gibraltar": 4,"Greece": 3,"Greenland": 1,"Grenada": 3,"Guadeloupe": 1,"Guam": 2,"Guatemala": 4,"Guernsey": 3,"Guinea Bissau": 4,
    "Guyana": 4,"Haiti": 5,"Honduras": 4,"Hong Kong": 4,"Hungary": 3,"Iceland": 1,"India": 3,"Indonesia": 3,"Iran, Islamic Republic of": 5,
    "Iraq": 5,"Ireland": 3,"Isle Of Man": 3,"Israel": 3,"Italy": 3,"Jamaica": 4,"Japan": 1,"Jersey": 1,"Jordan": 3,"Kazakhstan": 3,
    "Kenya": 5,"Kiribati": 4,"Kosovo": 5,"Kuwait": 3,"Kyrgyzstan": 3,"Lao People's Democratic Republic": 5,"Latvia": 3,
    "Lebanon": 5,"Lesotho": 3,"Liberia": 4,"Libya": 5,"Liechtenstein": 1,"Lithuania": 1,"Luxembourg": 1,"Macau": 3,"Madagascar": 3,
    "Malawi": 3,"Malaysia": 3,"Maldives": 4,"Mali": 5,"Malta": 3,"Marshall Islands": 3,"Martinique": 1,"Mauritania": 3,"Mauritius": 3,
    "Mayotte": 1,"Mexico": 4,"Micronesia": 4,"Moldova": 4,"Monaco": 5,"Mongolia": 3,"Montenegro": 4,"Montserrat": 3,"Morocco": 3,
    "Mozambique": 5,"Myanmar": 5,"Namibia": 5,"Nauru": 3,"Nepal": 5,"Netherlands": 3,"New Caledonia": 1,"New Zealand": 1,"Nicaragua": 4,
    "Nigeria": 4,"Niue": 3,"Norfolk Island": 1,"North Korea": 5,"North Macedonia": 4,"North Mariana Islands": 2,"Norway": 1,
    "Oman": 3,"Pakistan": 4,"Palau": 3,"Panama": 5,"Papua New Guinea": 4,"Paraguay": 4,"Peru": 3,"Philippines": 3,"Pitcairn": 1,
    "Poland": 3,"Portugal": 1,"Puerto Rico": 1,"Qatar": 2,"Réunion": 1,"Romania": 3,"Russian Federation": 5,"Rwanda": 3,"Saint Barthélemy": 1,
    "Saint Helena, Ascension and Tristan": 1,"Saint Martin (French part)": 1,"Saint Pierre and Miquelon": 1,"Samoa": 4,"San Marino": 1,
    "Sao Tome & Prin.": 4,"Saudi Arabia": 3,"Senegal": 4,"Serbia": 4,"Seychelles": 4,"Sierra Leone": 4,"Singapore": 3,"Slovakia": 3,
    "Slovenia": 3,"Solomon Islands": 3,"Somalia": 5,"South Africa": 5,"South Korea": 1,"South Sudan": 5,"Spain": 3,"Sri Lanka": 3,
    "St Kitts & Nevis": 4,"St Lucia": 4,"St Maarten": 4,"St Vincent & Gren": 3,"Sudan": 4,"Suriname": 4,"Svalbard and Mayen": 1,"Sweden": 1,
    "Switzerland": 2,"Syria": 5,"Taiwan": 3,"Tajikistan": 4,"Tanzania": 5,"Thailand": 4,"Timor-Leste": 3,"Togo": 4,"Tokelau": 1,
    "Tonga": 3,"Trinidad & Tobago": 4,"Tunisia": 4,"Turkey": 4,"Turkmenistan": 3,"Turks & Caicos": 3,"Tuvalu": 4,"Uganda": 4,
    "Ukraine": 4,"United Arab Emirates": 4,"United Kingdom": 2,"United States": 3,"United States Virgin Islands": 3,"Uruguay": 1,
    "Uzbekistan": 3,"Vanuatu": 4,"Vatican City State (Holy See)": 1,"Venezuela": 5,"Vietnam": 5,"Wallis and Futuna": 1,"West Bank (Palestinian Territory,Occupied)": 5,
    "Western Sahara": 3,"Yemen": 5,"Zambia": 3,"Zimbabwe": 4
  };  

  const subsidiaryOptions = {
    "Yes": 0, // higher risk if Yes (example)
    "No": 1,  // example from screenshot showing "No" -> 1
  };
  const [geoTable, setGeoTable] = useState([]);
  const [geoSelections, setGeoSelections] = useState({
    countryOfIncorporation: { name: "", score: "" },
    nationality: { name: "", score: "" },
    subsidiary: { name: "", score: "" },
  });

  const [geoCountry, setGeoCountry] = useState("");
  const [geoNationality, setGeoNationality] = useState("");
  const [geoSubsidiary, setGeoSubsidiary] = useState("");

  const [servicesRisk, setServicesRisk] = useState([]);
  const [selectedService, setSelectedService] = useState("");
  const serviceOptions = {
    "Free Zones – Incorporation of companies in the UAE": 5,
    "Having companies incorporated by third-party providers (UAE & Abroad)": 5,
    "Acting as nominee directors and/or organising nominee directors": 5,
    "Acting as nominee shareholders (through a nominee company)": 4,
    "Mainland – Incorporation of companies in the UAE": 4,
    "Providing accounting/bookkeeping services": 3,
    "Providing general administration and secretarial services": 2,
    "Providing visa services": 1,
    "Providing general consulting services": 1,
    "Offshore Structure": 5,
    "Offshore Company Formation": 5
  };
  
  const [deliveryRisk, setDeliveryRisk] = useState([]);
  const [deliveryService, setDeliveryService] = useState("");
  const deliveryOptions = {
    "Non-Face to Face": 5,
    "Virtual Meeting (Google Meet, Zoom etc)": 4,
    "Face to Face": 1
  };


  const paymentOptions = {
    "Cheque / Bank Transfer": 1,
    "Max. Bank transfers and Cheque, few cash transactions": 2,
    "Debit Card / Credit Card": 3,
    "Others": 3,
    "Cash (Below AED 55k)": 4,
    "Cash (equal or above AED 55k)": 5,
    "Virtual Currencies / Crypto": 5,
    "E-wallets": 4,
    "Max. Cash, Few cheque and bank transfers transactions": 4
  };

  const [paymentRisk, setPaymentRisk] = useState([]);
  const [paymentMode, setPaymentMode] = useState("");

  const addPaymentRisk = () => {
    if (!paymentMode) return alert("Select a Payment Mode first!");
    const score = paymentOptions[paymentMode];
    const newEntry = { type: "Payment Mode", name: paymentMode, score };
    setPaymentRisk((prev) => [...prev, newEntry]);
    setPaymentMode("");
  };

  const deletePaymentEntry = (index) => {
    setPaymentRisk((prev) => prev.filter((_, i) => i !== index));
  };

  const addDeliveryRisk = () => {
    if (!deliveryService) return alert("Select a Delivery Type first!");
    const score = deliveryOptions[deliveryService];
    const newEntry = { type: "Delivery Type", name: deliveryService, score };
    setDeliveryRisk((prev) => [...prev, newEntry]);
    setDeliveryService("");
  };

  const deleteDeliveryEntry = (index) => {
    setDeliveryRisk((prev) => prev.filter((_, i) => i !== index));
  };
  

  const addServiceRisk = () => {
    if (!selectedService) return alert("Select a Service Type first!");
    const score = serviceOptions[selectedService];
    const newEntry = { type: "Service Type", name: selectedService, score };
    setServicesRisk((prev) => [...prev, newEntry]);
    setSelectedService("");
  };

  const deleteServiceEntry = (index) => {
    setServicesRisk((prev) => prev.filter((_, i) => i !== index));
  };



  // ---------- Add / Delete for Geographic Risk ----------
  const addGeoCountry = () => {
    if (!geoCountry) return alert("Select Country of Incorporation first!");
    const score = countryOfIncorpOptions[geoCountry];
    const newEntry = { type: "Country of Incorporation", name: geoCountry, score };
    setGeoTable((prev) => [...prev, newEntry]);
    setGeoSelections((prev) => ({
      ...prev,
      countryOfIncorporation: { name: geoCountry, score },
    }));
    setGeoCountry("");
  };

  const addGeoNationality = () => {
    if (!geoNationality) return alert("Select Nationality first!");
    const score = countryOfIncorpOptions[geoNationality];
    const newEntry = { type: "Nationality of Owner/Director/POA", name: geoNationality, score };
    setGeoTable((prev) => [...prev, newEntry]);
    setGeoSelections((prev) => ({
      ...prev,
      nationality: { name: geoNationality, score },
    }));
    setGeoNationality("");
  };

  const addGeoSubsidiary = () => {
    if (!geoSubsidiary) return alert("Select Subsidiary Yes/No first!");
    const score = subsidiaryOptions[geoSubsidiary];
    const newEntry = { type: "Subsidiary / FATF question", name: geoSubsidiary, score };
    setGeoTable((prev) => [...prev, newEntry]);
    setGeoSelections((prev) => ({
      ...prev,
      subsidiary: { name: geoSubsidiary, score },
    }));
    setGeoSubsidiary("");
  };

  const deleteGeoEntry = (index) => {
    const entryToDelete = geoTable[index];
    setGeoTable((prev) => prev.filter((_, i) => i !== index));

    if (entryToDelete.type === "Country of Incorporation") {
      setGeoSelections((prev) => ({ ...prev, countryOfIncorporation: { name: "", score: "" } }));
    }
    if (entryToDelete.type === "Nationality of Owner/Director/POA") {
      setGeoSelections((prev) => ({ ...prev, nationality: { name: "", score: "" } }));
    }
    if (entryToDelete.type === "Subsidiary / FATF question") {
      setGeoSelections((prev) => ({ ...prev, subsidiary: { name: "", score: "" } }));
    }
  };
  
   // ---------- ADD LEGAL STRUCTURE ----------
   const addLegalStructure = () => {
    if (!legalStructure) return alert("Select a Legal Structure first!");
    const score = legalStructureOptions[legalStructure];
    const newEntry = { type: "Legal Structure", name: legalStructure, score };
    setRiskTable((prev) => [...prev, newEntry]);
    setClientRisk((prev) => ({
      ...prev,
      legalStructure: { name: legalStructure, score },
    }));
    setLegalStructure("");
  };

  // ---------- ADD BUSINESS ACTIVITY ----------
  const addBusinessActivity = () => {
    if (!businessActivity) return alert("Select a Business Activity first!");
    const score = businessActivityOptions[businessActivity];
    const newEntry = { type: "Business Activity", name: businessActivity, score };
    setRiskTable((prev) => [...prev, newEntry]);
    setClientRisk((prev) => ({
      ...prev,
      businessActivity: { name: businessActivity, score },
    }));
    setBusinessActivity("");
  };
  

  const deleteEntry = (index) => {
    const entryToDelete = riskTable[index];
  
    setRiskTable((prev) => prev.filter((_, i) => i !== index));
  
    // Reset clientRisk if the deleted entry was in the form table
    if (entryToDelete.type === "Legal Structure") {
      setClientRisk((prev) => ({ ...prev, legalStructure: { name: "", score: "" } }));
    }
    if (entryToDelete.type === "Business Activity") {
      setClientRisk((prev) => ({ ...prev, businessActivity: { name: "", score: "" } }));
    }
  };

  const scores = [
    parseFloat(clientRisk.legalStructure.score) || 0,
    parseFloat(clientRisk.businessActivity.score) || 0,
    parseFloat(dualUsage.score) || 0
  ];
  
  const validScores = scores.filter(score => score > 0);
  const totalRisk = validScores.length > 0 ? validScores.reduce((a, b) => a + b, 0) / validScores.length: 0;  

  const geoScores = [
    parseFloat(geoSelections.countryOfIncorporation.score) || 0,
    parseFloat(geoSelections.nationality.score) || 0,
    parseFloat(geoSelections.subsidiary.score) || 0,
  ];
  const geoValid = geoScores.filter((s) => s > 0);
  const geoTotalRisk = geoValid.length > 0 ? geoValid.reduce((a, b) => a + b, 0) / geoValid.length : 0;


  const downloadPDF = () => {
    const element = formRef.current;
    const opt = { margin: 0.5, filename: "Legal_Entity_Risk_Assessment.pdf", image: { type: "jpeg", quality: 0.98 }, html2canvas: { scale: 2, useCORS: true }, jsPDF: { unit: "in", format: "letter", orientation: "portrait" } };
    html2pdf().set(opt).from(element).save();
  };

  return (
    <div style={{ padding: "30px", fontFamily: "Arial, sans-serif" }}>
  {/* -------------------- CLIENT RISK SELECTION -------------------- */}
  <div style={{ border: "2px solid purple", borderRadius: "10px", padding: "20px", marginBottom: "30px", backgroundColor: "#f9f0ff" }}>
    <h2 style={{ color: "purple", textAlign: "center", fontWeight: "bold", marginBottom: "20px" }}>CLIENT RISK SELECTION</h2>

    {/* LEGAL STRUCTURE SECTION */}
    <div style={{ marginBottom: "20px", display: "flex", alignItems: "center", gap: "10px" }}>
      <label style={{ fontWeight: "bold", color: "#333", width: "160px" }}>Legal Structure:</label>
      <select value={legalStructure} onChange={(e) => setLegalStructure(e.target.value)} style={{ padding: "8px", borderRadius: "4px", border: "1px solid #aaa", width: "220px" }}>
        <option value="">-- Select --</option>
        {Object.keys(legalStructureOptions)
          // ✅ Hide only legal structures already added
          .filter((key) =>!riskTable.some((r) => r.name === key && r.type === "Legal Structure"))
          .map((key) => (<option key={key} value={key}>{key}</option>))}
      </select>

      <button onClick={addLegalStructure} style={{backgroundColor: "purple",color: "white",border: "none",padding: "8px 16px",borderRadius: "5px",fontWeight: "bold",cursor: "pointer",}}>
        Add Legal
      </button>
    </div>

    {/* BUSINESS ACTIVITY SECTION */}
    <div style={{ marginBottom: "20px", display: "flex", alignItems: "center", gap: "10px" }}>
      <label style={{ fontWeight: "bold", color: "#333", width: "160px" }}>Business Activity:</label>
      <select
        value={businessActivity}
        onChange={(e) => setBusinessActivity(e.target.value)}
        style={{ padding: "8px", borderRadius: "4px", border: "1px solid #aaa", width: "220px" }}
      >
        <option value="">-- Select --</option>
        {Object.keys(businessActivityOptions)
          // ✅ Hide only business activities already added
          .filter((key) =>!riskTable.some((r) => r.name === key && r.type === "Business Activity"))
          .map((key) => (<option key={key} value={key}>{key}</option>))}
      </select>

      <button onClick={addBusinessActivity} style={{backgroundColor: "purple",color: "white",border: "none",padding: "8px 16px",borderRadius: "5px",fontWeight: "bold",cursor: "pointer",}}>
        Add Activity
      </button>
    </div>

    <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
      <label style={{ fontWeight: "bold", color: "#333", width: "160px" }}>Dual Usage Goods:</label>
      <select value={dualUsage.name} onChange={(e) => { const value = e.target.value; setDualUsage({ name: value, score: value === "No" ? 1 : 0 }); }}
        style={{ padding: "8px", borderRadius: "4px", border: "1px solid #aaa", width: "150px" }}>
        <option value="">-- Select --</option>
        <option value="Yes">Yes</option>
        <option value="No">No</option>
      </select>
    </div>
  </div>

{/* -------------------- GEOGRAPHIC RISK SELECTION (new UI) -------------------- */}
<div style={{ border: "1px dashed #888", padding: "12px", marginBottom: "18px" }}>
          <h3 style={{ margin: "6px 0", color: "#003366", textAlign: "center" }}>GEOGRAPHIC RISK SELECTION</h3>

          <div style={{ display: "flex", gap: "10px", alignItems: "center", marginBottom: "10px" }}>
            <label style={{ width: "210px", fontWeight: "bold" }}>Country of Incorporation:</label>
            <select value={geoCountry} onChange={(e) => setGeoCountry(e.target.value)} style={{ padding: "8px", borderRadius: "4px", border: "1px solid #aaa", width: "260px" }}>
              <option value="">-- Select --</option>
              {Object.keys(countryOfIncorpOptions)
                .filter((key) => !geoTable.some((r) => r.name === key && r.type === "Country of Incorporation"))
                .map((key) => <option key={key} value={key}>{key}</option>)}
            </select>
            <button onClick={addGeoCountry} style={{ backgroundColor: "#005b96", color: "white", padding: "8px 12px", borderRadius: "4px", border: "none", cursor: "pointer" }}>Add Country</button>
          </div>

          <div style={{ display: "flex", gap: "10px", alignItems: "center", marginBottom: "10px" }}>
            <label style={{ width: "210px", fontWeight: "bold" }}>Nationality (Owner/Director/POA):</label>
            <select value={geoNationality} onChange={(e) => setGeoNationality(e.target.value)} style={{ padding: "8px", borderRadius: "4px", border: "1px solid #aaa", width: "260px" }}>
              <option value="">-- Select --</option>
              {Object.keys(countryOfIncorpOptions)
                .filter((key) => !geoTable.some((r) => r.name === key && r.type === "Nationality of Owner/Director/POA"))
                .map((key) => <option key={key} value={key}>{key}</option>)}
            </select>
            <button onClick={addGeoNationality} style={{ backgroundColor: "#005b96", color: "white", padding: "8px 12px", borderRadius: "4px", border: "none", cursor: "pointer" }}>Add Nationality</button>
          </div>

          <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
            <label style={{ width: "210px", fontWeight: "bold" }}>Subsidiary / FATF Call for Action:</label>
            <select value={geoSubsidiary} onChange={(e) => setGeoSubsidiary(e.target.value)} style={{ padding: "8px", borderRadius: "4px", border: "1px solid #aaa", width: "260px" }}>
              <option value="">-- Select --</option>
              {Object.keys(subsidiaryOptions).map((key) => <option key={key} value={key}>{key}</option>)}
            </select>
            <button onClick={addGeoSubsidiary} style={{ backgroundColor: "#005b96", color: "white", padding: "8px 12px", borderRadius: "4px", border: "none", cursor: "pointer" }}>Add Subsidiary</button>
          </div>
        </div>

        <div style={{ border: "1px dashed #888", padding: "12px", marginBottom: "18px" }}>
  <h3 style={{ margin: "6px 0", color: "#880000", textAlign: "center" }}>SERVICES RISK SELECTION</h3>
  
  <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
    <label style={{ width: "210px", fontWeight: "bold" }}>Product / Service Type:</label>
    <select
      value={selectedService}
      onChange={(e) => setSelectedService(e.target.value)}
      style={{ padding: "8px", borderRadius: "4px", border: "1px solid #aaa", width: "260px" }}
    >
      <option value="">-- Select --</option>
      {Object.keys(serviceOptions)
        .filter((key) => !servicesRisk.some((r) => r.name === key))
        .map((key) => (
          <option key={key} value={key}>{key}</option>
        ))}
    </select>
    <button onClick={addServiceRisk} style={{ backgroundColor: "#880000", color: "white", padding: "8px 12px", borderRadius: "4px", border: "none", cursor: "pointer" }}>
      Add Service
    </button>
  </div>
</div>

<div style={{ border: "1px dashed #888", padding: "12px", marginBottom: "18px" }}>
  <h3 style={{ margin: "6px 0", color: "#880000", textAlign: "center" }}>Delivery RISK SELECTION</h3>
  
  <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
    <label style={{ width: "210px", fontWeight: "bold" }}>Delivery Channel:</label>
    <select
      value={deliveryService}
      onChange={(e) => setDeliveryService(e.target.value)}
      style={{ padding: "8px", borderRadius: "4px", border: "1px solid #aaa", width: "260px" }}
    >
      <option value="">-- Select --</option>
      {Object.keys(deliveryOptions)
        .filter((key) => !deliveryRisk.some((r) => r.name === key))
        .map((key) => (
          <option key={key} value={key}>{key}</option>
        ))}
    </select>
    <button onClick={addDeliveryRisk} style={{ backgroundColor: "#880000", color: "white", padding: "8px 12px", borderRadius: "4px", border: "none", cursor: "pointer" }}>
      Add Delivery Channel
    </button>
  </div>
  </div>
  <div style={{ border: "1px dashed #888", padding: "12px", marginBottom: "18px" }}>
      <h3 style={{ margin: "6px 0", color: "#880000", textAlign: "center" }}>PAYMENT RISK SELECTION</h3>
      
      <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
        <label style={{ width: "210px", fontWeight: "bold" }}>Payment Mode:</label>
        <select
          value={paymentMode}
          onChange={(e) => setPaymentMode(e.target.value)}
          style={{ padding: "8px", borderRadius: "4px", border: "1px solid #aaa", width: "400px" }}
        >
          <option value="">-- Select --</option>
          {Object.keys(paymentOptions)
            .filter((key) => !paymentRisk.some((r) => r.name === key))
            .map((key) => (
              <option key={key} value={key}>{key}</option>
            ))}
        </select>
        <button
          onClick={addPaymentRisk}
          style={{ backgroundColor: "#880000", color: "white", padding: "8px 12px", borderRadius: "4px", border: "none", cursor: "pointer" }}
        >
          Add Payment Mode
        </button>
      </div>
  
</div>


  <div style={{ border: "1px solid #000", padding: "30px", width: "750px", backgroundColor: "#fff", margin: "0 auto", marginBottom: "50px" }}>

    <div style={{ backgroundColor: "#003366", color: "white", textAlign: "center", padding: "10px", fontWeight: "bold", marginBottom: "20px" }}>CLIENT RISK TABLE</div>

    {/* -------------------- RISK TABLE -------------------- */}
    <table style={{ width: "100%", borderCollapse: "collapse", textAlign: "center" }}>
      <thead>
        <tr style={{ backgroundColor: "#f0f0f0" }}>
          <th style={{ border: "1px solid #000", padding: "10px", width: "30%" }}>Type</th>
          <th style={{ border: "1px solid #000", padding: "10px", width: "45%" }}>Name</th>
          <th style={{ border: "1px solid #000", padding: "10px", width: "15%" }}>Score</th>
          <th style={{ border: "1px solid #000", padding: "10px", width: "10%" }}>Action</th>
        </tr>
      </thead>
      <tbody>
        {riskTable.length === 0 ? (
          <tr>
            <td colSpan="4" style={{ border: "1px solid #000", padding: "10px", textAlign: "center", color: "#777" }}>No data added yet</td>
          </tr>
        ) : (
          riskTable.map((entry, index) => (
            <tr key={index}>
              <td style={{ border: "1px solid #000", padding: "8px", backgroundColor: entry.type === "Legal Structure" ? "#e8f4ff" : "#fff4e6", fontWeight: "bold" }}>{entry.type}</td>
              <td style={{ border: "1px solid #000", padding: "8px" }}>{entry.name}</td>
              <td style={{ border: "1px solid #000", padding: "8px" }}>{entry.score}</td>
              <td style={{ border: "1px solid #000", padding: "8px" }}>
                <button onClick={() => deleteEntry(index)} style={{ backgroundColor: "red", color: "white", border: "none", padding: "5px 10px", borderRadius: "4px", cursor: "pointer" }}>Delete</button>
              </td>
            </tr>
          ))
        )}
      </tbody>
    </table>
    <div style={{ backgroundColor: "#005b96", color: "white", textAlign: "center", padding: "10px", fontWeight: "bold", marginBottom: "20px" }}>
    GEOGRAPHIC RISK TABLE
  </div>

  <table style={{ width: "100%", borderCollapse: "collapse", textAlign: "center" }}>
    <thead>
      <tr style={{ backgroundColor: "#f0f0f0" }}>
        <th style={{ border: "1px solid #000", padding: "10px", width: "30%" }}>Type</th>
        <th style={{ border: "1px solid #000", padding: "10px", width: "45%" }}>Name</th>
        <th style={{ border: "1px solid #000", padding: "10px", width: "15%" }}>Score</th>
        <th style={{ border: "1px solid #000", padding: "10px", width: "10%" }}>Action</th>
      </tr>
    </thead>

    <tbody>
      {geoTable.length === 0 ? (
        <tr>
          <td colSpan="4" style={{ border: "1px solid #000", padding: "10px", color: "#777", textAlign: "center" }}>
            No data added yet
          </td>
        </tr>
      ) : (
        geoTable.map((entry, index) => (
          <tr key={index}>
            <td
              style={{
                border: "1px solid #000",
                padding: "8px",
                backgroundColor:
                  entry.type === "Country of Incorporation"
                    ? "#e8f4ff"
                    : entry.type === "Nationality of Owner/Director/POA"
                    ? "#fff4e6"
                    : "#f2f9f2",
                fontWeight: "bold",
              }}
            >
              {entry.type}
            </td>
            <td style={{ border: "1px solid #000", padding: "8px" }}>{entry.name}</td>
            <td style={{ border: "1px solid #000", padding: "8px" }}>{entry.score}</td>
            <td style={{ border: "1px solid #000", padding: "8px" }}>
              <button
                onClick={() => deleteGeoEntry(index)}
                style={{
                  backgroundColor: "red",
                  color: "white",
                  border: "none",
                  padding: "5px 10px",
                  borderRadius: "4px",
                  cursor: "pointer",
                }}
              >
                Delete
              </button>
            </td>
          </tr>
        ))
      )}
    </tbody>
  </table>
  <div style={{ backgroundColor: "#880000", color: "white", textAlign: "center", padding: "10px", fontWeight: "bold", marginTop: "30px" }}>
  SERVICES RISK TABLE
</div>

<table style={{ width: "100%", borderCollapse: "collapse", textAlign: "center" }}>
  <thead>
    <tr style={{ backgroundColor: "#f0f0f0" }}>
      <th style={{ border: "1px solid #000", padding: "10px" }}>Type</th>
      <th style={{ border: "1px solid #000", padding: "10px" }}>Name</th>
      <th style={{ border: "1px solid #000", padding: "10px" }}>Score</th>
      <th style={{ border: "1px solid #000", padding: "10px" }}>Action</th>
    </tr>
  </thead>
  <tbody>
    {servicesRisk.length === 0 ? (
      <tr>
        <td colSpan="4" style={{ border: "1px solid #000", padding: "10px", color: "#777" }}>No services added yet</td>
      </tr>
    ) : (
      servicesRisk.map((entry, index) => (
        <tr key={index}>
          <td style={{ border: "1px solid #000", padding: "8px", backgroundColor: "#fff4f4", fontWeight: "bold" }}>{entry.type}</td>
          <td style={{ border: "1px solid #000", padding: "8px" }}>{entry.name}</td>
          <td style={{ border: "1px solid #000", padding: "8px", backgroundColor: "red", color: "white", fontWeight: "bold" }}>{entry.score}</td>
          <td style={{ border: "1px solid #000", padding: "8px" }}>
            <button onClick={() => deleteServiceEntry(index)} style={{ backgroundColor: "red", color: "white", padding: "5px 10px", borderRadius: "4px", cursor: "pointer" }}>
              Delete
            </button>
          </td>
        </tr>
      ))
    )}
  </tbody>
</table>
<div style={{ backgroundColor: "#880000", color: "white", textAlign: "center", padding: "10px", fontWeight: "bold", marginTop: "30px" }}>
  DELIVERY RISK TABLE
</div>

<table style={{ width: "100%", borderCollapse: "collapse", textAlign: "center" }}>
  <thead>
    <tr style={{ backgroundColor: "#f0f0f0" }}>
      <th style={{ border: "1px solid #000", padding: "10px" }}>Type</th>
      <th style={{ border: "1px solid #000", padding: "10px" }}>Name</th>
      <th style={{ border: "1px solid #000", padding: "10px" }}>Score</th>
      <th style={{ border: "1px solid #000", padding: "10px" }}>Action</th>
    </tr>
  </thead>
  <tbody>
    {deliveryRisk.length === 0 ? (
      <tr>
        <td colSpan="4" style={{ border: "1px solid #000", padding: "10px", color: "#777" }}>No delivery added yet</td>
      </tr>
    ) : (
      deliveryRisk.map((entry, index) => (
        <tr key={index}>
          <td style={{ border: "1px solid #000", padding: "8px", backgroundColor: "#fff4f4", fontWeight: "bold" }}>{entry.type}</td>
          <td style={{ border: "1px solid #000", padding: "8px" }}>{entry.name}</td>
          <td style={{ border: "1px solid #000", padding: "8px", backgroundColor: "red", color: "white", fontWeight: "bold" }}>{entry.score}</td>
          <td style={{ border: "1px solid #000", padding: "8px" }}>
            <button onClick={() => deleteDeliveryEntry(index)} style={{ backgroundColor: "red", color: "white", padding: "5px 10px", borderRadius: "4px", cursor: "pointer" }}>
              Delete
            </button>
          </td>
        </tr>
      ))
    )}
  </tbody>
</table>
<div style={{ backgroundColor: "#880000", color: "white", textAlign: "center", padding: "10px", fontWeight: "bold", marginTop: "30px" }}>
        PAYMENT RISK TABLE
      </div>

      <table style={{ width: "100%", borderCollapse: "collapse", textAlign: "center" }}>
        <thead>
          <tr style={{ backgroundColor: "#f0f0f0" }}>
            <th style={{ border: "1px solid #000", padding: "10px" }}>Type</th>
            <th style={{ border: "1px solid #000", padding: "10px" }}>Name</th>
            <th style={{ border: "1px solid #000", padding: "10px" }}>Score</th>
            <th style={{ border: "1px solid #000", padding: "10px" }}>Action</th>
          </tr>
        </thead>
        <tbody>
          {paymentRisk.length === 0 ? (
            <tr>
              <td colSpan="4" style={{ border: "1px solid #000", padding: "10px", color: "#777" }}>No payment mode added yet</td>
            </tr>
          ) : (
            paymentRisk.map((entry, index) => (
              <tr key={index}>
                <td style={{ border: "1px solid #000", padding: "8px", backgroundColor: "#fff4f4", fontWeight: "bold" }}>{entry.type}</td>
                <td style={{ border: "1px solid #000", padding: "8px" }}>{entry.name}</td>
                <td style={{ border: "1px solid #000", padding: "8px", backgroundColor: "red", color: "white", fontWeight: "bold" }}>{entry.score}</td>
                <td style={{ border: "1px solid #000", padding: "8px" }}>
                  <button onClick={() => deletePaymentEntry(index)} style={{ backgroundColor: "red", color: "white", padding: "5px 10px", borderRadius: "4px", cursor: "pointer" }}>
                    Delete
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
  </div>

      {/* -------------------- MAIN FORM -------------------- */}
<div ref={formRef} style={{ border: "1px solid #000", padding: "30px", width: "700px", backgroundColor: "#fff", margin: "0 auto" }}>
  <h2 style={{ textAlign: "center", color: "purple", fontWeight: "bold", fontSize: "20px", marginBottom: "30px" }}>LEGAL ENTITY RISK ASSESSMENT</h2>

  {/* CUSTOMER DETAILS */}
  <div style={{ backgroundColor: "#d3d3d3", textAlign: "center", fontWeight: "bold", padding: "12px", marginBottom: "25px", fontSize: "16px" }}>CUSTOMER DETAILS</div>

  <div style={{ display: "grid", gridTemplateColumns: "200px 1fr", rowGap: "15px", columnGap: "10px", alignItems: "center", marginBottom: "25px"}}>
    {[
      { label: "Customer Name", type: "text" },
      { label: "Date of Onboarding", type: "date" },
      { label: "Customer ID Number", type: "text" },
      { label: "ID Type", type: "text" },
      { label: "ID Issue Date", type: "date" },
      { label: "ID Expiry Date", type: "date" },
    ].map((field, index) => (
      <React.Fragment key={index}>
        <label style={{ backgroundColor: "#daeaff", padding: "10px", fontWeight: "bold", fontSize: "14px" }}>{field.label}</label>
        <input type={field.type} style={{ padding: "10px", fontSize: "14px", border: "1px solid #ccc", borderRadius: "4px" }} />
      </React.Fragment>
    ))}
  </div>

  {/* CUSTOMER RISK TABLE */}
  <h2 style={{ backgroundColor: '#003366', color: 'white', textAlign: 'center', padding: '10px', fontWeight: 'bold' }}>CUSTOMER RISK CALCULATION</h2>

  {/* CLIENT RISK SECTION */}
  <div style={{ backgroundColor: '#e6e6e6', textAlign: 'center', fontWeight: 'bold', padding: '10px', fontSize: '16px', marginTop: '15px' }}>Client Risk</div>

  <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'center' }}>
  <tbody>
    {/* Header Row */}
    <tr>
      <td style={{ backgroundColor: '#f2f2f2', fontWeight: 'bold', border: '1px solid #ccc', padding: '10px', width: '40%' }}>Legal Structure</td>
      <td style={{ backgroundColor: '#f2f2f2', fontWeight: 'bold', border: '1px solid #ccc', padding: '10px', width: '40%' }}>Legal Structure Risk Score</td>
      <td style={{ backgroundColor: '#f2f2f2', fontWeight: 'bold', border: '1px solid #ccc', padding: '10px', width: '20%' }}>Risk Score</td>
    </tr>

    {/* Legal Structures */}
    {riskTable
      .filter(entry => entry.type === "Legal Structure")
      .map((entry, index, arr) => (
        <tr key={`ls-${index}`}>
          <td style={{ border: '1px solid #ccc', padding: '8px', backgroundColor: '#f2f2f2', fontWeight: 'bold' }}>{entry.name}</td>
          <td style={{ border: '1px solid #ccc', padding: '8px', backgroundColor: '#bcd2ee' }}>{entry.score}</td>
          {/* ✅ Show totalRisk only on first row and span all rows (legal + business + dual) */}
          {index === 0 && (
            <td rowSpan={ riskTable.filter(e => e.type === "Legal Structure").length + riskTable.filter(e => e.type === "Business Activity").length + 3 // Dual usage heading + Dual usage value row
              }style={{ backgroundColor: 'yellow', border: '1px solid #ccc', fontWeight: 'bold', fontSize: '18px'}} >
              {totalRisk > 0 ? totalRisk.toFixed(2) : ""}
            </td>
          )}
        </tr>
      ))}
    
    {/* Business Activity Header */}
    <tr>
      <td style={{ backgroundColor: '#f2f2f2', fontWeight: 'bold', border: '1px solid #ccc', padding: '10px' }}>Business Activity</td>
      <td style={{ backgroundColor: '#f2f2f2', fontWeight: 'bold', border: '1px solid #ccc', padding: '10px' }}>Business Activity Risk Score</td>
    </tr>

    {/* Business Activities */}
    {riskTable
      .filter(entry => entry.type === "Business Activity")
      .map((entry, index) => (
        <tr key={`ba-${index}`}>
          <td style={{ border: '1px solid #ccc', padding: '8px', backgroundColor: '#f2f2f2', fontWeight: 'bold' }}>{entry.name}</td>
          <td style={{ border: '1px solid #ccc', padding: '8px', backgroundColor: '#ff9999' }}>{entry.score}</td>
        </tr>
      ))}

    {/* Dual Usage */}
    <tr>
      <td style={{ backgroundColor: '#f2f2f2', fontWeight: 'bold', border: '1px solid #ccc', padding: '10px' }}>
        Does the Client deal in potentially dual usage goods
      </td>
      <td style={{ backgroundColor: '#f2f2f2', fontWeight: 'bold', border: '1px solid #ccc', padding: '10px' }}>
        Dual Usage Risk Score
      </td>
    </tr>
    <tr>
      <td style={{ border: '1px solid #ccc', padding: '8px' }}>
        <input type="text" value={dualUsage.name} readOnly style={{ width: '90%', padding: '6px'}}/>
      </td>
      <td style={{ backgroundColor: '#c7f2c7', border: '1px solid #ccc', padding: '8px' }}>
        <input type="text" value={dualUsage.score} readOnly style={{ width: '60px', textAlign: 'center'}} />
      </td>
    </tr>
  </tbody>
</table>

{/* -------------------- GEOGRAPHIC RISK CALCULATION (new) -------------------- */}
        <h2 style={{ backgroundColor: '#003366', color: 'white', textAlign: 'center', padding: '10px', fontWeight: 'bold', marginTop: '24px' }}>GEOGRAPHIC RISK</h2>

        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'center' }}>
          <tbody>
            <tr>
              <td colSpan={2} style={{ backgroundColor: '#f2f2f2', fontWeight: 'bold', border: '1px solid #ccc', padding: '10px', width: '40%' }}>Country of incorporation</td>
              <td style={{ backgroundColor: '#f2f2f2', fontWeight: 'bold', border: '1px solid #ccc', padding: '10px', width: '40%' }}>Country of incorporation Risk Score</td>
              <td style={{ backgroundColor: '#f2f2f2', fontWeight: 'bold', border: '1px solid #ccc', padding: '10px', width: '20%' }}>Risk Score</td>
            </tr>

            {geoTable
              .filter(entry => entry.type === "Country of Incorporation")
              .map((entry, index) => (
                <tr key={`gc-${index}`}>
                  <td colSpan={2} style={{ border: '1px solid #ccc', padding: '8px', backgroundColor: '#fff', fontWeight: 'bold' }}>{entry.name}</td>
                  <td style={{ border: '1px solid #ccc', padding: '8px', backgroundColor: '#f7d9b6' }}>{entry.score}</td>
                  {index === 0 && (
                    <td rowSpan={
                      geoTable.filter(e => e.type === "Country of Incorporation").length
                      + geoTable.filter(e => e.type === "Nationality of Owner/Director/POA").length
                      + geoTable.filter(e => e.type === "Subsidiary / FATF question").length
                      + 2 // headers/dual rows safety
                    } style={{ backgroundColor: '#8fb4ff', border: '1px solid #ccc', fontWeight: 'bold', fontSize: '18px'}} >
                      {geoTotalRisk > 0 ? geoTotalRisk.toFixed(2) : ""}
                    </td>
                  )}
                </tr>
              ))}

            <tr>
              <td colSpan={2} style={{ backgroundColor: '#f2f2f2', fontWeight: 'bold', border: '1px solid #ccc', padding: '10px' }}>Nationality of Owner / Owner of Director / POA holder</td>
              <td style={{ backgroundColor: '#f2f2f2', fontWeight: 'bold', border: '1px solid #ccc', padding: '10px' }}>Partner Risk Score</td>
            </tr>

            {geoTable
              .filter(entry => entry.type === "Nationality of Owner/Director/POA")
              .map((entry, index) => (
                <tr key={`gn-${index}`}>
                  <td colSpan={2} style={{ border: '1px solid #ccc', padding: '8px', backgroundColor: '#fff', fontWeight: 'bold' }}>{entry.name}</td>
                  <td style={{ border: '1px solid #ccc', padding: '8px', backgroundColor: '#d6f7d6' }}>{entry.score}</td>
                </tr>
              ))}

            {geoTable
              .filter(entry => entry.type === "Subsidiary / FATF question")
              .map((entry, index) => (
                <tr key={`gs-${index}`}>
              <td style={{ backgroundColor: '#f2f2f2', fontWeight: 'bold', border: '1px solid #ccc', padding: '10px' }}>
                Does the company have any subsidiary, affiliate, branch or group/holding company in FATF Call for Action countries or increased monitoring countries?
              </td>
                  <td style={{ border: '1px solid #ccc', padding: '8px', textAlign: 'left', paddingLeft: '12px' }}>{entry.name}</td>
                  <td style={{ border: '1px solid #ccc', padding: '8px', backgroundColor: '#e9f7e9' }}>{entry.score}</td>
                </tr>
              ))}
          </tbody>
        </table>
        <h2 style={{ backgroundColor: '#880000', color: 'white', textAlign: 'center', padding: '10px', fontWeight: 'bold', marginTop: '30px' }}>
          SERVICES RISK
        </h2>

        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'center' }}>
          <thead>
            <tr>
              <th style={{ backgroundColor: '#f2f2f2', fontWeight: 'bold', border: '1px solid #ccc', padding: '10px' }}>Service Type</th>
              <th style={{ backgroundColor: '#f2f2f2', fontWeight: 'bold', border: '1px solid #ccc', padding: '10px' }}>Service Risk Score</th>
            </tr>
          </thead>
          <tbody>
            {servicesRisk.map((entry, index) => (
              <tr key={`sr-${index}`}>
                <td style={{ border: '1px solid #ccc', padding: '8px', fontWeight: 'bold' }}>{entry.name}</td>
                <td style={{ border: '1px solid #ccc', padding: '8px', backgroundColor: '#ffcccc' }}>{entry.score}</td>
              </tr>
            ))}
          </tbody>
        </table>
          <h2 style={{ backgroundColor: '#880000', color: 'white', textAlign: 'center', padding: '10px', fontWeight: 'bold', marginTop: '30px' }}>
            DELIVERY CHANNEL RISK
          </h2>

          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'center' }}>
            <thead>
              <tr>
                <th style={{ backgroundColor: '#f2f2f2', fontWeight: 'bold', border: '1px solid #ccc', padding: '10px' }}>Delivery Channel</th>
                <th style={{ backgroundColor: '#f2f2f2', fontWeight: 'bold', border: '1px solid #ccc', padding: '10px' }}>Delivery Channel Risk Score</th>
              </tr>
            </thead>
            <tbody>
              {deliveryRisk.map((entry, index) => (
                <tr key={`sr-${index}`}>
                  <td style={{ border: '1px solid #ccc', padding: '8px', fontWeight: 'bold' }}>{entry.name}</td>
                  <td style={{ border: '1px solid #ccc', padding: '8px', backgroundColor: '#ffcccc' }}>{entry.score}</td>
                </tr>
              ))}
            </tbody>
          </table>
          {/* SCREENING AND FINDINGS RISK */}
<h2 style={{
  backgroundColor: '#880000',
  color: 'white',
  textAlign: 'center',
  padding: '10px',
  fontWeight: 'bold',
  marginTop: '30px'
}}>
  SCREENING AND FINDINGS RISK
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
              colSpan="2"
              style={{
                backgroundColor: "#f2f2f2",
                border: "1px solid #000",
                padding: "10px",
                fontWeight: "bold",
              }}
            >
              Screening and Due Diligence
            </th>
            <th
              style={{
                backgroundColor: "#f2f2f2",
                border: "1px solid #000",
                padding: "10px",
                fontWeight: "bold",
              }}
            >
              Screening and Due Diligence Risk Score
            </th>
            <th
              style={{
                backgroundColor: "#f2f2f2",
                border: "1px solid #000",
                padding: "10px",
                fontWeight: "bold",
              }}
            >
              Total Risk Score
            </th>
          </tr>
        </thead>

        <tbody>
          {screeningFindings.map((entry, index) => (
            <tr key={`sf-${index}`}>
              <td
                style={{
                  border: "1px solid #000",
                  padding: "8px",
                  textAlign: "left",
                }}
              >
                {entry.question}
              </td>

              <td
                style={{
                  border: "1px solid #000",
                  padding: "8px",
                  backgroundColor: "#e2f0d9",
                }}
              >
                {/* 🔹 Dropdown without arrow */}
                <select
                  value={entry.answer}
                  onChange={(e) => handleAnswerChange(index, e.target.value)}
                  style={{
                    padding: "5px 10px",
                    fontWeight: "bold",
                    appearance: "none", // 👈 removes dropdown arrow (Chrome, Edge, Safari)
                    WebkitAppearance: "none", // 👈 Safari support
                    MozAppearance: "none", // 👈 Firefox support
                    backgroundColor: "#e2f0d9",
                    backgroundImage: "none",
                    outline: "none",
                    cursor: "pointer",
                  }}
                >
                  <option value="No">No</option>
                  <option value="Yes">Yes</option>
                </select>
              </td>

              <td
                style={{
                  border: "1px solid #000",
                  padding: "8px",
                  backgroundColor: "#e2f0d9",
                }}
              >
                {entry.score}
              </td>

              {index === 0 && (
                <td
                  rowSpan={screeningFindings.length}
                  style={{
                    border: "1px solid #000",
                    padding: "10px",
                    fontWeight: "bold",
                    backgroundColor: "#e2f0d9",
                  }}
                >
                  {totalRiskScore}
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
          <h2 style={{ backgroundColor: '#880000', color: 'white', textAlign: 'center', padding: '10px', fontWeight: 'bold', marginTop: '30px' }}>
          PAYMENT MODE RISK
        </h2>

        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'center' }}>
          <thead>
            <tr>
              <th style={{ backgroundColor: '#f2f2f2', fontWeight: 'bold', border: '1px solid #ccc', padding: '10px' }}>Payment Mode</th>
              <th style={{ backgroundColor: '#f2f2f2', fontWeight: 'bold', border: '1px solid #ccc', padding: '10px' }}>Risk Score</th>
            </tr>
          </thead>
          <tbody>
            {paymentRisk.map((entry, index) => (
              <tr key={`pm-${index}`}>
                <td style={{ border: '1px solid #ccc', padding: '8px', fontWeight: 'bold' }}>{entry.name}</td>
                <td style={{ border: '1px solid #ccc', padding: '8px', backgroundColor: '#ffcccc' }}>{entry.score}</td>
              </tr>
            ))}
          </tbody>
        </table>
      {/* MLRO Comments Section */}
      <div style={{border: "2px solid black",marginTop: "40px",padding: "15px",display: "flex",alignItems: "flex-start",justifyContent: "space-between"}}>
        {/* Left label */}
        <div style={{width: "25%",fontWeight: "bold",fontSize: "16px"}}>
          MLRO Comments
        </div>

        {/* Right side - 3 lines for typing comments */}
        <div style={{width: "80%",display: "flex",flexDirection: "column",gap: "15px"}}>
          <textarea placeholder="Enter MLRO comments here..." style={{width: "100%",height: "85px",resize: "none",paddingLeft: "5px",fontSize: "14px",outline: "none"}}/>
        </div>
      </div>

{/* Next Assessment Section */}
<div style={{ border: "2px solid black", marginTop: "30px", padding: "15px" }}>
  <div style={{ display: "flex", alignItems: "center" }}>
    <h3 style={{ marginBottom: "5px",marginTop:"5px" ,fontWeight: "bold" }}>Next Assessment</h3>
    
    {/* Right side text field for next assessment details */}
    <input type="text" placeholder="Enter next assessment details or date" style={{width: "60%",marginLeft:"10px" ,paddingLeft: "15px",fontSize: "14px"}}/>
  </div>

  <div style={{ display: "flex", justifyContent: "space-between", marginTop: "30px" }}>
    {/* Prepared By */}
    <div style={{ width: "48%" }}>
      <p>Prepared By</p>
      <input type="text" placeholder="Enter name" style={{width: "100%",padding: "8px",fontSize: "14px"}}/>
      <div><span anstyle={{ marginTop: "10px" }}>
        Name:
      </span>
      <input type="text" placeholder="Enter name" style={{width: "80%",padding: "8px",fontSize: "14px"}}/>
      </div>
      <div>
      <span style={{ marginTop: "10px" }}>
        MLRO
      </span>
      <input type="text" placeholder="Enter name" style={{width: "80%",marginLeft:"5px",padding: "8px",fontSize: "14px"}}/>
      </div>
    </div>

    {/* Approved By */}
    <div style={{ width: "48%" }}>
      <p>Approved By</p>
      <input type="text" placeholder="Enter name" style={{width: "100%",padding: "8px",fontSize: "14px"}}/>
      <div><span anstyle={{ marginTop: "10px" }}>
        Name:
      </span>
      <input type="text" placeholder="Enter name" style={{width: "80%",padding: "8px",fontSize: "14px"}}/>
      </div>
      <div>
      <span style={{ marginTop: "10px" }}>
        Designation
      </span>
      <input type="text" placeholder="Enter name" style={{width: "60%",marginLeft:"5px",padding: "8px",fontSize: "14px"}}/>
      </div>
    </div>
  </div>
</div>
</div>
<RiskOverrideTable></RiskOverrideTable>
<RiskMitigation></RiskMitigation>
      {/* Download Button */}
      <div style={{ textAlign: "center", marginTop: "30px" }}>
        <button onClick={downloadPDF}
          style={{ padding: "12px 24px",backgroundColor: "purple",color: "white",fontSize: "16px",fontWeight: "bold",border: "none",borderRadius: "4px",cursor: "pointer",}}>
          Download PDF
        </button>
      </div>
    </div>
  );
};

export default Forms;