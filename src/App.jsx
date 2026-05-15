import { useState } from "react";

import plots from "./data/Plots";
import apartments from "./data/Apartments";
import villas from "./data/Villas";

import PropertyCard from "./components/PropertyCard";
import PostPropertyModal from "./components/PostPropertyModal";

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

  const [showPostModal, setShowPostModal] =
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

    // CHECK IF ANY TYPE SELECTED
    const isSingleView =
      typeFilter !== "All";

    return (

      <div className="py-5">

        {/* SECTION HEADER */}
        <div className="flex items-center justify-between px-3 md:px-6 mb-4">

          <h2 className="text-2xl md:text-3xl font-bold text-slate-800">
            {title}s
          </h2>

          <p className="text-sm text-gray-500">
            {items.length} Properties
          </p>

        </div>

        {/* DEFAULT VIEW = HORIZONTAL */}
        {!isSingleView ? (

          <div className="
          flex
          gap-4
          overflow-x-auto
          px-3
          md:px-6
          pb-2
          scrollbar-hide
        ">

            {items.map((property) => (

              <div
                key={property.id}
                className="flex-shrink-0"
              >

                <PropertyCard
                  property={property}
                />

              </div>

            ))}

          </div>

        ) : (

          /* SELECTED VIEW = VERTICAL */
          <div className="
          grid
          grid-cols-1
          sm:grid-cols-2
          lg:grid-cols-3
          xl:grid-cols-4
          gap-4
          place-items-center
          px-3
          md:px-6
        ">

            {items.map((property) => (

              <PropertyCard
                key={property.id}
                property={property}
              />

            ))}

          </div>

        )}

      </div>

    );
  };

  return (

    <div className="min-h-screen bg-slate-100">

      {/* HEADER */}
      <header className="bg-slate-950 text-white border-b border-slate-800">

        <div className="flex items-center justify-between px-3 md:px-6 h-14">

          {/* WEBSITE NAME */}
          <div className="flex flex-col leading-none">

            <h1 className="text-xl md:text-2xl font-black tracking-wider text-white">

              CAPITAL

              <span className="text-emerald-400 ml-1">
                ACRES
              </span>

            </h1>

            <p className="text-[9px] md:text-[10px] tracking-[3px] text-slate-400 mt-1 uppercase">
              Premium Properties
            </p>

          </div>

          {/* POST PROPERTY BUTTON */}
<button
  onClick={() =>
    setShowPostModal(true)
  }
  className="
    relative
    h-6
    px-2
    rounded-xl
    bg-white
    text-slate-900
    text-[11px]
    font-bold
    shadow-md
    hover:scale-105
    active:scale-95
    transition-all
    duration-300
    border
    border-slate-200
  "
>

  Post Property

  {/* FREE TAG */}
  <span
    className="
      absolute
      -top-1
      -right-1
      bg-orange-500
      text-black
      text-[7px]
      px-1.5
      py-[1px]
      rounded-full
      font-semibold
      shadow
    "
  >
    FREE
  </span>

</button>

        </div>

      </header>

      {/* FILTER + SEARCH MAIN CONTAINER */}
      <div className="sticky top-0 z-40 bg-slate-100">

        {/* MAIN CONTAINER */}
        <div className="w-full bg-white/95 backdrop-blur shadow-sm border-b border-gray-200 px-3 py-2 md:px-4 md:py-3">

         {/* SEARCH BAR */}
<div className="w-full relative mb-3">

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
    className="
      w-full
      h-11
      md:h-12
      px-4
      text-sm
      rounded-xl
      border
      border-gray-200
      bg-slate-50
      outline-none
      focus:ring-2
      focus:ring-slate-300
      transition
    "
  />

  {/* SEARCH DROPDOWN */}
  {showSuggestions &&
    searchTerm && (

      <div className="
        absolute
        top-12
        left-0
        w-full
        bg-white
        border
        border-gray-200
        rounded-2xl
        shadow-2xl
        z-50
        overflow-hidden
      ">

        {/* LEFT + RIGHT LAYOUT */}
        <div className="flex">

          {/* PROJECTS */}
          <div className="
            w-1/2
            p-3
            border-r
            border-gray-100
          ">

            <h3 className="
              text-xs
              font-semibold
              text-slate-600
              mb-2
              uppercase
              tracking-wide
            ">
              Project Names
            </h3>

            <div className="
              space-y-1
              max-h-[220px]
              overflow-y-auto
            ">

              {projectSuggestions.length > 0 ? (

                projectSuggestions.map(
                  (property) => (

                    <div
                      key={property.id}
                      className="
                        px-3
                        py-2
                        rounded-xl
                        hover:bg-slate-100
                        cursor-pointer
                        transition
                      "
                      onClick={() => {
                        setSearchTerm(
                          property.projectName
                        );
                        setShowSuggestions(false);
                      }}
                    >

                      <p className="
                        text-sm
                        font-medium
                        text-slate-800
                      ">
                        {property.projectName}
                      </p>

                      <p className="
                        text-xs
                        text-gray-500
                      ">
                        {property.location}
                      </p>

                    </div>

                  )
                )

              ) : (

                <p className="
                  text-xs
                  text-gray-400
                ">
                  No Projects Found
                </p>

              )}

            </div>

          </div>

          {/* LOCATIONS */}
          <div className="
            w-1/2
            p-3
          ">

            <h3 className="
              text-xs
              font-semibold
              text-slate-600
              mb-2
              uppercase
              tracking-wide
            ">
              Locations
            </h3>

            <div className="
              space-y-1
              max-h-[220px]
              overflow-y-auto
            ">

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
                    className="
                      px-3
                      py-2
                      rounded-xl
                      hover:bg-slate-100
                      cursor-pointer
                      transition
                    "
                    onClick={() => {
                      setSearchTerm(
                        location
                      );
                      setShowSuggestions(false);
                    }}
                  >

                    <p className="
                      text-sm
                      font-medium
                      text-slate-800
                    ">
                      {location}
                    </p>

                  </div>

                ))

              ) : (

                <p className="
                  text-xs
                  text-gray-400
                ">
                  No Locations Found
                </p>

              )}

            </div>

          </div>

        </div>

      </div>

    )}

