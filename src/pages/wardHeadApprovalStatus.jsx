import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const WardHeadApprovalStatus = () => {
  const navigate = useNavigate();

  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

  // ==========================================
  // States
  // ==========================================

  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(false);
  const [statusLoading, setStatusLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [wardHead, setWardHead] = useState(null);

  // ==========================================
  // Get Phone From LocalStorage
  // Register ke baad phone save kiya hoga
  // ==========================================

  useEffect(() => {
    const savedPhone = localStorage.getItem(
      "wardHeadApprovalPhone"
    );

    if (savedPhone) {
      setPhone(savedPhone);
      checkApprovalStatus(savedPhone);
    }
  }, []);

  // ==========================================
  // Check Approval Status
  // ==========================================

  const checkApprovalStatus = async (
    phoneNumber = phone
  ) => {
    if (!phoneNumber.trim()) {
      setMessage(
        "Please enter your registered mobile number"
      );
      return;
    }

    if (!/^\d{10}$/.test(phoneNumber.trim())) {
      setMessage(
        "Please enter a valid 10 digit mobile number"
      );
      return;
    }

    try {
      setLoading(true);
      setStatusLoading(true);
      setMessage("");

      const response = await fetch(
        `${BACKEND_URL}/api/ward-head/auth/approval-status?phone=${phoneNumber.trim()}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const data = await response.json();

      if (!response.ok) {
        setWardHead(null);

        setMessage(
          data.message ||
            "Unable to check approval status"
        );

        return;
      }

      setWardHead(data.wardHead);

      localStorage.setItem(
        "wardHeadApprovalPhone",
        phoneNumber.trim()
      );

    } catch (error) {
      console.error(
        "Approval Status Error:",
        error
      );

      setWardHead(null);

      setMessage(
        "Unable to connect to server"
      );
    } finally {
      setLoading(false);
      setStatusLoading(false);
    }
  };

  // ==========================================
  // Form Submit
  // ==========================================

  const handleSubmit = (e) => {
    e.preventDefault();

    checkApprovalStatus();
  };

  // ==========================================
  // Status UI
  // ==========================================

  const renderStatus = () => {
    if (!wardHead) {
      return null;
    }

    // ========================================
    // PENDING
    // ========================================

    if (wardHead.approvalStatus === "pending") {
      return (
        <div className="mt-6 rounded-xl border border-yellow-200 bg-yellow-50 p-5 text-center">
          <div className="mb-3 text-4xl">
            ⏳
          </div>

          <h2 className="text-lg font-bold text-yellow-800">
            Approval Pending
          </h2>

          <p className="mt-2 text-sm text-yellow-700">
            Your Ward Head registration has been
            submitted successfully.
          </p>

          <p className="mt-2 text-sm text-yellow-700">
            Please wait for Super Admin approval.
          </p>

          <div className="mt-4 rounded-lg bg-white p-3">
            <p className="text-sm text-gray-500">
              Registered Name
            </p>

            <p className="font-semibold text-gray-800">
              {wardHead.name}
            </p>
          </div>
        </div>
      );
    }

    // ========================================
    // APPROVED
    // ========================================

    if (wardHead.approvalStatus === "approved") {
      return (
        <div className="mt-6 rounded-xl border border-green-200 bg-green-50 p-5 text-center">
          <div className="mb-3 text-4xl">
            ✅
          </div>

          <h2 className="text-lg font-bold text-green-800">
            Registration Approved
          </h2>

          <p className="mt-2 text-sm text-green-700">
            Congratulations! Your Ward Head account
            has been approved by the Super Admin.
          </p>

          <p className="mt-2 text-sm text-green-700">
            You can now login and access your Ward
            Head dashboard.
          </p>

          <button
            type="button"
            onClick={() => {
              navigate("/ward-head/login");
            }}
            className="mt-5 w-full rounded-lg bg-green-600 px-4 py-3 font-semibold text-white transition hover:bg-green-700"
          >
            Go To Login
          </button>
        </div>
      );
    }

    // ========================================
    // REJECTED
    // ========================================

    if (wardHead.approvalStatus === "rejected") {
      return (
        <div className="mt-6 rounded-xl border border-red-200 bg-red-50 p-5 text-center">
          <div className="mb-3 text-4xl">
            ❌
          </div>

          <h2 className="text-lg font-bold text-red-800">
            Registration Rejected
          </h2>

          <p className="mt-2 text-sm text-red-700">
            Your Ward Head registration was not
            approved.
          </p>

          {wardHead.rejectionReason && (
            <div className="mt-4 rounded-lg bg-white p-4 text-left">
              <p className="text-sm font-semibold text-gray-700">
                Rejection Reason
              </p>

              <p className="mt-1 text-sm text-red-600">
                {wardHead.rejectionReason}
              </p>
            </div>
          )}

          <button
            type="button"
            onClick={() => {
              navigate("/ward-head/register");
            }}
            className="mt-5 w-full rounded-lg bg-red-600 px-4 py-3 font-semibold text-white transition hover:bg-red-700"
          >
            Register Again
          </button>
        </div>
      );
    }

    return null;
  };

  // ==========================================
  // Main UI
  // ==========================================

  return (
    <div className="min-h-screen bg-gray-100 px-4 py-10">
      <div className="mx-auto w-full max-w-md">

        {/* Card */}

        <div className="rounded-2xl bg-white p-6 shadow-lg">

          {/* Header */}

          <div className="mb-6 text-center">
            <h1 className="text-2xl font-bold text-gray-900">
              Registration Status
            </h1>

            <p className="mt-2 text-sm text-gray-500">
              Check your Ward Head registration
              approval status
            </p>
          </div>

          {/* Phone Form */}

          <form onSubmit={handleSubmit}>

            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700">
                Registered Mobile Number
              </label>

              <input
                type="tel"
                value={phone}
                onChange={(e) => {
                  setPhone(
                    e.target.value
                      .replace(/\D/g, "")
                      .slice(0, 10)
                  );

                  setWardHead(null);
                  setMessage("");
                }}
                placeholder="Enter registered mobile number"
                maxLength="10"
                className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className={`mt-5 w-full rounded-lg px-4 py-3 font-semibold text-white transition ${
                loading
                  ? "cursor-not-allowed bg-blue-400"
                  : "bg-blue-600 hover:bg-blue-700"
              }`}
            >
              {loading
                ? "Checking Status..."
                : "Check Approval Status"}
            </button>

          </form>

          {/* Error Message */}

          {message && (
            <div className="mt-5 rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-700">
              {message}
            </div>
          )}

          {/* Status */}

          {!statusLoading && renderStatus()}

          {/* Back To Login */}

          <div className="mt-6 text-center">
            <p className="text-sm text-gray-500">
              Already approved?
            </p>

            <button
              type="button"
              onClick={() => {
                navigate("/ward-head/login");
              }}
              className="mt-1 text-sm font-semibold text-blue-600 hover:text-blue-700"
            >
              Go to Login
            </button>
          </div>

        </div>

      </div>
    </div>
  );
};

export default WardHeadApprovalStatus;