import { useState } from "react";

export default function PostPropertyModal({
  closeModal
}) {

  const [formData, setFormData] =
    useState({
      projectName: "",
      location: "",
      propertyType: "",
      mobile: ""
    });

  const handleChange = (e) => {

    setFormData({
      ...formData,
      [e.target.name]:
        e.target.value
    });
  };

  const handleSubmit = async (e) => {

    e.preventDefault();

    // INSTANT SUCCESS MESSAGE
    alert(
      "Property Submitted Successfully"
    );

    // CLOSE MODAL IMMEDIATELY
    closeModal();

    // RESET FORM
    setFormData({
      projectName: "",
      location: "",
      propertyType: "",
      mobile: ""
    });

    // SEND DATA IN BACKGROUND
    fetch(
      "https://script.google.com/macros/s/AKfycbwhiJwDbv53fqunbSGV07N3uyDCeOULDLpOwP2baSVZRUrWnncn83rhBRm1uTnxZEahMg/exec",
      {
        method: "POST",
        mode: "no-cors",
        headers: {
          "Content-Type":
            "application/json"
        },
        body: JSON.stringify(
          formData
        )
      }
    ).catch((error) =>
      console.log(error)
    );
  };

  return (

    <div className="
      fixed
      inset-0
      bg-black/60
      z-[100]
      flex
      items-center
      justify-center
      p-3
    ">

      {/* MODAL */}
      <div className="
        w-full
        max-w-md
        bg-white
        rounded-3xl
        p-5
        shadow-2xl
        relative
      ">

        {/* CLOSE BUTTON */}
        <button
          onClick={closeModal}
          className="
            absolute
            right-4
            top-4
            text-xl
            font-bold
            text-gray-500
          "
        >
          ×
        </button>

        {/* TITLE */}
        <h2 className="
          text-2xl
          font-bold
          text-slate-800
          mb-2
        ">
          Post Property
        </h2>

        <p className="
          text-sm
          text-gray-500
          mb-5
        ">
          Fill Your Properties,
          our team will contact you.
        </p>

        {/* FORM */}
        <form
          onSubmit={handleSubmit}
          className="space-y-4"
        >

          {/* PROJECT NAME */}
          <input
            type="text"
            name="projectName"
            placeholder="Project Name"
            required
            value={formData.projectName}
            onChange={handleChange}
            className="
              w-full
              h-11
              px-4
              rounded-xl
              border
              border-gray-200
              outline-none
              focus:ring-2
              focus:ring-emerald-400
            "
          />

          {/* LOCATION */}
          <input
            type="text"
            name="location"
            placeholder="Property Location"
            required
            value={formData.location}
            onChange={handleChange}
            className="
              w-full
              h-11
              px-4
              rounded-xl
              border
              border-gray-200
              outline-none
              focus:ring-2
              focus:ring-emerald-400
            "
          />

          {/* PROPERTY TYPE */}
          <select
            name="propertyType"
            required
            value={formData.propertyType}
            onChange={handleChange}
            className="
              w-full
              h-11
              px-4
              rounded-xl
              border
              border-gray-200
              outline-none
              focus:ring-2
              focus:ring-emerald-400
            "
          >

            <option value="">
              Select Property Type
            </option>

            <option value="Plot">
              Plots
            </option>

            <option value="Apartment">
              Apartments
            </option>

            <option value="Villa">
              Villas
            </option>

            <option value="Others">
              Others
            </option>

          </select>

          {/* MOBILE */}
          <input
            type="tel"
            name="mobile"
            placeholder="Contact Number"
            required
            value={formData.mobile}
            onChange={handleChange}
            className="
              w-full
              h-11
              px-4
              rounded-xl
              border
              border-gray-200
              outline-none
              focus:ring-2
              focus:ring-emerald-400
            "
          />

          {/* SUBMIT BUTTON */}
          <button
            type="submit"
            className="
              w-full
              h-11
              rounded-xl
              bg-emerald-500
              text-white
              font-bold
              hover:bg-emerald-600
              transition
            "
          >
            Submit Property
          </button>

        </form>

      </div>

    </div>

  );
}