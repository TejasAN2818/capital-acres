import { useState } from "react";

export default function PropertyImageSlider({
  property
}) {

  const [currentImage, setCurrentImage] =
    useState(0);

  const nextImage = (e) => {

    e.stopPropagation();

    setCurrentImage(
      (prev) =>
        (prev + 1) %
        (property.images?.length || 1)
    );
  };

  const prevImage = (e) => {

    e.stopPropagation();

    setCurrentImage((prev) =>
      prev === 0
        ? (property.images?.length || 1) - 1
        : prev - 1
    );
  };

  return (
    <div className="relative">

      <img
        src={
          property.images?.[
            currentImage
          ] || property.image
        }
        alt={property.projectName}
        loading="lazy"
        className="w-full h-60 object-cover"
      />

      <button
        onClick={prevImage}
        className="absolute top-1/2 left-3 -translate-y-1/2 bg-white/80 w-9 h-9 rounded-full"
      >
        ◀
      </button>

      <button
        onClick={nextImage}
        className="absolute top-1/2 right-3 -translate-y-1/2 bg-white/80 w-9 h-9 rounded-full"
      >
        ▶
      </button>

      <div className="absolute top-4 left-4 bg-slate-900 text-white text-xs px-3 py-1 rounded-full">

        {property.type}

      </div>

      <div className="absolute bottom-4 right-4 bg-white px-4 py-2 rounded-xl shadow-lg">

        <p className="text-emerald-600 text-2xl font-bold">
          {property.price}
        </p>

        <p className="text-xs text-gray-500">
          {property.pricePerSqft} / Sq.ft
        </p>

      </div>

    </div>
  );
}