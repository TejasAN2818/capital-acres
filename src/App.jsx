import { useState } from "react";

import plots from "./data/Plots";
import apartments from "./data/Apartments";
import villas from "./data/Villas";

import PropertyCard from "./components/PropertyCard";

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

  // Render Property Sections
  const renderSection = (title) => {
    const items = filteredProperties.filter(
      (property) => property.type === title
    );

    if (items.length === 0) return null;

    const isSingleView = typeFilter !== "All";

    return (
      <div className="px-4 md:px-8 py-8">
        
        {/* Section Heading */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-3xl font-bold text-slate-800">
            {title}s
          </h2>

          <p className="text-gray-500">
            {items.length} Properties
          </p>
        </div>

        {/* Cards */}
        <div
          className={
            isSingleView
              ? "grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6"
              : "flex gap-6 overflow-x-auto pb-4"
          }
        >
          {items.map((property) => (
            <PropertyCard
              key={property.id}
              property={property}
            />
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-slate-100">

      {/* Header */}
      <header className="bg-slate-900 text-white shadow-lg sticky top-0 z-50">

        <div className="max-w-7xl mx-auto px-4 py-5 flex flex-col md:flex-row items-center justify-between">

          <h1 className="text-4xl font-extrabold tracking-wide">
            CAPITAL ACRES
          </h1>

          <p className="text-slate-300 mt-2 md:mt-0">
            Premium Plots • Apartments • Villas
          </p>

        </div>

      </header>

      {/* Type Buttons */}
      <div className="bg-white shadow-sm">

        <div className="max-w-7xl mx-auto px-4 py-5 flex flex-wrap justify-center gap-4">

          <button
            className={`px-6 py-3 rounded-xl font-semibold transition duration-300 ${
              typeFilter === "Plot"
                ? "bg-slate-900 text-white shadow-lg"
                : "bg-slate-200 hover:bg-slate-300"
            }`}
            onClick={() =>
              setTypeFilter(
                typeFilter === "Plot"
                  ? "All"
                  : "Plot"
              )
            }
          >
            Plots
          </button>

          <button
            className={`px-6 py-3 rounded-xl font-semibold transition duration-300 ${
              typeFilter === "Apartment"
                ? "bg-slate-900 text-white shadow-lg"
                : "bg-slate-200 hover:bg-slate-300"
            }`}
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
            className={`px-6 py-3 rounded-xl font-semibold transition duration-300 ${
              typeFilter === "Villa"
                ? "bg-slate-900 text-white shadow-lg"
                : "bg-slate-200 hover:bg-slate-300"
            }`}
            onClick={() =>
              setTypeFilter(
                typeFilter === "Villa"
                  ? "All"
                  : "Villa"
              )
            }
          >
            Villas
          </button>

        </div>

      </div>

      {/* Filters */}
      <div className="bg-white border-t border-gray-200 shadow-sm">

        <div className="max-w-7xl mx-auto px-4 py-5 flex flex-wrap justify-center gap-4">

          {/* Location Filter */}
          <select
            className="px-4 py-3 rounded-xl border border-gray-300 min-w-[220px] bg-white outline-none focus:ring-2 focus:ring-slate-400"
            onChange={(e) =>
              setLocationFilter(e.target.value)
            }
          >
            <option value="All">
              All Locations
            </option>

            <option value="Bangalore">
              Bangalore
            </option>

            <option value="Mysore">
              Mysore
            </option>

            <option value="Hyderabad">
              Hyderabad
            </option>

            <option value="Chennai">
              Chennai
            </option>
          </select>

          {/* Price Filter */}
          <select
            className="px-4 py-3 rounded-xl border border-gray-300 min-w-[220px] bg-white outline-none focus:ring-2 focus:ring-slate-400"
            onChange={(e) =>
              setPriceFilter(e.target.value)
            }
          >
            <option value="All">
              All Prices
            </option>

            <option value="35L">
              35L
            </option>

            <option value="50L">
              50L
            </option>

            <option value="75L">
              75L
            </option>

            <option value="1Cr">
              1Cr
            </option>

            <option value="1.5Cr">
              1.5Cr
            </option>

            <option value="2Cr">
              2Cr
            </option>

            <option value="2.5Cr">
              2.5Cr
            </option>
          </select>

        </div>

      </div>

      {/* Sections */}

      {(typeFilter === "All" ||
        typeFilter === "Plot") &&
        renderSection("Plot")}

      {(typeFilter === "All" ||
        typeFilter === "Apartment") &&
        renderSection("Apartment")}

      {(typeFilter === "All" ||
        typeFilter === "Villa") &&
        renderSection("Villa")}

      {/* Footer */}

      <footer className="bg-slate-900 text-white mt-12">

        <div className="max-w-7xl mx-auto px-4 py-8 text-center">

          <h2 className="text-2xl font-bold">
            CAPITAL ACRES
          </h2>

          <p className="text-slate-400 mt-3">
            Find your dream property with us.
          </p>

          <p className="text-slate-500 text-sm mt-6">
            © 2026 Capital Acres. All rights reserved.
          </p>

        </div>

      </footer>

    </div>
  );
}