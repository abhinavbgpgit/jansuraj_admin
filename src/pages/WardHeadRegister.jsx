import React, { useMemo, useState } from "react";
import { Link } from "react-router-dom";

import areaData from "../data/area.json";
import districts from "../data/districts.json";

// ==================================
// SEARCHABLE LOCATION PICKER
// ==================================

function LocationPicker({ districtId, value, onChange, type }) {
  const [search, setSearch] = useState("");

  const [open, setOpen] = useState(false);

  const [inputValue, setInputValue] = useState("");

  // ==================================
  // SELECTED DISTRICT DATA
  // ==================================

  const district = areaData?.districts?.[districtId];

  // ==================================
  // OPTIONS
  // Same logic as Member Join page
  // ==================================

  const locations = useMemo(() => {
    // District
    if (type === "district") {
      // Currently area.json me
      // mainly Bhagalpur data available hai
      return districts.filter((item) => item.id === "BHAGALPUR");
    }

    // District required
    if (!district) {
      return [];
    }

    // Block
    if (type === "block") {
      return district?.rural?.blocks || [];
    }

    // Panchayat
    if (type === "panchayat") {
      return district?.rural?.panchayats || [];
    }

    // Urban Local Body
    if (type === "localBody") {
      return district?.urban?.local_bodies || [];
    }

    return [];
  }, [district, type]);

  // ==================================
  // SELECTED ITEM
  // ==================================

  const selected = locations.find((item) => item.id === value);

  // ==================================
  // SEARCH
  // ==================================

  const normalizedSearch = search.trim().toLowerCase();

  const filtered = locations.filter((item) => {
    const hindiName = String(item.name || "").toLowerCase();

    const englishName = String(item.name_en || "").toLowerCase();

    const id = String(item.id || "").toLowerCase();

    if (!normalizedSearch) {
      return true;
    }

    return (
      hindiName.includes(normalizedSearch) ||
      englishName.includes(normalizedSearch) ||
      id.includes(normalizedSearch)
    );
  });

  // ==================================
  // TITLE
  // ==================================

  const title =
    type === "district"
      ? "District"
      : type === "block"
      ? "Block"
      : type === "panchayat"
      ? "Panchayat"
      : "Local Body";

  // ==================================
  // PLACEHOLDER
  // ==================================

  const placeholder =
    type === "district"
      ? "Search district"
      : type === "block"
      ? "Search block"
      : type === "panchayat"
      ? "Search panchayat"
      : "Search local body";

  // ==================================
  // NO DATA MESSAGE
  // ==================================

  const noDataMessage =
    type === "district"
      ? "No district found"
      : type === "block"
      ? "No block found for this district"
      : type === "panchayat"
      ? "No panchayat found for this district"
      : "No local body found for this district";

  return (
    <div className="relative">
      {/* LABEL */}

      <label className="mb-2 block text-sm font-medium text-slate-700">
        {title}
      </label>

      {/* INPUT */}

      <div className="relative">
        <input
          type="text"
          value={
            value
              ? inputValue || selected?.name || selected?.name_en || ""
              : search
          }
          placeholder={placeholder}
          disabled={type !== "district" && !districtId}
          onFocus={() => {
            if (type !== "district" && !districtId) {
              return;
            }

            setOpen(true);

            if (value && selected) {
              const selectedName = selected.name || selected.name_en || "";

              setInputValue(selectedName);

              setSearch(selectedName);
            }
          }}
          onChange={(e) => {
            const nextValue = e.target.value;

            setInputValue(nextValue);

            setSearch(nextValue);

            // Existing selection remove
            if (value) {
              onChange("");
            }

            setOpen(true);
          }}
          className={`w-full rounded-lg border border-slate-300 px-4 py-3 pr-10 outline-none transition focus:border-slate-900 ${
            type !== "district" && !districtId
              ? "cursor-not-allowed bg-slate-100 text-slate-400"
              : ""
          }`}
        />

        {/* SEARCH ICON */}

        <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-slate-400">
          🔍
        </span>
      </div>

      {/* DROPDOWN */}

      {open && (type === "district" || districtId) && (
        <>
          {/* OUTSIDE CLICK */}

          <div
            className="fixed inset-0 z-20"
            onClick={() => {
              setOpen(false);
            }}
          />

          {/* OPTIONS */}

          <div className="absolute left-0 right-0 top-full z-30 mt-1 max-h-64 overflow-y-auto rounded-lg border border-slate-200 bg-white shadow-lg">
            {filtered.length > 0 ? (
              filtered.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => {
                    onChange(item.id);

                    setInputValue(item.name || item.name_en || "");

                    setSearch("");

                    setOpen(false);
                  }}
                  className="flex w-full items-center justify-between px-4 py-3 text-left transition hover:bg-slate-50"
                >
                  <div>
                    {/* HINDI NAME */}

                    <p className="text-sm font-medium text-slate-700">
                      {item.name || item.name_en}
                    </p>

                    {/* ENGLISH NAME */}

                    {item.name_en && (
                      <p className="mt-1 text-xs text-slate-400">
                        {item.name_en}
                      </p>
                    )}
                  </div>

                  <span className="text-slate-300">›</span>
                </button>
              ))
            ) : (
              <div className="px-4 py-5 text-center text-sm text-slate-500">
                {noDataMessage}
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
}

// ==================================
// WARD HEAD REGISTER
// ==================================

const WardHeadRegister = () => {
  // ==================================
  // Backend URL
  // ==================================

  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

  // ==================================
  // Form State
  // ==================================

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    password: "",
    confirmPassword: "",

    photo: "",

    district: "",
    areaType: "",

    localBody: "",

    block: "",
    panchayat: "",

    ward: "",
  });

  // ==================================
  // UI States
  // ==================================

  const [loading, setLoading] = useState(false);

  const [error, setError] = useState("");

  const [success, setSuccess] = useState(false);

  const [successMessage, setSuccessMessage] = useState("");

  // ==================================
  // Handle Input Change
  // ==================================

  const handleChange = (e) => {
    const { name, value } = e.target;

    // ==================================
    // MOBILE NUMBER
    // ==================================

    if (name === "phone") {
      const numbersOnly = value.replace(/\D/g, "").slice(0, 10);

      setFormData((prev) => ({
        ...prev,

        phone: numbersOnly,
      }));

      return;
    }

    // ==================================
    // DISTRICT CHANGE
    // Reset all location data
    // ==================================

    if (name === "district") {
      setFormData((prev) => ({
        ...prev,

        district: value,

        areaType: "",

        localBody: "",

        block: "",

        panchayat: "",

        ward: "",
      }));

      return;
    }

    // ==================================
    // AREA TYPE CHANGE
    // ==================================

    if (name === "areaType") {
      setFormData((prev) => ({
        ...prev,

        areaType: value,

        // Urban
        localBody: "",

        // Rural
        block: "",

        panchayat: "",

        ward: "",
      }));

      return;
    }

    // ==================================
    // BLOCK CHANGE
    // Panchayat reset
    // ==================================

    if (name === "block") {
      setFormData((prev) => ({
        ...prev,

        block: value,

        panchayat: "",

        ward: "",
      }));

      return;
    }

    // ==================================
    // PANCHAYAT CHANGE
    // ==================================

    if (name === "panchayat") {
      setFormData((prev) => ({
        ...prev,

        panchayat: value,

        ward: "",
      }));

      return;
    }

    // ==================================
    // LOCAL BODY CHANGE
    // ==================================

    if (name === "localBody") {
      setFormData((prev) => ({
        ...prev,

        localBody: value,

        ward: "",
      }));

      return;
    }

    // ==================================
    // NORMAL INPUT
    // ==================================

    setFormData((prev) => ({
      ...prev,

      [name]: value,
    }));
  };

  // ==================================
  // HANDLE LOCATION PICKER
  // ==================================

  const handleLocationChange = (field, value) => {
    // ==================================
    // DISTRICT
    // ==================================

    if (field === "district") {
      handleChange({
        target: {
          name: "district",

          value,
        },
      });

      return;
    }

    // ==================================
    // BLOCK
    // ==================================

    if (field === "block") {
      handleChange({
        target: {
          name: "block",

          value,
        },
      });

      return;
    }

    // ==================================
    // PANCHAYAT
    // ==================================

    if (field === "panchayat") {
      handleChange({
        target: {
          name: "panchayat",

          value,
        },
      });

      return;
    }

    // ==================================
    // LOCAL BODY
    // ==================================

    if (field === "localBody") {
      handleChange({
        target: {
          name: "localBody",

          value,
        },
      });

      return;
    }
  };

  // ==================================
  // Submit Registration
  // ==================================

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");

    // ==================================
    // BACKEND URL
    // ==================================

    if (!BACKEND_URL) {
      setError("VITE_BACKEND_URL is not configured");

      return;
    }

    // ==================================
    // BASIC VALIDATION
    // ==================================

    if (!formData.name.trim()) {
      setError("Please enter your name");

      return;
    }

    if (!/^\d{10}$/.test(formData.phone)) {
      setError("Please enter a valid 10 digit mobile number");

      return;
    }

    if (formData.password.length < 6) {
      setError("Password must be at least 6 characters");

      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError("Password and confirm password do not match");

      return;
    }

    // ==================================
    // DISTRICT
    // ==================================

    if (!formData.district) {
      setError("Please select district");

      return;
    }

    // ==================================
    // AREA TYPE
    // ==================================

    if (!formData.areaType) {
      setError("Please select area type");

      return;
    }

    // ==================================
    // URBAN VALIDATION
    // ==================================

    if (formData.areaType === "urban" && !formData.localBody) {
      setError("Please select local body");

      return;
    }

    // ==================================
    // RURAL VALIDATION
    // ==================================

    if (formData.areaType === "rural" && !formData.block) {
      setError("Please select block");

      return;
    }

    if (formData.areaType === "rural" && !formData.panchayat) {
      setError("Please select panchayat");

      return;
    }

    // ==================================
    // WARD VALIDATION
    // ==================================

    if (!formData.ward.trim()) {
      setError("Please enter ward number");

      return;
    }

    // ==================================
    // API CALL
    // ==================================

    try {
      setLoading(true);

      const response = await fetch(`${BACKEND_URL}/api/ward-head/auth/create`, {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
        },

        credentials: "include",

        body: JSON.stringify({
          name: formData.name.trim(),

          phone: formData.phone.trim(),

          password: formData.password,

          photo: formData.photo.trim(),

          // ==================================
          // LOCATION IDs
          // Same as Member Join
          // ==================================

          district: formData.district,

          areaType: formData.areaType,

          localBody: formData.areaType === "urban" ? formData.localBody : "",

          block: formData.areaType === "rural" ? formData.block : "",

          panchayat: formData.areaType === "rural" ? formData.panchayat : "",

          ward: formData.ward.trim(),
        }),
      });

      const data = await response.json();

      // ==================================
      // API ERROR
      // ==================================

      if (!response.ok) {
        setError(data.message || "Unable to submit registration request");

        return;
      }

      // ==================================
      // SUCCESS
      // ==================================

      setSuccess(true);

      setSuccessMessage(
        data.message ||
          "Your Ward Head registration request has been submitted successfully."
      );
    } catch (error) {
      console.error("Ward Head Registration Error:", error);

      setError("Unable to connect to server. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // ==================================
  // SUCCESS SCREEN
  // ==================================

  if (success) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-100 px-4 py-10">
        <div className="w-full max-w-lg rounded-2xl bg-white p-8 shadow-xl">
          <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-green-100 text-3xl">
            ✓
          </div>

          <h1 className="text-2xl font-bold text-slate-900">
            Registration Request Submitted
          </h1>

          <p className="mt-4 text-sm leading-6 text-slate-600">
            {successMessage}
          </p>

          <div className="mt-6 rounded-xl border border-yellow-200 bg-yellow-50 p-4">
            <p className="font-semibold text-yellow-800">Approval Pending</p>

            <p className="mt-1 text-sm text-yellow-700">
              Your Ward Head account is currently waiting for Super Admin
              approval.
            </p>
          </div>

          <div className="mt-4 rounded-xl bg-slate-50 p-4">
            <p className="text-sm text-slate-600">
              You will not be able to access the Ward Head Admin Panel until
              your account is approved by the Super Admin.
            </p>
          </div>

          <Link
            to="/ward-head/login"
            className="mt-6 flex w-full items-center justify-center rounded-xl bg-slate-900 px-4 py-3 font-semibold text-white transition hover:bg-slate-800"
          >
            Go to Login
          </Link>
        </div>
      </div>
    );
  }

  // ==================================
  // REGISTER FORM
  // ==================================

  return (
    <div className="min-h-screen bg-slate-100 px-4 py-10">
      <div className="mx-auto w-full max-w-2xl">
        {/* HEADER */}

        <div className="mb-6 text-center">
          <h1 className="text-3xl font-bold text-slate-900">
            Ward Head Registration
          </h1>

          <p className="mt-2 text-sm text-slate-500">
            Submit your details for Super Admin approval.
          </p>
        </div>

        {/* FORM CARD */}

        <div className="rounded-2xl bg-white p-6 shadow-lg sm:p-8">
          {/* ERROR */}

          {error && (
            <div className="mb-5 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            {/* ============================== */}
            {/* BASIC DETAILS */}
            {/* ============================== */}

            <h2 className="mb-4 text-lg font-bold text-slate-800">
              Basic Details
            </h2>

            <div className="grid gap-4 md:grid-cols-2">
              {/* NAME */}

              <div>
                <label className="mb-2 block text-sm font-medium text-slate-700">
                  Full Name
                </label>

                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Enter full name"
                  className="w-full rounded-lg border border-slate-300 px-4 py-3 outline-none transition focus:border-slate-900"
                />
              </div>

              {/* PHONE */}

              <div>
                <label className="mb-2 block text-sm font-medium text-slate-700">
                  Mobile Number
                </label>

                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="10 digit mobile number"
                  maxLength="10"
                  className="w-full rounded-lg border border-slate-300 px-4 py-3 outline-none transition focus:border-slate-900"
                />
              </div>
            </div>

            {/* PHOTO */}

            <div className="mt-4">
              <label className="mb-2 block text-sm font-medium text-slate-700">
                Profile Photo URL
                <span className="ml-1 text-slate-400">(Optional)</span>
              </label>

              <input
                type="text"
                name="photo"
                value={formData.photo}
                onChange={handleChange}
                placeholder="Enter photo URL"
                className="w-full rounded-lg border border-slate-300 px-4 py-3 outline-none transition focus:border-slate-900"
              />
            </div>

            {/* ============================== */}
            {/* PASSWORD */}
            {/* ============================== */}

            <div className="mt-8">
              <h2 className="mb-4 text-lg font-bold text-slate-800">
                Account Password
              </h2>

              <div className="grid gap-4 md:grid-cols-2">
                {/* PASSWORD */}

                <div>
                  <label className="mb-2 block text-sm font-medium text-slate-700">
                    Password
                  </label>

                  <input
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="Minimum 6 characters"
                    className="w-full rounded-lg border border-slate-300 px-4 py-3 outline-none transition focus:border-slate-900"
                  />
                </div>

                {/* CONFIRM PASSWORD */}

                <div>
                  <label className="mb-2 block text-sm font-medium text-slate-700">
                    Confirm Password
                  </label>

                  <input
                    type="password"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    placeholder="Confirm password"
                    className="w-full rounded-lg border border-slate-300 px-4 py-3 outline-none transition focus:border-slate-900"
                  />
                </div>
              </div>
            </div>

            {/* ============================== */}
            {/* LOCATION */}
            {/* ============================== */}

            <div className="mt-8">
              <h2 className="mb-4 text-lg font-bold text-slate-800">
                Assigned Location
              </h2>

              <div className="grid gap-4 md:grid-cols-2">
                {/* DISTRICT */}

                <LocationPicker
                  type="district"
                  districtId={formData.district}
                  value={formData.district}
                  onChange={(value) => handleLocationChange("district", value)}
                />

                {/* AREA TYPE */}

                <div>
                  <label className="mb-2 block text-sm font-medium text-slate-700">
                    Area Type
                  </label>

                  <select
                    name="areaType"
                    value={formData.areaType}
                    disabled={!formData.district}
                    onChange={handleChange}
                    className="w-full rounded-lg border border-slate-300 bg-white px-4 py-3 outline-none transition focus:border-slate-900 disabled:cursor-not-allowed disabled:bg-slate-100 disabled:text-slate-400"
                  >
                    <option value="">Select area type</option>

                    <option value="rural">Rural</option>

                    <option value="urban">Urban</option>
                  </select>
                </div>
              </div>

              {/* ============================== */}
              {/* URBAN */}
              {/* ============================== */}

              {formData.areaType === "urban" && (
                <div className="mt-4">
                  <LocationPicker
                    type="localBody"
                    districtId={formData.district}
                    value={formData.localBody}
                    onChange={(value) =>
                      handleLocationChange("localBody", value)
                    }
                  />
                </div>
              )}

              {/* ============================== */}
              {/* RURAL */}
              {/* ============================== */}

              {formData.areaType === "rural" && (
                <div className="mt-4 grid gap-4 md:grid-cols-2">
                  {/* BLOCK */}

                  <LocationPicker
                    type="block"
                    districtId={formData.district}
                    value={formData.block}
                    onChange={(value) => handleLocationChange("block", value)}
                  />

                  {/* PANCHAYAT */}

                  <LocationPicker
                    type="panchayat"
                    districtId={formData.district}
                    value={formData.panchayat}
                    onChange={(value) =>
                      handleLocationChange("panchayat", value)
                    }
                  />
                </div>
              )}

              {/* ============================== */}
              {/* WARD */}
              {/* ============================== */}

              <div className="mt-4">
                <label className="mb-2 block text-sm font-medium text-slate-700">
                  Ward Number
                </label>

                <input
                  type="text"
                  name="ward"
                  value={formData.ward}
                  onChange={(e) => {
                    const numbersOnly = e.target.value.replace(/\D/g, "");

                    setFormData((prev) => ({
                      ...prev,

                      ward: numbersOnly,
                    }));
                  }}
                  placeholder="Enter ward number"
                  className="w-full rounded-lg border border-slate-300 px-4 py-3 outline-none transition focus:border-slate-900"
                />
              </div>
            </div>

            {/* ============================== */}
            {/* APPROVAL NOTICE */}
            {/* ============================== */}

            <div className="mt-6 rounded-xl border border-blue-100 bg-blue-50 p-4">
              <p className="text-sm font-semibold text-blue-800">
                Super Admin Approval Required
              </p>

              <p className="mt-1 text-sm text-blue-700">
                After submitting your registration, your account will remain
                pending until approved by the Super Admin.
              </p>
            </div>

            {/* ============================== */}
            {/* SUBMIT */}
            {/* ============================== */}

            <button
              type="submit"
              disabled={loading}
              className={`mt-6 w-full rounded-xl px-4 py-3 font-semibold text-white transition ${
                loading
                  ? "cursor-not-allowed bg-slate-400"
                  : "bg-slate-900 hover:bg-slate-800"
              }`}
            >
              {loading ? "Sending Request..." : "Send for Approval"}
            </button>

            {/* ============================== */}
            {/* LOGIN LINK */}
            {/* ============================== */}

            <p className="mt-6 text-center text-sm text-slate-600">
              Already registered?
              <Link
                to="/ward-head/login"
                className="ml-1 font-semibold text-slate-900 hover:underline"
              >
                Login here
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default WardHeadRegister;
