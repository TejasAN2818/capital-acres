export default function PropertyDetailModal({
  property,
  closeModal
}) {

  return (
    <div className="fixed inset-0 bg-black/60 z-50 overflow-y-auto">

      <div className="max-w-6xl mx-auto bg-white min-h-screen">

        <img
          src={
            property.images?.[0] ||
            property.image
          }
          alt={property.projectName}
          className="w-full h-[420px] object-cover"
        />

        <button
          onClick={closeModal}
          className="fixed top-5 right-5 bg-white px-5 py-2 rounded-xl"
        >
          Close
        </button>

        <div className="p-8">

          <h1 className="text-4xl font-bold">
            {property.projectName}
          </h1>

          <p className="text-gray-500 mt-2">
            📍 {property.location}
          </p>

          <p className="text-emerald-600 text-4xl font-bold mt-5">
            {property.price}
          </p>

          <PropertyDetails
            property={property}
          />

        </div>

      </div>
    </div>
  );
}