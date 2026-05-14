import { useState } from "react";

export default function PropertyDetailModal({
  property,
  closeModal
}) {

  const [currentImage, setCurrentImage] =
    useState(0);

  const totalImages =
    property.images?.length || 1;

  const currentImageUrl =
    property.images?.[
    currentImage
    ] || property.image;

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
    <div className="fixed inset-0 z-50 bg-black/70 overflow-y-auto">

      <div className="bg-white min-h-screen max-w-6xl mx-auto relative">

        {/* CLOSE BUTTON */}
        <button
          onClick={closeModal}
          className="
    fixed
    top-3
    right-3
    z-50
    bg-gradient-to-r
    from-rose-500
    to-red-600
    hover:from-rose-600
    hover:to-red-700
    text-white
    shadow-2xl
    px-4
    py-2
    rounded-xl
    text-sm
    font-semibold
    border
    border-white/20
    backdrop-blur-md
    transition
    duration-300
    hover:scale-105
  "
        >
          ✕ Close
        </button>

        {/* IMAGE SECTION */}
        <div className="relative h-[280px] md:h-[650px] overflow-hidden bg-black">

          {/* BLUR BACKGROUND */}
          <div
            className="
              absolute
              inset-0
              blur-2xl
              scale-110
            "
            style={{
              backgroundImage:
                `url(${currentImageUrl})`,
              backgroundSize: "cover",
              backgroundPosition: "center"
            }}
          />

          {/* DARK LAYER */}
          <div className="absolute inset-0 bg-black/30" />

          {/* MAIN IMAGE */}
          <img
            src={currentImageUrl}
            alt={property.projectName}
            className="
              relative
              z-10
              w-full
              h-full
              object-contain
            "
          />

          {/* IMAGE COUNT */}
          {totalImages > 1 && (
            <div
              className="
                absolute
                bottom-3
                right-3
                z-20
                bg-black/70
                text-white
                text-xs
                px-3
                py-1
                rounded-xl
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
                left-3
                top-1/2
                -translate-y-1/2
                z-20
                bg-white/90
                w-9
                h-9
                rounded-full
                text-sm
                shadow-xl
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
                right-3
                top-1/2
                -translate-y-1/2
                z-20
                bg-white/90
                w-9
                h-9
                rounded-full
                text-sm
                shadow-xl
              "
            >
              ▶
            </button>
          )}

        </div>

        {/* CONTENT */}
        <div className="p-4 md:p-10">

          {/* PROJECT NAME */}
          <h1
            className="
              text-2xl
              md:text-5xl
              leading-tight
              font-bold
              text-slate-800
            "
          >
            {property.projectName}
          </h1>

          {/* LOCATION + LANDMARK */}
          <div className="mt-5">

            {/* LOCATION */}
            <div className="flex items-start gap-3">

              {/* ICON */}
              <div
                className="
        w-11
        h-11
        rounded-2xl
        bg-emerald-100
        flex
        items-center
        justify-center
        text-lg
        shadow-sm
        flex-shrink-0
      "
              >
                📍
              </div>

              {/* TEXT */}
              <div>

                <p
                  className="
          text-xl
          md:text-3xl
          font-bold
          text-slate-800
          leading-tight
        "
                >
                  {property.location}
                </p>

                {/* LANDMARK */}
                <p
                  className="
          text-sm
          md:text-base
          text-slate-500
          mt-1
        "
                >
                  Near {property.landmark}
                </p>

              </div>

            </div>

          </div>

          {/* PRICE */}
          <p
            className="
              text-3xl
              md:text-5xl
              font-bold
              text-emerald-600
              mt-5
            "
          >
            {property.price}
          </p>

          {/* BUTTONS */}
          <div className="flex gap-3 mt-6">

            {/* LOCATION BUTTON */}
            <a
              href={property.locationLink}
              target="_blank"
              rel="noreferrer"
              className="
                flex-1
                bg-blue-600
                hover:bg-blue-700
                text-white
                text-sm
                text-center
                px-4
                py-3
                rounded-xl
                font-semibold
                shadow-lg
                transition
              "
            >
              📍 Location
            </a>

            {/* ENQUIRY BUTTON */}
            <button
              className="
                flex-1
                bg-gradient-to-r
                from-emerald-500
                to-emerald-700
                text-white
                text-sm
                px-4
                py-3
                rounded-xl
                font-semibold
                shadow-lg
                transition
              "
            >
              📞 Enquire
            </button>

          </div>

          {/* QUICK DETAILS */}
          <div className="mt-8">

            <div
              className="
                grid
                grid-cols-2
                gap-3
                md:grid-cols-4
              "
            >

              {/* PRICE PER SQFT */}
              <div
                className="
                  bg-emerald-50
                  border
                  border-emerald-200
                  p-3
                  rounded-2xl
                "
              >

                <p className="text-[11px] text-emerald-600 font-semibold">
                  Price / Sq.ft
                </p>

                <p className="text-xl font-bold text-emerald-700 mt-1">
                  {property.pricePerSqft}
                </p>

              </div>

              {/* AVAILABLE SIZE */}
              <div
                className="
                  bg-slate-100
                  p-3
                  rounded-2xl
                "
              >

                <p className="text-[11px] text-gray-500">
                  Available Size
                </p>

                <p className="text-lg font-bold mt-1">
                  {property.availableSize}
                </p>

              </div>

              {/* PROJECT SIZE */}
              <div
                className="
                  bg-slate-100
                  p-3
                  rounded-2xl
                "
              >

                <p className="text-[11px] text-gray-500">
                  Project Size
                </p>

                <p className="text-lg font-bold mt-1">
                  {property.projectSize}
                </p>

              </div>

              {/* TOTAL UNITS */}
              <div
                className="
                  bg-slate-100
                  p-3
                  rounded-2xl
                "
              >

                <p className="text-[11px] text-gray-500">
                  Total Units
                </p>

                <p className="text-lg font-bold mt-1">
                  {property.totalUnits}
                </p>

              </div>

            </div>

          </div>

          {/* DETAILS */}
          <div
            className="
              mt-8
              bg-slate-50
              rounded-3xl
              p-4
              border
              border-slate-200
            "
          >

            <div className="space-y-5">

              {/* ROW */}
              <div className="grid grid-cols-2 gap-4 border-b pb-4">

                <div>

                  <p className="text-[11px] text-gray-400 uppercase font-semibold">
                    Amenities
                  </p>

                  <p className="text-[13px] leading-6 text-slate-700 mt-1">
                    {property.amenities}
                  </p>

                </div>

                <div>

                  <p className="text-[11px] text-gray-400 uppercase font-semibold">
                    Nearby Places
                  </p>

                  <p className="text-[13px] leading-6 text-slate-700 mt-1">
                    {property.nearbyPlaces}
                  </p>

                </div>

              </div>

              {/* ROW */}
              <div className="grid grid-cols-2 gap-4 border-b pb-4">

                <div>

                  <p className="text-[11px] text-gray-400 uppercase font-semibold">
                    Builder Name 
                  </p>

                  <p className="text-[13px] leading-6 text-slate-700 mt-1">
                    {property.builderName}
                  </p>

                </div>

                <div>

                  <p className="text-[11px] text-gray-400 uppercase font-semibold">
                    Property Type
                  </p>

                  <p className="text-[13px] leading-6 text-slate-700 mt-1">
                    {property.type}
                  </p>

                </div>

              </div>

              {/* ROW */}
              <div className="grid grid-cols-2 gap-4 border-b pb-4">

                <div>

                  <p className="text-[11px] text-gray-400 uppercase font-semibold">
                    Approvals
                  </p>

                  <p className="text-[13px] leading-6 text-slate-700 mt-1">
                    {property.approvals}
                  </p>

                </div>

                <div>

                  <p className="text-[11px] text-gray-400 uppercase font-semibold">
                    Bank Loan
                  </p>

                  <p className="text-[13px] leading-6 text-slate-700 mt-1">
                    {property.bankLoans}
                  </p>

                </div>

              </div>

              {/* DESCRIPTION */}
              <div>

                <p className="text-[11px] text-gray-400 uppercase font-semibold">
                  Description
                </p>

                <p
                  className="
                    text-[13px]
                    leading-6
                    text-slate-700
                    mt-2
                  "
                >
                  {property.description}
                </p>

              </div>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
}