import { useState } from "react";

import EnquiryModal from "./EnquiryModal";

export default function EnquiryButton({
  property
}) {

  const [showForm, setShowForm] =
    useState(false);

  const submitSavedLead = async () => {

    const userName =
      localStorage.getItem("userName");

    const mobile =
      localStorage.getItem("mobile");

    try {

      await fetch(
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
      );

      const useDifferent =
        confirm(
          `Your enquiry submitted successfully.

Name: ${userName}
Mobile: ${mobile}

Press OK to continue.
Press Cancel to use different number.`
        );

      if (!useDifferent) {

        localStorage.removeItem(
          "userName"
        );

        localStorage.removeItem(
          "mobile"
        );

        setShowForm(true);
      }

    } catch {

      alert(
        "Something went wrong"
      );

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