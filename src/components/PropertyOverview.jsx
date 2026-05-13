export default function PropertyOverview({
  property
}) {

  return (
    <div className="flex justify-between mt-2">

      <div>

        <p className="text-[10px] text-gray-400">
          Size
        </p>

        <p className="font-bold text-xs">
          {property.availableSize}
        </p>

      </div>

      <div className="text-right">

        <p className="text-[10px] text-gray-400">
          Units
        </p>

        <p className="font-bold text-xs">
          {property.totalUnits}
        </p>

      </div>

    </div>
  );
}