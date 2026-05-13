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

  const submitLead = async () => {

    if (!userName || !mobile) {

      alert(
        "Please enter name and mobile number"
      );

      return;
    }

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

      // SAVE USER
      localStorage.setItem(
        "userName",
        userName
      );

      localStorage.setItem(
        "mobile",
        mobile
      );

      setShowForm(false);

      alert(
        "Your enquiry submitted successfully."
      );

    } catch {

      alert(
        "Something went wrong"
      );

    }
  };

  if (!showForm) return null;

  return (
    <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4">

      <div className="bg-white rounded-3xl p-6 w-full max-w-md">

        <h2 className="text-3xl font-bold text-center mb-6">

          Enquiry Form

        </h2>

        <input
          type="text"
          placeholder="Your Name"
          value={userName}
          onChange={(e) =>
            setUserName(
              e.target.value
            )
          }
          className="w-full border rounded-xl px-4 py-3 mb-4"
        />

        <input
          type="tel"
          placeholder="Mobile Number"
          value={mobile}
          onChange={(e) =>
            setMobile(
              e.target.value
            )
          }
          className="w-full border rounded-xl px-4 py-3 mb-6"
        />

        <div className="flex gap-3">

          <button
            onClick={() =>
              setShowForm(false)
            }
            className="flex-1 bg-gray-200 py-3 rounded-xl"
          >
            Cancel
          </button>

          <button
            onClick={submitLead}
            className="flex-1 bg-slate-900 text-white py-3 rounded-xl"
          >
            Submit
          </button>

        </div>

      </div>
    </div>
  );
}