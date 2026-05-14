import PropertyDetails from "./PropertyDetails";
import EnquiryButton from "./EnquiryButton";

export default function PropertyDetailModal({
  property,
  closeModal
}) {

  return (
    <div className="fixed inset-0 bg-black/60 z-50 overflow-y-auto">

      <div className="max-w-6xl mx-auto bg-white min-h-screen">

        {/* TOP IMAGE */}
        <div className="relative">

          <img
            src={
              property.images?.[0] ||
              property.image
            }
            alt={property.projectName}
            className="w-full h-[260px] md:h-[420px] object-cover"
          />

          {/* CLOSE BUTTON */}
          <button
            onClick={closeModal}
            className="
              absolute
              top-4
              right-4
              bg-white
              px-4
              py-2
              rounded-xl
              shadow-lg
              font-semibold
            "
          >
            Close
          </button>

        </div>

        {/* CONTENT */}
        <div className="p-5 md:p-8">

          {/* PROJECT NAME */}
          <h1 className="text-3xl md:text-4xl font-bold text-slate-800">

            {property.projectName}

          </h1>

          {/* LOCATION */}
          <p className="text-gray-500 mt-2">

            📍 {property.location}

          </p>

          {/* PRICE */}
          <p className="text-emerald-600 text-3xl md:text-4xl font-bold mt-4">

            {property.price}

          </p>

          {/* QUICK DETAILS */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">

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

          {/* BUTTONS */}
          <div className="flex gap-4 mt-8">

            {/* LOCATION BUTTON */}
            <a
              href={property.locationLink}
              target="_blank"
              rel="noreferrer"
              className="
                bg-slate-200
                hover:bg-slate-300
                px-6
                py-3
                rounded-xl
                font-semibold
                text-center
              "
            >
              View Location
            </a>

            {/* ENQUIRY BUTTON */}
            <EnquiryButton
              property={property}
            />

          </div>

          {/* ALL DETAILS */}
          <PropertyDetails
            property={property}
          />

        </div>

      </div>

    </div>
  );
}