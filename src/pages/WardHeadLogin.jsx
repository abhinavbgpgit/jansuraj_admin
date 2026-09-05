import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const WardHeadLogin = () => {
  const navigate = useNavigate();

  // ==================================
  // Backend URL
  // ==================================

  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

  // ==================================
  // Form States
  // ==================================

  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");

  // ==================================
  // UI States
  // ==================================

  const [loading, setLoading] = useState(false);

  const [message, setMessage] = useState("");

  const [messageType, setMessageType] = useState("");

  const [showPassword, setShowPassword] = useState(false);

  // ==================================
  // Handle Login
  // ==================================

  const handleLogin = async (e) => {
    e.preventDefault();

    setMessage("");
    setMessageType("");

    // ==============================
    // Mobile Validation
    // ==============================

    if (!/^\d{10}$/.test(phone.trim())) {
      setMessage("Please enter a valid 10 digit mobile number");

      setMessageType("error");

      return;
    }

    // ==============================
    // Password Validation
    // ==============================

    if (!password.trim()) {
      setMessage("Please enter your password");

      setMessageType("error");

      return;
    }

    try {
      setLoading(true);

      // ==============================
      // Login API
      // ==============================

      const response = await fetch(`${BACKEND_URL}/api/ward-head/auth/login`, {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
        },

        // HttpOnly Cookie
        credentials: "include",

        body: JSON.stringify({
          phone: phone.trim(),
          password,
        }),
      });

      const data = await response.json();

      // ==============================
      // Request Failed
      // ==============================

      if (!response.ok) {
        setMessage(data.message || "Unable to login");

        setMessageType("error");

        return;
      }

      // ==============================
      // Get Ward Head Data
      // ==============================

      const wardHead = data.wardHead;

      const approvalStatus = wardHead?.approvalStatus;

      // ==============================
      // Pending Approval
      // ==============================

      if (approvalStatus === "pending") {
        setMessage(
          "Your registration has been submitted successfully and is waiting for Super Admin approval. You will be able to access the dashboard after approval."
        );

        setMessageType("pending");

        return;
      }

      // ==============================
      // Rejected
      // ==============================

      if (approvalStatus === "rejected") {
        setMessage(
          wardHead?.rejectionReason
            ? `Your registration was rejected: ${wardHead.rejectionReason}`
            : "Your registration request was rejected by the Super Admin."
        );

        setMessageType("error");

        return;
      }

      // ==============================
      // Approved
      // ==============================

      if (approvalStatus === "approved") {
        setMessage("Login successful. Redirecting to dashboard...");

        setMessageType("success");

        // Small delay for success message
        setTimeout(() => {
          navigate("/ward-head/dashboard", {
            replace: true,
          });
        }, 500);

        return;
      }

      // ==============================
      // Unknown Status
      // ==============================

      setMessage(
        "Your account approval status could not be verified. Please contact the administrator."
      );

      setMessageType("error");
    } catch (error) {
      console.error("Ward Head Login Error:", error);

      setMessage("Unable to connect to server. Please try again.");

      setMessageType("error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-gray-50 to-emerald-50 px-4 py-10">
      {/* Background Header */}

      <div className="fixed left-0 top-0 -z-10 h-72 w-full bg-gradient-to-br from-emerald-950 via-emerald-900 to-emerald-800" />

      <div className="mx-auto w-full max-w-md">
        {/* ============================= */}
        {/* Logo / Header */}
        {/* ============================= */}

        <div className="mb-8 text-center">
          <div className="mb-5 inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-white shadow-lg">
            <span className="text-2xl font-bold text-emerald-800">J</span>
          </div>

          <h1 className="text-3xl font-bold tracking-tight text-white">
            JAN SURAJ
          </h1>

          <p className="mt-1 text-sm tracking-[0.3em] text-emerald-100">
            WARD MANAGEMENT
          </p>
        </div>

        {/* ============================= */}
        {/* Login Card */}
        {/* ============================= */}

        <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-2xl">
          {/* ============================= */}
          {/* Card Header */}
          {/* ============================= */}

          <div className="border-b border-slate-100 px-7 pb-6 pt-8">
            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-50">
                <svg
                  className="h-5 w-5 text-emerald-700"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M5.121 17.804A7.969 7.969 0 0112 15c2.21 0 4.21.895 5.657 2.343M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
              </div>

              <div>
                <h2 className="text-xl font-bold text-slate-800">
                  Ward Head Login
                </h2>

                <p className="mt-1 text-sm text-slate-500">
                  Login after Super Admin approval
                </p>
              </div>
            </div>
          </div>

          {/* ============================= */}
          {/* Login Form */}
          {/* ============================= */}

          <form onSubmit={handleLogin} className="space-y-5 p-7">
            {/* ============================= */}
            {/* Message */}
            {/* ============================= */}

            {message && (
              <div
                className={`rounded-xl border px-4 py-3 text-sm font-medium ${
                  messageType === "success"
                    ? "border-emerald-200 bg-emerald-50 text-emerald-700"
                    : messageType === "pending"
                    ? "border-amber-200 bg-amber-50 text-amber-700"
                    : "border-red-200 bg-red-50 text-red-700"
                }`}
              >
                <div className="flex gap-3">
                  <div className="mt-0.5">
                    {messageType === "success"
                      ? "✓"
                      : messageType === "pending"
                      ? "⏳"
                      : "⚠"}
                  </div>

                  <p>{message}</p>
                </div>
              </div>
            )}

            {/* ============================= */}
            {/* Mobile Number */}
            {/* ============================= */}

            <div>
              <label className="mb-2 block text-sm font-semibold text-slate-700">
                Mobile Number
              </label>

              <div className="relative">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4">
                  <svg
                    className="h-5 w-5 text-slate-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M3 5a2 2 0 012-2h2l2 5-2.5 1.5a11 11 0 005 5L11 12l5-2v2a2 2 0 01-2 2h-1C7.477 14 3 9.523 3 4V5z"
                    />
                  </svg>
                </div>

                <input
                  type="tel"
                  value={phone}
                  onChange={(e) =>
                    setPhone(e.target.value.replace(/\D/g, "").slice(0, 10))
                  }
                  placeholder="Enter 10 digit mobile number"
                  maxLength="10"
                  disabled={loading}
                  required
                  className="w-full rounded-xl border border-slate-300 bg-slate-50 py-3 pl-12 pr-4 text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-emerald-600 focus:bg-white focus:ring-4 focus:ring-emerald-100 disabled:cursor-not-allowed disabled:bg-slate-100"
                />
              </div>
            </div>

            {/* ============================= */}
            {/* Password */}
            {/* ============================= */}

            <div>
              <label className="mb-2 block text-sm font-semibold text-slate-700">
                Password
              </label>

              <div className="relative">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4">
                  <svg
                    className="h-5 w-5 text-slate-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M12 15v2m-6 0h12a2 2 0 002-2v-5a2 2 0 00-2-2h-1V6a5 5 0 00-10 0v2H6a5 5 0 00-10 0v2H6a2 2 0 00-2 2v5a2 2 0 002 2z"
                    />
                  </svg>
                </div>

                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  disabled={loading}
                  required
                  className="w-full rounded-xl border border-slate-300 bg-slate-50 py-3 pl-12 pr-16 text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-emerald-600 focus:bg-white focus:ring-4 focus:ring-emerald-100 disabled:cursor-not-allowed disabled:bg-slate-100"
                />

                <button
                  type="button"
                  disabled={loading}
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 px-4 text-sm font-semibold text-emerald-700 transition hover:text-emerald-900 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  {showPassword ? "Hide" : "Show"}
                </button>
              </div>
            </div>

            {/* ============================= */}
            {/* Login Button */}
            {/* ============================= */}

            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-xl bg-gradient-to-r from-emerald-700 to-teal-700 px-5 py-3.5 text-base font-bold text-white shadow-lg transition hover:-translate-y-0.5 hover:shadow-xl focus:outline-none focus:ring-4 focus:ring-emerald-200 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading ? (
                <span className="flex items-center justify-center gap-3">
                  <svg className="h-5 w-5 animate-spin" viewBox="0 0 24 24">
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                      fill="none"
                    />

                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                    />
                  </svg>
                  Checking Account...
                </span>
              ) : (
                <span className="flex items-center justify-center gap-2">
                  Login
                  <span>→</span>
                </span>
              )}
            </button>
          </form>

          {/* ============================= */}
          {/* Register Link */}
          {/* ============================= */}

          <div className="border-t border-slate-100 px-7 py-5 text-center">
            <p className="text-sm text-slate-600">
              Don't have a Ward Head account?
              <button
                type="button"
                disabled={loading}
                onClick={() => navigate("/ward-head/register")}
                className="ml-2 font-bold text-emerald-700 transition hover:text-emerald-800 hover:underline disabled:cursor-not-allowed disabled:opacity-50"
              >
                Register
              </button>
            </p>
          </div>
        </div>

        {/* ============================= */}
        {/* Approval Notice */}
        {/* ============================= */}

        <div className="mt-5 rounded-2xl border border-emerald-100 bg-white/80 p-4 text-center shadow-sm backdrop-blur">
          <p className="text-xs leading-5 text-slate-500">
            New Ward Head registrations require Super Admin approval before
            dashboard access is granted.
          </p>
        </div>

        {/* ============================= */}
        {/* Footer */}
        {/* ============================= */}

        <p className="mt-6 text-center text-xs text-slate-500">
          © {new Date().getFullYear()} JAN SURAJ
        </p>
      </div>
    </div>
  );
};

export default WardHeadLogin;
