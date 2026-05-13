export default function PropertyOverview({
  property
}) {

  return (
    <div className="flex justify-between mt-5">

      <div>

        <p className="text-gray-400 text-sm">
          Available Size
        </p>

        <p className="font-bold">
          {property.availableSize}
        </p>

      </div>

      <div className="text-right">

        <p className="text-gray-400 text-sm">
          Total Units
        </p>

        <p className="font-bold">
          {property.totalUnits}
        </p>

      </div>

    </div>
  );
}