import EnquiryButton from "./EnquiryButton";

export default function PropertyOverview({
  property
}) {

  return (
    <div className="flex items-end justify-between gap-2 mt-1">

      {/* LEFT SIDE */}
      <div className="flex gap-3">

        {/* SIZE */}
        <div>

          <p className="text-[9px] text-gray-400 leading-none">
            Size
          </p>

          <p className="font-bold text-[11px] leading-none mt-1">
            {property.availableSize}
          </p>

        </div>

        {/* UNITS */}
        <div>

          <p className="text-[9px] text-gray-400 leading-none">
            Units
          </p>

          <p className="font-bold text-[11px] leading-none mt-1">
            {property.totalUnits}
          </p>

        </div>

      </div>

      {/* ENQUIRY BUTTON */}
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
  );
}