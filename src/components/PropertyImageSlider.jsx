import { useState } from "react";

export default function PropertyImageSlider({
  property
}) {

  const [currentImage, setCurrentImage] =
    useState(0);

  const totalImages =
    property.images?.length || 1;

  const nextImage = (e) => {

    e.stopPropagation();

    setCurrentImage(
      (prev) =>
        (prev + 1) % totalImages
    );
  };

  const prevImage = (e) => {

    e.stopPropagation();

    setCurrentImage((prev) =>
      prev === 0
        ? totalImages - 1
        : prev - 1
    );
  };

  return (
    <div className="relative w-full h-full">

      <img
        src={
          property.images?.[
            currentImage
          ] || property.image
        }
        alt={property.projectName}
        loading="lazy"
        className="w-full h-full object-cover"
      />

      {/* LEFT */}
      {totalImages > 1 && (
        <button
          onClick={prevImage}
          className="
            absolute
            left-1
            top-1/2
            -translate-y-1/2
            bg-white/80
            w-6
            h-6
            rounded-full
            text-xs
          "
        >
          ◀
        </button>
      )}

      {/* RIGHT */}
      {totalImages > 1 && (
        <button
          onClick={nextImage}
          className="
            absolute
            right-1
            top-1/2
            -translate-y-1/2
            bg-white/80
            w-6
            h-6
            rounded-full
            text-xs
          "
        >
          ▶
        </button>
      )}

    </div>
  );
}