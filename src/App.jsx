import { useState } from "react";

import plots from "./data/Plots";
import apartments from "./data/Apartments";
import villas from "./data/Villas";

import PropertyCard from "./components/PropertyCard";

const properties = [
  ...plots,
  ...apartments,
  ...villas
];

export default function App() {

  const [typeFilter, setTypeFilter] =
    useState("All");

  const [locationFilter, setLocationFilter] =
    useState("All");

  const [priceFilter, setPriceFilter] =
    useState("All");

  const [searchTerm, setSearchTerm] =
    useState("");

  const [showSuggestions, setShowSuggestions] =
    useState(false);

  // SEARCH SUGGESTIONS
  const projectSuggestions =
    properties.filter((property) =>
      (property.projectName || "")
        .toLowerCase()
        .startsWith(
          searchTerm.toLowerCase()
        )
    );

  const locationSuggestions =
    properties.filter((property) =>
      (property.location || "")
        .toLowerCase()
        .startsWith(
          searchTerm.toLowerCase()
        )
    );

  // FILTER PROPERTIES
  const filteredProperties =
    properties.filter((property) => {

      // TYPE FILTER
      const matchType =
        typeFilter === "All" ||
        property.type === typeFilter;

      // LOCATION FILTER
      const matchLocation =
        locationFilter === "All" ||
        property.location === locationFilter;

      // PRICE FILTER
      const propertyPrice =
        parseInt(
          (property.pricePerSqft || "")
            .replace("₹", "")
            .replace("/sqft", "")
        );

      const selectedPrice =
        parseInt(
          priceFilter.replace("₹", "")
        );

      const matchPrice =
        priceFilter === "All" ||
        propertyPrice <= selectedPrice;

      // SEARCH FILTER
      const matchSearch =

        searchTerm === "" ||

        (property.projectName || "")
          .toLowerCase()
          .includes(
            searchTerm.toLowerCase()
          ) ||

        (property.location || "")
          .toLowerCase()
          .includes(
            searchTerm.toLowerCase()
          );

      return (
        matchType &&
        matchLocation &&
        matchPrice &&
        matchSearch
      );
    });

  // RENDER PROPERTY SECTION
  const renderSection = (title) => {

    const items =
      filteredProperties.filter(
        (property) =>
          property.type === title
      );

    if (items.length === 0)
      return null;

    const isSingleView =
      typeFilter !== "All";

    return (

      <div className="px-3 md:px-8 py-6">

        {/* SECTION HEADER */}
        <div className="flex items-center justify-between mb-5">

          <h2 className="text-2xl md:text-3xl font-bold text-slate-800">
            {title}s
          </h2>

          <p className="text-sm md:text-base text-gray-500">
            {items.length} Properties
          </p>

        </div>

        {/* PROPERTY CARDS */}
        <div
          className={
            isSingleView
              ? "grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5"
              : "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5"
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

      {/* HEADER */}
      <header className="bg-slate-900 text-white shadow-lg sticky top-0 z-50">

        <div className="max-w-7xl mx-auto px-4 py-4 flex flex-col md:flex-row items-center justify-between">

          <h1 className="text-2xl md:text-4xl font-extrabold tracking-wide text-center md:text-left">
            CAPITAL ACRES
          </h1>

          <p className="text-slate-300 text-sm md:text-base mt-1 md:mt-0 text-center">
            Premium Plots • Apartments • Villas
          </p>

        </div>

      </header>

      {/* FILTER + SEARCH MAIN CONTAINER */}
      <div className="sticky top-[72px] z-40 px-3 md:px-5 py-4 bg-slate-100">

        <div className="max-w-7xl mx-auto bg-white rounded-3xl shadow-lg border border-gray-200 p-4 md:p-5">

          {/* SEARCH CONTAINER */}
          <div className="bg-slate-50 border border-gray-200 rounded-2xl p-3 md:p-4 mb-4">

            <div className="w-full relative">

              <input
                type="text"
                placeholder="Search projects or locations"
                value={searchTerm}
                onChange={(e) => {
                  setSearchTerm(
                    e.target.value
                  );
                  setShowSuggestions(true);
                }}
                onFocus={() =>
                  setShowSuggestions(true)
                }
                className="w-full px-4 py-3 text-sm md:text-base rounded-xl border border-gray-300 bg-white outline-none focus:ring-2 focus:ring-slate-400"
              />

              {/* SEARCH DROPDOWN */}
              {showSuggestions &&
                searchTerm && (

                  <div className="absolute top-14 left-0 w-full bg-white border border-gray-200 rounded-2xl shadow-2xl z-50 overflow-hidden">

                    <div className="grid grid-cols-1 md:grid-cols-2">

                      {/* PROJECTS */}
                      <div className="p-3 md:p-4 border-b md:border-b-0 md:border-r border-gray-200">

                        <h3 className="text-sm font-bold text-slate-700 mb-3">
                          Project Names
                        </h3>

                        <div className="space-y-1 max-h-[250px] overflow-y-auto">

                          {projectSuggestions.length > 0 ? (

                            projectSuggestions.map(
                              (property) => (

                                <div
                                  key={property.id}
                                  className="px-3 py-2 rounded-xl hover:bg-slate-100 cursor-pointer transition"
                                  onClick={() => {
                                    setSearchTerm(
                                      property.projectName
                                    );
                                    setShowSuggestions(false);
                                  }}
                                >

                                  <p className="font-medium text-sm text-slate-800">
                                    {property.projectName}
                                  </p>

                                  <p className="text-xs text-gray-500">
                                    {property.location}
                                  </p>

                                </div>

                              )
                            )

                          ) : (

                            <p className="text-sm text-gray-400">
                              No Projects Found
                            </p>

                          )}

                        </div>

                      </div>

                      {/* LOCATIONS */}
                      <div className="p-3 md:p-4">

                        <h3 className="text-sm font-bold text-slate-700 mb-3">
                          Locations
                        </h3>

                        <div className="space-y-1 max-h-[250px] overflow-y-auto">

                          {locationSuggestions.length > 0 ? (

                            [
                              ...new Set(
                                locationSuggestions.map(
                                  (item) =>
                                    item.location
                                )
                              )
                            ].map((location) => (

                              <div
                                key={location}
                                className="px-3 py-2 rounded-xl hover:bg-slate-100 cursor-pointer transition"
                                onClick={() => {
                                  setSearchTerm(
                                    location
                                  );
                                  setShowSuggestions(false);
                                }}
                              >

                                <p className="font-medium text-sm text-slate-800">
                                  {location}
                                </p>

                              </div>

                            ))

                          ) : (

                            <p className="text-sm text-gray-400">
                              No Locations Found
                            </p>

                          )}

                        </div>

                      </div>

                    </div>

                  </div>

                )}

            </div>

          </div>

          {/* PROPERTY TYPE CONTAINER */}
          <div className="bg-slate-50 border border-gray-200 rounded-2xl p-3 md:p-4 mb-4">

            <div className="flex gap-3 overflow-x-auto">

              {/* PLOTS */}
              <button
                className={`px-5 py-2.5 text-sm rounded-xl whitespace-nowrap font-medium transition ${
                  typeFilter === "Plot"
                    ? "bg-slate-900 text-white shadow-md"
                    : "bg-white border border-gray-200 hover:bg-slate-100"
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

              {/* APARTMENTS */}
              <button
                className={`px-5 py-2.5 text-sm rounded-xl whitespace-nowrap font-medium transition ${
                  typeFilter === "Apartment"
                    ? "bg-slate-900 text-white shadow-md"
                    : "bg-white border border-gray-200 hover:bg-slate-100"
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

              {/* VILLAS */}
              <button
                className={`px-5 py-2.5 text-sm rounded-xl whitespace-nowrap font-medium transition ${
                  typeFilter === "Villa"
                    ? "bg-slate-900 text-white shadow-md"
                    : "bg-white border border-gray-200 hover:bg-slate-100"
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

          {/* FILTER CONTAINER */}
          <div className="bg-slate-50 border border-gray-200 rounded-2xl p-3 md:p-4">

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">

              {/* LOCATION FILTER */}
              <select
                className="px-4 py-3 text-sm rounded-xl border border-gray-300 bg-white outline-none focus:ring-2 focus:ring-slate-400"
                onChange={(e) =>
                  setLocationFilter(
                    e.target.value
                  )
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

              {/* PRICE FILTER */}
              <select
                className="px-4 py-3 text-sm rounded-xl border border-gray-300 bg-white outline-none focus:ring-2 focus:ring-slate-400"
                onChange={(e) =>
                  setPriceFilter(
                    e.target.value
                  )
                }
              >

                <option value="All">
                  Max Sqft Price
                </option>

                <option value="₹2500">
                  Below ₹2500 / sqft
                </option>

                <option value="₹3500">
                  Below ₹3500 / sqft
                </option>

                <option value="₹4500">
                  Below ₹4500 / sqft
                </option>

                <option value="₹5500">
                  Below ₹5500 / sqft
                </option>

                <option value="₹6500">
                  Below ₹6500 / sqft
                </option>

              </select>

            </div>

          </div>

        </div>

      </div>

      {/* PROPERTY SECTIONS */}
      {(typeFilter === "All" ||
        typeFilter === "Plot") &&
        renderSection("Plot")}

      {(typeFilter === "All" ||
        typeFilter === "Apartment") &&
        renderSection("Apartment")}

      {(typeFilter === "All" ||
        typeFilter === "Villa") &&
        renderSection("Villa")}

      {/* FOOTER */}
      <footer className="bg-slate-900 text-white mt-10">

        <div className="max-w-7xl mx-auto px-4 py-8 text-center">

          <h2 className="text-xl md:text-2xl font-bold">
            CAPITAL ACRES
          </h2>

          <p className="text-slate-400 text-sm md:text-base mt-3">
            Find your dream property with us.
          </p>

          <p className="text-slate-500 text-xs md:text-sm mt-6">
            © 2026 Capital Acres.
            All rights reserved.
          </p>

        </div>

      </footer>

    </div>

  );
}