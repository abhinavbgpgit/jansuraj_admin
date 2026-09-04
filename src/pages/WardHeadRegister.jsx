import React, { useState } from "react";
import { Link } from "react-router-dom";

const WardHeadRegister = () => {
  // ==================================
  // Backend URL
  // ==================================

  const BACKEND_URL =
    import.meta.env.VITE_BACKEND_URL;

  // ==================================
  // Form State
  // ==================================

  const [formData, setFormData] =
    useState({
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

  const [loading, setLoading] =
    useState(false);

  const [error, setError] =
    useState("");

  const [success, setSuccess] =
    useState(false);

  const [successMessage, setSuccessMessage] =
    useState("");

  // ==================================
  // Handle Input Change
  // ==================================

  const handleChange = (e) => {
    const { name, value } = e.target;

    // Mobile Number
    if (name === "phone") {
      const numbersOnly =
        value.replace(/\D/g, "").slice(0, 10);

      setFormData((prev) => ({
        ...prev,
        phone: numbersOnly,
      }));

      return;
    }

    // Area Type Change
    if (name === "areaType") {
      setFormData((prev) => ({
        ...prev,

        areaType: value,

        // Reset Urban Fields
        localBody:
          value === "urban"
            ? prev.localBody
            : "",

        // Reset Rural Fields
        block:
          value === "rural"
            ? prev.block
            : "",

        panchayat:
          value === "rural"
            ? prev.panchayat
            : "",
      }));

      return;
    }

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // ==================================
  // Submit Registration
  // ==================================

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");

    // ==================================
    // Basic Validation
    // ==================================

    if (!formData.name.trim()) {
      setError(
        "Please enter your name"
      );
      return;
    }

    if (
      !/^\d{10}$/.test(
        formData.phone
      )
    ) {
      setError(
        "Please enter a valid 10 digit mobile number"
      );
      return;
    }

    if (
      formData.password.length < 6
    ) {
      setError(
        "Password must be at least 6 characters"
      );
      return;
    }

    if (
      formData.password !==
      formData.confirmPassword
    ) {
      setError(
        "Password and confirm password do not match"
      );
      return;
    }

    if (
      !formData.district.trim()
    ) {
      setError(
        "Please enter district"
      );
      return;
    }

    if (!formData.areaType) {
      setError(
        "Please select area type"
      );
      return;
    }

    // ==================================
    // Urban Validation
    // ==================================

    if (
      formData.areaType === "urban" &&
      !formData.localBody.trim()
    ) {
      setError(
        "Please enter local body"
      );
      return;
    }

    // ==================================
    // Rural Validation
    // ==================================

    if (
      formData.areaType === "rural" &&
      !formData.block.trim()
    ) {
      setError(
        "Please enter block"
      );
      return;
    }

    if (
      formData.areaType === "rural" &&
      !formData.panchayat.trim()
    ) {
      setError(
        "Please enter panchayat"
      );
      return;
    }

    // ==================================
    // Ward Validation
    // ==================================

    if (!formData.ward.trim()) {
      setError(
        "Please enter ward number"
      );
      return;
    }

    // ==================================
    // API Call
    // ==================================

    try {
      setLoading(true);

      const response =
        await fetch(
          `${BACKEND_URL}/api/ward-head/auth/create`,
          {
            method: "POST",

            headers: {
              "Content-Type":
                "application/json",
            },

            credentials: "include",

            body: JSON.stringify({
              name:
                formData.name.trim(),

              phone:
                formData.phone.trim(),

              password:
                formData.password,

              photo:
                formData.photo.trim(),

              district:
                formData.district.trim(),

              areaType:
                formData.areaType,

              localBody:
                formData.areaType === "urban"
                  ? formData.localBody.trim()
                  : "",

              block:
                formData.areaType === "rural"
                  ? formData.block.trim()
                  : "",

              panchayat:
                formData.areaType === "rural"
                  ? formData.panchayat.trim()
                  : "",

              ward:
                formData.ward.trim(),
            }),
          }
        );

      const data =
        await response.json();

      // ==================================
      // API Error
      // ==================================

      if (!response.ok) {
        setError(
          data.message ||
            "Unable to submit registration request"
        );

        return;
      }

      // ==================================
      // SUCCESS
      // IMPORTANT:
      // No auto login
      // ==================================

      setSuccess(true);

      setSuccessMessage(
        data.message ||
          "Your Ward Head registration request has been submitted successfully."
      );
    } catch (error) {
      console.error(
        "Ward Head Registration Error:",
        error
      );

      setError(
        "Unable to connect to server. Please try again."
      );
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
            <p className="font-semibold text-yellow-800">
              Approval Pending
            </p>

            <p className="mt-1 text-sm text-yellow-700">
              Your Ward Head account is currently
              waiting for Super Admin approval.
            </p>
          </div>

          <div className="mt-4 rounded-xl bg-slate-50 p-4">
            <p className="text-sm text-slate-600">
              You will not be able to access the
              Ward Head Admin Panel until your
              account is approved by the Super Admin.
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

        {/* Header */}

        <div className="mb-6 text-center">
          <h1 className="text-3xl font-bold text-slate-900">
            Ward Head Registration
          </h1>

          <p className="mt-2 text-sm text-slate-500">
            Submit your details for Super Admin
            approval.
          </p>
        </div>

        {/* Form Card */}

        <div className="rounded-2xl bg-white p-6 shadow-lg sm:p-8">

          {/* Error */}

          {error && (
            <div className="mb-5 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit}>

            {/* ============================== */}
            {/* Basic Details */}
            {/* ============================== */}

            <h2 className="mb-4 text-lg font-bold text-slate-800">
              Basic Details
            </h2>

            <div className="grid gap-4 md:grid-cols-2">

              {/* Name */}

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

              {/* Phone */}

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

            {/* Photo URL */}

            <div className="mt-4">
              <label className="mb-2 block text-sm font-medium text-slate-700">
                Profile Photo URL
                <span className="ml-1 text-slate-400">
                  (Optional)
                </span>
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
            {/* Password */}
            {/* ============================== */}

            <div className="mt-8">

              <h2 className="mb-4 text-lg font-bold text-slate-800">
                Account Password
              </h2>

              <div className="grid gap-4 md:grid-cols-2">

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

                <div>
                  <label className="mb-2 block text-sm font-medium text-slate-700">
                    Confirm Password
                  </label>

                  <input
                    type="password"
                    name="confirmPassword"
                    value={
                      formData.confirmPassword
                    }
                    onChange={handleChange}
                    placeholder="Confirm password"
                    className="w-full rounded-lg border border-slate-300 px-4 py-3 outline-none transition focus:border-slate-900"
                  />
                </div>

              </div>
            </div>

            {/* ============================== */}
            {/* Location */}
            {/* ============================== */}

            <div className="mt-8">

              <h2 className="mb-4 text-lg font-bold text-slate-800">
                Assigned Location
              </h2>

              <div className="grid gap-4 md:grid-cols-2">

                {/* District */}

                <div>
                  <label className="mb-2 block text-sm font-medium text-slate-700">
                    District
                  </label>

                  <input
                    type="text"
                    name="district"
                    value={formData.district}
                    onChange={handleChange}
                    placeholder="Enter district"
                    className="w-full rounded-lg border border-slate-300 px-4 py-3 outline-none transition focus:border-slate-900"
                  />
                </div>

                {/* Area Type */}

                <div>
                  <label className="mb-2 block text-sm font-medium text-slate-700">
                    Area Type
                  </label>

                  <select
                    name="areaType"
                    value={formData.areaType}
                    onChange={handleChange}
                    className="w-full rounded-lg border border-slate-300 bg-white px-4 py-3 outline-none transition focus:border-slate-900"
                  >
                    <option value="">
                      Select area type
                    </option>

                    <option value="rural">
                      Rural
                    </option>

                    <option value="urban">
                      Urban
                    </option>
                  </select>
                </div>

              </div>

              {/* ============================== */}
              {/* Urban Fields */}
              {/* ============================== */}

              {formData.areaType ===
                "urban" && (
                <div className="mt-4">

                  <label className="mb-2 block text-sm font-medium text-slate-700">
                    Local Body
                  </label>

                  <input
                    type="text"
                    name="localBody"
                    value={
                      formData.localBody
                    }
                    onChange={handleChange}
                    placeholder="नगर निगम / नगर परिषद"
                    className="w-full rounded-lg border border-slate-300 px-4 py-3 outline-none transition focus:border-slate-900"
                  />

                </div>
              )}

              {/* ============================== */}
              {/* Rural Fields */}
              {/* ============================== */}

              {formData.areaType ===
                "rural" && (
                <div className="mt-4 grid gap-4 md:grid-cols-2">

                  {/* Block */}

                  <div>
                    <label className="mb-2 block text-sm font-medium text-slate-700">
                      Block
                    </label>

                    <input
                      type="text"
                      name="block"
                      value={
                        formData.block
                      }
                      onChange={handleChange}
                      placeholder="Enter block"
                      className="w-full rounded-lg border border-slate-300 px-4 py-3 outline-none transition focus:border-slate-900"
                    />
                  </div>

                  {/* Panchayat */}

                  <div>
                    <label className="mb-2 block text-sm font-medium text-slate-700">
                      Panchayat
                    </label>

                    <input
                      type="text"
                      name="panchayat"
                      value={
                        formData.panchayat
                      }
                      onChange={handleChange}
                      placeholder="Enter panchayat"
                      className="w-full rounded-lg border border-slate-300 px-4 py-3 outline-none transition focus:border-slate-900"
                    />
                  </div>

                </div>
              )}

              {/* Ward */}

              <div className="mt-4">
                <label className="mb-2 block text-sm font-medium text-slate-700">
                  Ward Number
                </label>

                <input
                  type="text"
                  name="ward"
                  value={formData.ward}
                  onChange={handleChange}
                  placeholder="Example: 1 or ward_01"
                  className="w-full rounded-lg border border-slate-300 px-4 py-3 outline-none transition focus:border-slate-900"
                />
              </div>

            </div>

            {/* ============================== */}
            {/* Approval Notice */}
            {/* ============================== */}

            <div className="mt-6 rounded-xl border border-blue-100 bg-blue-50 p-4">
              <p className="text-sm font-semibold text-blue-800">
                Super Admin Approval Required
              </p>

              <p className="mt-1 text-sm text-blue-700">
                After submitting your registration,
                your account will remain pending until
                approved by the Super Admin.
              </p>
            </div>

            {/* ============================== */}
            {/* Submit */}
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
              {loading
                ? "Sending Request..."
                : "Send for Approval"}
            </button>

            {/* ============================== */}
            {/* Login Link */}
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