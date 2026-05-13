export default function PropertyDetails({
  property
}) {

  return (
    <div className="mt-10 space-y-5">

      <div>
        <h2 className="font-bold text-2xl">
          Description
        </h2>

        <p className="text-gray-600 mt-2">
          {property.description}
        </p>
      </div>

      <div>
        <h2 className="font-bold text-2xl">
          Amenities
        </h2>

        <p className="text-gray-600 mt-2">
          {property.amenities}
        </p>
      </div>

      <div>
        <h2 className="font-bold text-2xl">
          Nearby Places
        </h2>

        <p className="text-gray-600 mt-2">
          {property.nearbyPlaces}
        </p>
      </div>

      <div>
        <h2 className="font-bold text-2xl">
          Builder Name
        </h2>

        <p className="text-gray-600 mt-2">
          {property.builderName}
        </p>
      </div>

    </div>
  );
}