import { useState } from "react";

import EnquiryModal from "./EnquiryModal";

export default function EnquiryButton({
  property,
  variant = "small"
}) {

  const [showForm, setShowForm] =
    useState(false);

  // SUBMIT SAVED USER DATA
  const submitSavedLead = () => {

    const userName =
      localStorage.getItem("userName");

    const mobile =
      localStorage.getItem("mobile");

    const useDifferent =
      window.confirm(
        `Your enquiry submitted successfully.

Name: ${userName}
Mobile: ${mobile}

Press OK to continue.
Press Cancel to use different number.`
      );

    fetch(
      "https://script.google.com/macros/s/AKfycbxcqOS_Anq0urwwO2o-63Nt3QERJDXWxB2TFyx7XYJrwODVpx7ZIor7-fQ6OZ6k_cr5/exec",
      {
        method: "POST",
        mode: "no-cors",
        headers: {
          "Content-Type":
            "application/json"
        },
        body: JSON.stringify({
          name: userName,
          mobile: mobile,
          property:
            property.projectName,
          location:
            property.location
        })
      }
    ).catch(() => {

      console.log(
        "Background submit failed"
      );

    });

    if (!useDifferent) {

      localStorage.removeItem(
        "userName"
      );

      localStorage.removeItem(
        "mobile"
      );

      setShowForm(true);

    }

  };

  const openEnquiry = () => {

    const savedName =
      localStorage.getItem("userName");

    const savedMobile =
      localStorage.getItem("mobile");

    if (
      savedName &&
      savedMobile
    ) {

      submitSavedLead();

      return;

    }

    setShowForm(true);

  };

  // SMALL BUTTON
  const smallButtonClass = `
    bg-gradient-to-r
    from-emerald-500
    to-emerald-700
    hover:from-emerald-600
    hover:to-emerald-800
    text-white
    text-[10px]
    px-2.5
    py-1.5
    rounded-md
    font-semibold
    whitespace-nowrap
    shadow-md
    transition
    duration-300
  `;

  // LARGE BUTTON
  const largeButtonClass = `
  flex-1
  bg-gradient-to-r
  from-emerald-500
  to-emerald-700
  hover:from-emerald-600
  hover:to-emerald-800
  text-white
  text-sm
  px-4
  py-3
  rounded-xl
  font-semibold
  shadow-lg
  transition
  duration-300
`;

  return (
    <>
      <button
        onClick={openEnquiry}
        className={
          variant === "large"
            ? largeButtonClass
            : smallButtonClass
        }
      >
        📞 Enquire
      </button>

      <EnquiryModal
        property={property}
        showForm={showForm}
        setShowForm={setShowForm}
      />
    </>
  );
}