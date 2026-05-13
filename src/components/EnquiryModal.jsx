import { useState } from "react";

export default function EnquiryModal({
  property,
  showForm,
  setShowForm
}) {

  const [userName, setUserName] =
    useState("");

  const [mobile, setMobile] =
    useState("");

  const submitLead = () => {

    if (!userName || !mobile) {

      alert(
        "Please enter name and mobile number"
      );

      return;
    }

    // SAVE USER IN LOCAL STORAGE
    localStorage.setItem(
      "userName",
      userName
    );

    localStorage.setItem(
      "mobile",
      mobile
    );

    // CLOSE MODAL FAST
    setShowForm(false);

    // SHOW SUCCESS ALERT FAST
    alert(
      "Your enquiry submitted successfully."
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

  };

  if (!showForm) return null;

  return (
    <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4">

      <div className="bg-white rounded-3xl p-6 w-full max-w-md">

        <h2 className="text-3xl font-bold text-center mb-6">

          Enquiry Form

        </h2>

        {/* NAME */}
        <input
          type="text"
          placeholder="Your Name"
          value={userName}
          onChange={(e) =>
            setUserName(
              e.target.value
            )
          }
          className="
            w-full
            border
            rounded-xl
            px-4
            py-3
            mb-4
            outline-none
          "
        />

        {/* MOBILE */}
        <input
          type="tel"
          placeholder="Mobile Number"
          value={mobile}
          onChange={(e) =>
            setMobile(
              e.target.value
            )
          }
          className="
            w-full
            border
            rounded-xl
            px-4
            py-3
            mb-6
            outline-none
          "
        />

        {/* BUTTONS */}
        <div className="flex gap-3">

          <button
            onClick={() =>
              setShowForm(false)
            }
            className="
              flex-1
              bg-gray-200
              py-3
              rounded-xl
              font-semibold
            "
          >
            Cancel
          </button>

          <button
            onClick={submitLead}
            className="
              flex-1
              bg-slate-900
              text-white
              py-3
              rounded-xl
              font-semibold
            "
          >
            Submit
          </button>

        </div>

      </div>

    </div>
  );
}