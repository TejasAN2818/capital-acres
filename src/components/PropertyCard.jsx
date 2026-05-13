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
      <div
        onClick={() =>
          setShowDetails(true)
        }
        className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-2xl hover:-translate-y-1 transition duration-300 min-w-[320px] max-w-[380px] cursor-pointer"
      >

        <PropertyImageSlider
          property={property}
        />

        <div className="p-5">

          <p className="text-gray-500">
            📍 {property.location}
          </p>

          <h2 className="text-2xl font-bold text-slate-800 mt-2">
            {property.projectName}
          </h2>

          <PropertyOverview
            property={property}
          />

          <div
            onClick={(e) =>
              e.stopPropagation()
            }
          >
            <EnquiryButton
              property={property}
            />
          </div>

        </div>
      </div>

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