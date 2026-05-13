import { useState } from "react";

import PropertyImageSlider from "./PropertyImageSlider";
import PropertyOverview from "./PropertyOverview";
import EnquiryButton from "./EnquiryButton";
import PropertyDetailModal from "./PropertyDetailModal";

export default function PropertyCard({ property }) {

  const [showDetails, setShowDetails] =
    useState(false);

  return (
    <>
      {/* CARD */}
      <div
        onClick={() =>
          setShowDetails(true)
        }
        className="
          bg-white
          rounded-2xl
          shadow-md
          hover:shadow-xl
          transition
          duration-300
          cursor-pointer
          overflow-hidden
          flex
          min-w-[320px]
          max-w-[340px]
          h-[150px]
        "
      >

        {/* LEFT IMAGE */}
        <div className="w-[42%] h-full">

          <PropertyImageSlider
            property={property}
          />

        </div>

        {/* RIGHT CONTENT */}
        <div className="w-[58%] p-3 flex flex-col justify-between">

          <div>

            {/* LOCATION */}
            <p className="text-gray-500 text-xs">

              📍 {property.location}

            </p>

            {/* PROJECT NAME */}
            <h2 className="text-sm font-bold text-slate-800 mt-1 line-clamp-2">

              {property.projectName}

            </h2>

            {/* PRICE */}
            <p className="text-emerald-600 text-lg font-bold mt-2">

              {property.price}

            </p>

            {/* SQFT */}
            <p className="text-xs text-gray-500">

              {property.pricePerSqft} / Sq.ft

            </p>

          </div>

          {/* OVERVIEW */}
          <PropertyOverview
            property={property}
          />

        </div>
      </div>

      {/* DETAILS MODAL */}
      {showDetails && (
        <PropertyDetailModal
          property={property}
          closeModal={() =>
            setShowDetails(false)
          }
        />
      )}
    </>
  );
}