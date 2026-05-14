export default function PropertyDetails({
  property
}) {

  return (
    <div className="mt-10 space-y-8">

      <div>
        <h2 className="font-bold text-2xl">
          Description
        </h2>

        <p className="text-gray-600 mt-3 leading-7">
          {property.description}
        </p>
      </div>

      <div>
        <h2 className="font-bold text-2xl">
          Amenities
        </h2>

        <p className="text-gray-600 mt-3">
          {property.amenities}
        </p>
      </div>

      <div>
        <h2 className="font-bold text-2xl">
          Nearby Places
        </h2>

        <p className="text-gray-600 mt-3">
          {property.nearbyPlaces}
        </p>
      </div>

      <div>
        <h2 className="font-bold text-2xl">
          Builder Name
        </h2>

        <p className="text-gray-600 mt-3">
          {property.builderName}
        </p>
      </div>

      <div>
        <h2 className="font-bold text-2xl">
          Landmark
        </h2>

        <p className="text-gray-600 mt-3">
          {property.landmark}
        </p>
      </div>

      <div>
        <h2 className="font-bold text-2xl">
          Bank Loans
        </h2>

        <p className="text-gray-600 mt-3">
          {property.bankLoans}
        </p>
      </div>

      <div>
        <h2 className="font-bold text-2xl">
          Price Per Sq.ft
        </h2>

        <p className="text-gray-600 mt-3">
          {property.pricePerSqft}
        </p>
      </div>

      <div>
        <h2 className="font-bold text-2xl">
          Property Type
        </h2>

        <p className="text-gray-600 mt-3">
          {property.type}
        </p>
      </div>

    </div>
  );
}