</div>

          {/* PROPERTY TYPE BUTTONS */}
          <div className="grid grid-cols-3 gap-2 mb-3 ">

            <button
              className={`h-7 rounded-xl text-xs md:text-sm font-semibold transition-all duration-300 ${typeFilter === "Plot"
                ? "bg-slate-900 text-white shadow-md"
                : "bg-slate-100 text-slate-700 border border-slate-200 hover:bg-slate-200"
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
              className={`h-7 rounded-xl text-xs md:text-sm font-semibold transition-all duration-300 ${typeFilter === "Apartment"
                ? "bg-slate-900 text-white shadow-md"
                : "bg-slate-100 text-slate-700 border border-slate-200 hover:bg-slate-200"
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
              className={`h-7 rounded-xl text-xs md:text-sm font-semibold transition-all duration-300 ${typeFilter === "Villa"
                ? "bg-slate-900 text-white shadow-md"
                : "bg-slate-100 text-slate-700 border border-slate-200 hover:bg-slate-200"
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

          {/* LOCATION + PRICE FILTER SECTION */}
          <div className="flex gap-2">

            {/* LOCATION FILTER */}
<div className="flex-1 relative">

  <select
    value={locationFilter}
    onChange={(e) =>
      setLocationFilter(
        e.target.value
      )
    }
    className={`
      w-full
      h-7
      md:h-8
      px-2.5
      pr-7
      text-[10px]
      md:text-[11px]
      rounded-lg
      shadow-sm
      outline-none
      appearance-none
      transition-all
      duration-300

      ${
        locationFilter !== "All"
          ? `
            bg-emerald-500
            text-white
            border
            border-emerald-500
          `
          : `
            bg-slate-50
            text-slate-700
            border
            border-slate-200
          `
      }
    `}
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

  <div className={`
    absolute
    right-2
    top-1/2
    -translate-y-1/2
    pointer-events-none
    text-[9px]

    ${
      locationFilter !== "All"
        ? "text-white"
        : "text-slate-500"
    }
  `}>
    ▼
  </div>

</div>

            {/* PRICE FILTER */}
<div className="flex-1 relative">

  <select
    value={priceFilter}
    onChange={(e) =>
      setPriceFilter(
        e.target.value
      )
    }
    className={`
      w-full
      h-7
      md:h-8
      px-2.5
      pr-7
      text-[10px]
      md:text-[11px]
      rounded-lg
      shadow-sm
      outline-none
      appearance-none
      transition-all
      duration-300

      ${
        priceFilter !== "All"
          ? `
            bg-orange-500
            text-white
            border
            border-orange-500
          `
          : `
            bg-slate-50
            text-slate-700
            border
            border-slate-200
          `
      }
    `}
  >

    <option value="All">
      All Prices
    </option>

    <option value="₹2500">
      Below ₹2500
    </option>

    <option value="₹3500">
      Below ₹3500
    </option>

    <option value="₹4500">
      Below ₹4500
    </option>

    <option value="₹5500">
      Below ₹5500
    </option>

    <option value="₹6500">
      Below ₹6500
    </option>

  </select>

  <div className={`
    absolute
    right-2
    top-1/2
    -translate-y-1/2
    pointer-events-none
    text-[9px]

    ${
      priceFilter !== "All"
        ? "text-white"
        : "text-slate-500"
    }
  `}>
    ▼
  </div>

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

      {/* POST PROPERTY MODAL */}
{showPostModal && (

  <PostPropertyModal
    closeModal={() =>
      setShowPostModal(false)
    }
  />

)}

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