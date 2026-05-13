import { useState } from "react";

import EnquiryModal from "./EnquiryModal";

export default function EnquiryButton({
  property
}) {

  const [showForm, setShowForm] =
    useState(false);

  // SUBMIT SAVED USER DATA
  const submitSavedLead = () => {

    const userName =
      localStorage.getItem("userName");

    const mobile =
      localStorage.getItem("mobile");

    // SHOW ALERT IMMEDIATELY
    const useDifferent =
      window.confirm(
        `Your enquiry submitted successfully.

Name: ${userName}
Mobile: ${mobile}

Press OK to continue.
Press Cancel to use different number.`
      );

    // SEND DATA IN BACKGROUND
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

    // USE DIFFERENT NUMBER
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

  // OPEN ENQUIRY
  const openEnquiry = () => {

    const savedName =
      localStorage.getItem("userName");

    const savedMobile =
      localStorage.getItem("mobile");

    // USER ALREADY EXISTS
    if (
      savedName &&
      savedMobile
    ) {

      submitSavedLead();

      return;
    }

    // OPEN FORM
    setShowForm(true);
  };

  return (
    <>
      <button
        onClick={openEnquiry}
        className="
          bg-slate-900
          hover:bg-slate-700
          text-white
          text-[10px]
          px-2.5
          py-1.5
          rounded-md
          font-semibold
          whitespace-nowrap
        "
      >
        Enquiry
      </button>

      <EnquiryModal
        property={property}
        showForm={showForm}
        setShowForm={setShowForm}
      />
    </>
  );
}