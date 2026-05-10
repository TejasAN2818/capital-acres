import { useState } from "react";

import plots from "./data/Plots";
import apartments from "./data/Apartments";
import villas from "./data/Villas";

const properties = [...plots, ...apartments, ...villas];

export default function App() {
  const [typeFilter, setTypeFilter] = useState("All");
  const [locationFilter, setLocationFilter] = useState("All");
  const [priceFilter, setPriceFilter] = useState("All");

  // Filter Properties
  const filteredProperties = properties.filter((property) => {
    const matchType =
      typeFilter === "All" || property.type === typeFilter;

    const matchLocation =
      locationFilter === "All" ||
      property.location === locationFilter;

    const matchPrice =
      priceFilter === "All" || property.price === priceFilter;

    return matchType && matchLocation && matchPrice;
  });

  // Render Property Section
  const renderSection = (title) => {
    const items = filteredProperties.filter(
      (property) => property.type === title
    );

    if (items.length === 0) return null;

    // If single type selected show vertical
    const isSingleView = typeFilter !== "All";

    return (
      <div className="section">
        <h2>{title}s</h2>

        <div className={isSingleView ? "cards-grid" : "cards-row"}>
          {items.map((property) => (
            <div className="card" key={property.id}>
              <img src={property.image} alt={property.title} />

              <div className="card-content">
                <h3>{property.title}</h3>

                <p className="location">{property.location}</p>

                <p className="price">{property.price}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <>
      {/* Header */}
      <div className="header">CAPITAL ACRES</div>

      {/* Property Type Buttons */}
      <div className="type-buttons">
        <button
          className={typeFilter === "Plot" ? "active" : ""}
          onClick={() =>
            setTypeFilter(
              typeFilter === "Plot" ? "All" : "Plot"
            )
          }
        >
          Plots
        </button>

        <button
          className={typeFilter === "Apartment" ? "active" : ""}
          onClick={() =>
            setTypeFilter(
              typeFilter === "Apartment"
                ? "All"
                : "Apartment"
            )
          }
        >
          Apartments
        </button>

        <button
          className={typeFilter === "Villa" ? "active" : ""}
          onClick={() =>
            setTypeFilter(
              typeFilter === "Villa" ? "All" : "Villa"
            )
          }
        >
          Villas
        </button>
      </div>

      {/* Filters */}
      <div className="filters">
        <select
          onChange={(e) =>
            setLocationFilter(e.target.value)
          }
        >
          <option value="All">All Locations</option>
          <option value="Bangalore">Bangalore</option>
          <option value="Mysore">Mysore</option>
          <option value="Hyderabad">Hyderabad</option>
          <option value="Chennai">Chennai</option>
        </select>

        <select
          onChange={(e) =>
            setPriceFilter(e.target.value)
          }
        >
          <option value="All">All Prices</option>
          <option value="35L">35L</option>
          <option value="50L">50L</option>
          <option value="85L">85L</option>
          <option value="1Cr">1Cr</option>
          <option value="1.8Cr">1.8Cr</option>
          <option value="2Cr">2Cr</option>
          <option value="2.5Cr">2.5Cr</option>
        </select>
      </div>

      {/* Sections */}
      {(typeFilter === "All" || typeFilter === "Plot") &&
        renderSection("Plot")}

      {(typeFilter === "All" ||
        typeFilter === "Apartment") &&
        renderSection("Apartment")}

      {(typeFilter === "All" || typeFilter === "Villa") &&
        renderSection("Villa")}
    </>
  );
}