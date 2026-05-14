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

        {/* FIXED CLOSE BUTTON */}
        <button
          onClick={closeModal}
          className="
            fixed
            top-4
            right-4
            z-50
            bg-white
            shadow-2xl
            px-5
            py-2
            rounded-xl
            font-semibold
          "
        >
          ✕ Close
        </button>

        {/* IMAGE SECTION */}
        <div className="relative h-[320px] md:h-[650px] overflow-hidden bg-black">

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
                bottom-4
                right-4
                z-20
                bg-black/70
                text-white
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
                left-4
                top-1/2
                -translate-y-1/2
                z-20
                bg-white/90
                w-10
                h-10
                rounded-full
                text-lg
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
                right-4
                top-1/2
                -translate-y-1/2
                z-20
                bg-white/90
                w-10
                h-10
                rounded-full
                text-lg
                shadow-xl
              "
            >
              ▶
            </button>
          )}

        </div>

        {/* CONTENT */}
        <div className="p-5 md:p-10">

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
          <div
            className="
    mt-4
    bg-gradient-to-r
    from-slate-100
    to-slate-50
    border
    border-slate-200
    rounded-2xl
    p-5
  "
          >



            <p
              className="
      text-2xl
      md:text-3xl
      font-bold
      text-slate-800
      mt-2
    "
            >
              📍 {property.location}
            </p>

            {/* LANDMARK */}
            <div className="mt-4">


              <p className="text-lg text-slate-700 mt-1">
                {property.landmark}
              </p>

            </div>

          </div>

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

          {/* BUTTONS */}
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
                shadow-xl
                transition
              "
            >
              📍 View Location
            </a>

            {/* ENQUIRY BUTTON */}
            <button
              className="
                bg-gradient-to-r
                from-emerald-500
                to-emerald-700
                hover:scale-105
                transition
                text-white
                px-8
                py-4
                rounded-2xl
                font-bold
                shadow-2xl
              "
            >
              📞 Enquire Now
            </button>

          </div>

          {/* QUICK DETAILS */}
          <div className="mt-10">

            <div
              className="
                grid
                grid-cols-2
                md:grid-cols-3
                gap-5
              "
            >

              {/* PRICE PER SQFT */}
              <div
                className="
                  bg-emerald-50
                  border
                  border-emerald-200
                  p-5
                  rounded-3xl
                  shadow-sm
                "
              >

                <p className="text-emerald-600 text-sm font-semibold">
                  Price Per Sq.ft
                </p>

                <p className="text-3xl font-bold text-emerald-700 mt-2">
                  {property.pricePerSqft}
                </p>

              </div>

              {/* AVAILABLE SIZE */}
              <div
                className="
                  bg-slate-100
                  p-5
                  rounded-3xl
                "
              >

                <p className="text-gray-500 text-sm">
                  Available Size
                </p>

                <p className="text-2xl font-bold mt-2">
                  {property.availableSize}
                </p>

              </div>

              {/* PROJECT SIZE */}
              <div
                className="
                  bg-slate-100
                  p-5
                  rounded-3xl
                "
              >

                <p className="text-gray-500 text-sm">
                  Project Size
                </p>

                <p className="text-2xl font-bold mt-2">
                  {property.projectSize}
                </p>

              </div>

              {/* TOTAL UNITS */}
              <div
                className="
                  bg-slate-100
                  p-5
                  rounded-3xl
                "
              >

                <p className="text-gray-500 text-sm">
                  Total Units
                </p>

                <p className="text-2xl font-bold mt-2">
                  {property.totalUnits}
                </p>

              </div>





            </div>

          </div>

          {/* DETAILS */}
<div
  className="
    mt-10
    bg-slate-50
    rounded-3xl
    p-6
    border
    border-slate-200
  "
>

  <div className="space-y-5">

    {/* ROW */}
    <div className="flex justify-between gap-5 border-b pb-4">

      <div>
        <p className="text-[11px] text-gray-400 uppercase font-semibold">
          Amenities
        </p>

        <p className="text-sm text-slate-700 mt-1">
          {property.amenities}
        </p>
      </div>

      <div className="text-right">
        <p className="text-[11px] text-gray-400 uppercase font-semibold">
          Nearby Places
        </p>

        <p className="text-sm text-slate-700 mt-1">
          {property.nearbyPlaces}
        </p>
      </div>

    </div>

    {/* ROW */}
    <div className="flex justify-between gap-5 border-b pb-4">

      <div>
        <p className="text-[11px] text-gray-400 uppercase font-semibold">
          Builder Name
        </p>

        <p className="text-sm text-slate-700 mt-1">
          {property.builderName}
        </p>
      </div>

      <div className="text-right">
        <p className="text-[11px] text-gray-400 uppercase font-semibold">
          Property Type
        </p>

        <p className="text-sm text-slate-700 mt-1">
          {property.type}
        </p>
      </div>

    </div>

    {/* ROW */}
    <div className="flex justify-between gap-5 border-b pb-4">

      <div>
        <p className="text-[11px] text-gray-400 uppercase font-semibold">
          Approvals
        </p>

        <p className="text-sm text-slate-700 mt-1">
          {property.approvals}
        </p>
      </div>

      <div className="text-right">
        <p className="text-[11px] text-gray-400 uppercase font-semibold">
          Bank Loans
        </p>

        <p className="text-sm text-slate-700 mt-1">
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
          text-sm
          text-slate-700
          mt-2
          leading-7
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