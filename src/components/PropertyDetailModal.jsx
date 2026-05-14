import { useState } from "react";

import PropertyDetails from "./PropertyDetails";
import EnquiryButton from "./EnquiryButton";

export default function PropertyDetailModal({
  property,
  closeModal
}) {

  const [currentImage, setCurrentImage] =
    useState(0);

  const totalImages =
    property.images?.length || 1;

  const nextImage = () => {

    setCurrentImage(
      (prev) =>
        (prev + 1) % totalImages
    );
  };

  const prevImage = () => {

    setCurrentImage((prev) =>
      prev === 0
        ? totalImages - 1
        : prev - 1
    );
  };

  return (
    <div className="fixed inset-0 bg-black/70 z-50 overflow-y-auto">

      <div className="max-w-6xl mx-auto bg-white min-h-screen relative">

        {/* FIXED CLOSE BUTTON */}
        <button
          onClick={closeModal}
          className="
            fixed
            top-4
            right-4
            z-50
            bg-white
            shadow-xl
            px-5
            py-2
            rounded-xl
            font-semibold
          "
        >
          ✕ Close
        </button>

        {/* IMAGE SECTION */}
        <div className="relative bg-black">

          <img
            src={
              property.images?.[
                currentImage
              ] || property.image
            }
            alt={property.projectName}
            className="
              w-full
              h-auto
              max-h-[85vh]
              object-contain
            "
          />

          {/* IMAGE COUNT */}
          {totalImages > 1 && (
            <div
              className="
                absolute
                bottom-4
                right-4
                bg-black/70
                text-white
                px-3
                py-1
                rounded-xl
                text-sm
              "
            >
              {currentImage + 1}/{totalImages}
            </div>
          )}

          {/* LEFT BUTTON */}
          {totalImages > 1 && (
            <button
              onClick={prevImage}
              className="
                absolute
                left-4
                top-1/2
                -translate-y-1/2
                bg-white/90
                w-10
                h-10
                rounded-full
                text-lg
                shadow-lg
              "
            >
              ◀
            </button>
          )}

          {/* RIGHT BUTTON */}
          {totalImages > 1 && (
            <button
              onClick={nextImage}
              className="
                absolute
                right-4
                top-1/2
                -translate-y-1/2
                bg-white/90
                w-10
                h-10
                rounded-full
                text-lg
                shadow-lg
              "
            >
              ▶
            </button>
          )}

        </div>

        {/* CONTENT */}
        <div className="p-5 md:p-8">

          {/* PROJECT NAME */}
          <h1
            className="
              text-3xl
              md:text-5xl
              font-bold
              text-slate-800
            "
          >
            {property.projectName}
          </h1>

          {/* LOCATION */}
          <p className="text-gray-500 mt-3 text-lg">

            📍 {property.location}

          </p>

          {/* PRICE */}
          <p
            className="
              text-emerald-600
              text-4xl
              md:text-5xl
              font-bold
              mt-5
            "
          >
            {property.price}
          </p>

          {/* QUICK DETAILS */}
          <div
            className="
              grid
              grid-cols-2
              md:grid-cols-4
              gap-4
              mt-8
            "
          >

            <div className="bg-slate-100 p-4 rounded-2xl">
              <p className="text-gray-400 text-sm">
                Size
              </p>

              <p className="font-bold mt-1">
                {property.availableSize}
              </p>
            </div>

            <div className="bg-slate-100 p-4 rounded-2xl">
              <p className="text-gray-400 text-sm">
                Units
              </p>

              <p className="font-bold mt-1">
                {property.totalUnits}
              </p>
            </div>

            <div className="bg-slate-100 p-4 rounded-2xl">
              <p className="text-gray-400 text-sm">
                Project Size
              </p>

              <p className="font-bold mt-1">
                {property.projectSize}
              </p>
            </div>

            <div className="bg-slate-100 p-4 rounded-2xl">
              <p className="text-gray-400 text-sm">
                Approval
              </p>

              <p className="font-bold mt-1">
                {property.approvals}
              </p>
            </div>

          </div>

          {/* ACTION BUTTONS */}
          <div className="flex gap-4 mt-8 flex-wrap">

            {/* LOCATION BUTTON */}
            <a
              href={property.locationLink}
              target="_blank"
              rel="noreferrer"
              className="
                bg-blue-600
                hover:bg-blue-700
                text-white
                px-8
                py-4
                rounded-2xl
                font-bold
                shadow-lg
                text-center
                transition
              "
            >
              📍 View Location
            </a>

            {/* ENQUIRY BUTTON */}
            <div
              className="
                scale-125
                origin-left
                mt-1
              "
            >
              <EnquiryButton
                property={property}
              />
            </div>

          </div>

          {/* FULL DETAILS */}
          <PropertyDetails
            property={property}
          />

        </div>

      </div>

    </div>
  );
}