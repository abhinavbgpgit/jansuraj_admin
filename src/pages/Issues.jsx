import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

import PageFrame, { Panel, Stat } from "../components/PageFrame";

export default function Issues() {
  // ==========================================
  // STATE
  // ==========================================

  const [issues, setIssues] = useState([]);

  const [statistics, setStatistics] = useState({
    totalIssues: 0,
    pendingIssues: 0,
    inProgressIssues: 0,
    resolvedIssues: 0,
  });

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState("");

  // ==========================================
  // FETCH WARD HEAD ISSUES
  //
  // Backend automatically logged-in Ward Head
  // ke district + areaType + ward +
  // rural/urban location ke according
  // issues return karega
  //
  // GET /api/ward-head/dashboard
  // ==========================================

  useEffect(() => {
    const fetchIssues = async () => {
      try {
        setLoading(true);
        setError("");

        // ======================================
        // BACKEND URL
        // ======================================

        const backendUrl = import.meta.env.VITE_BACKEND_URL;

        if (!backendUrl) {
          throw new Error("VITE_BACKEND_URL is not configured");
        }

        // ======================================
        // WARD HEAD DASHBOARD API
        // ======================================

        const response = await axios.get(
          `${backendUrl}/api/ward-head/dashboard`,
          {
            withCredentials: true,
          }
        );

        // ======================================
        // CHECK RESPONSE
        // ======================================

        if (!response.data?.success) {
          throw new Error(
            response.data?.message || "Failed to load ward issues"
          );
        }

        // ======================================
        // RECENT ISSUES
        //
        // Sirf same ward ke issues
        // backend se aa rahe hain
        // ======================================

        const issuesData = Array.isArray(response.data?.recentIssues)
          ? response.data.recentIssues
          : [];

        // ======================================
        // SET ISSUES
        // ======================================

        setIssues(issuesData);

        // ======================================
        // SET REAL STATISTICS
        // ======================================

        setStatistics({
          totalIssues: response.data?.statistics?.totalIssues || 0,

          pendingIssues: response.data?.statistics?.pendingIssues || 0,

          inProgressIssues: response.data?.statistics?.inProgressIssues || 0,

          resolvedIssues: response.data?.statistics?.resolvedIssues || 0,
        });
      } catch (error) {
        console.error(
          "Ward Head issues fetch error:",
          error.response?.data || error.message
        );

        setError(
          error.response?.data?.message ||
            error.message ||
            "Failed to load ward issues"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchIssues();
  }, []);

  // ==========================================
  // FORMAT ISSUE DATE & TIME
  // ==========================================

  const formatIssueDateTime = (date) => {
    if (!date) {
      return "Date not available";
    }

    return new Date(date).toLocaleString("en-IN", {
      day: "2-digit",

      month: "short",

      year: "numeric",

      hour: "2-digit",

      minute: "2-digit",

      hour12: true,
    });
  };

  // ==========================================
  // FORMAT WARD
  //
  // ward_03 -> Ward 03
  // ==========================================

  const formatWard = (ward) => {
    if (!ward) {
      return "";
    }

    const value = String(ward).trim();

    if (/^ward_\d+$/i.test(value)) {
      return `Ward ${value.replace(/^ward_/i, "")}`;
    }

    return value;
  };

  // ==========================================
  // FORMAT STATUS
  // ==========================================

  const formatStatus = (status) => {
    if (!status) {
      return "Pending";
    }

    const value = String(status).trim().toLowerCase();

    if (value === "in-progress") {
      return "In Progress";
    }

    if (value === "resolved") {
      return "Resolved";
    }

    if (value === "pending") {
      return "Pending";
    }

    return status;
  };

  // ==========================================
  // UI
  // ==========================================

  return (
    <PageFrame
      title="Issues"
      description="Track every public issue from registration to resolution."
      action="＋ Register issue"
    >
      {/* ======================================
          ISSUE STATS
      ====================================== */}

      <div
        className="
          grid
          gap-4
          sm:grid-cols-3
        "
      >
        {/* TOTAL */}

        <Stat label="Total issues" value={statistics.totalIssues} change="" />

        {/* PENDING */}

        <Stat label="Pending" value={statistics.pendingIssues} change="" />

        {/* RESOLVED */}

        <Stat label="Resolved" value={statistics.resolvedIssues} />
      </div>

      {/* ======================================
          ISSUE QUEUE
      ====================================== */}

      <Panel
        title="Issue queue"
        subtitle="Issues reported from your assigned ward"
      >
        {/* ====================================
            FILTER BUTTONS
        ==================================== */}

        <div
          className="
            flex
            flex-wrap
            gap-2
          "
        >
          <button
            className="
              rounded-lg
              bg-[#e5f4f0]
              px-3
              py-2
              text-xs
              font-bold
              text-[#08776d]
            "
          >
            All issues
          </button>

          <button
            className="
              rounded-lg
              border
              border-slate-200
              px-3
              py-2
              text-xs
              font-semibold
            "
          >
            Critical
          </button>

          <button
            className="
              rounded-lg
              border
              border-slate-200
              px-3
              py-2
              text-xs
              font-semibold
            "
          >
            Pending &gt; 7 days
          </button>

          <button
            className="
              rounded-lg
              border
              border-slate-200
              px-3
              py-2
              text-xs
              font-semibold
            "
          >
            Missing data
          </button>
        </div>

        {/* ====================================
            LOADING
        ==================================== */}

        {loading && (
          <div
            className="
              mt-5
              text-sm
              text-slate-500
            "
          >
            Loading issues...
          </div>
        )}

        {/* ====================================
            ERROR
        ==================================== */}

        {error && (
          <div
            className="
              mt-5
              text-sm
              text-red-600
            "
          >
            {error}
          </div>
        )}

        {/* ====================================
            NO ISSUES
        ==================================== */}

        {!loading && !error && issues.length === 0 && (
          <div
            className="
                mt-5
                text-sm
                text-slate-500
              "
          >
            No issues found in your assigned ward.
          </div>
        )}

        {/* ====================================
            ISSUES FROM BACKEND
        ==================================== */}

        {!loading && !error && issues.length > 0 && (
          <div
            className="
                mt-5
                space-y-3
              "
          >
            {issues.map((issue, index) => (
              <div
                key={issue._id || issue.id || index}
                className="
                      flex
                      flex-wrap
                      items-center
                      gap-3
                      rounded-xl
                      border
                      border-slate-100
                      p-4
                    "
              >
                {/* =========================
                        ISSUE ID
                    ========================= */}

                <span
                  className="
                        text-xs
                        font-bold
                        text-slate-400
                      "
                >
                  #{issue._id ? String(issue._id).slice(-6) : index + 1}
                </span>

                {/* =========================
                        TITLE + LOCATION +
                        DESCRIPTION
                    ========================= */}

                <div
                  className="
                        min-w-32
                        flex-1
                      "
                >
                  {/* TITLE */}

                  <div
                    className="
                          font-semibold
                        "
                  >
                    {issue.category || issue.title || "Unknown issue"}

                    {/* LOCATION */}

                    <small
                      className="
                            ml-2
                            font-normal
                            text-slate-400
                          "
                    >
                      {issue.ward ? formatWard(issue.ward) : ""}

                      {issue.district ? ` · ${issue.district}` : ""}
                    </small>
                  </div>

                  {/* DESCRIPTION */}

                  <p
                    className="
                          mt-1
                          text-xs
                          font-normal
                          leading-5
                          text-slate-500
                        "
                  >
                    {issue.description ||
                      issue.problemDescription ||
                      issue.details ||
                      issue.problemDetails ||
                      "No description provided"}
                  </p>

                  {/* ISSUE DATE & TIME */}

                  <p
                    className="
                          mt-2
                          text-xs
                          text-slate-400
                        "
                  >
                    Reported on {formatIssueDateTime(issue.createdAt)}
                  </p>

                  {/* ADDRESS */}

                  {issue.address && (
                    <p
                      className="
                            mt-1
                            text-xs
                            text-slate-400
                          "
                    >
                      {issue.address}
                    </p>
                  )}
                </div>

                {/* =========================
                        PRIORITY
                    ========================= */}

                <span
                  className="
                        rounded-full
                        bg-orange-50
                        px-2
                        py-1
                        text-xs
                        font-semibold
                        text-orange-700
                      "
                >
                  {issue.priority || "Normal"}
                </span>

                {/* =========================
                        STATUS
                    ========================= */}

                <span
                  className="
                        text-xs
                        text-slate-500
                      "
                >
                  {formatStatus(issue.status)}
                </span>

                {/* =========================
                        VIEW DETAILS BUTTON
                    ========================= */}

                <Link
                  to={`/admin/issues/${issue._id || issue.id}`}
                  className="rounded-lg bg-[#0b766d] px-4 py-2 text-xsfont-semibold text-white transition hover:bg-[#095f58]"
                >
                  {" "}
                  View Details{" "}
                </Link>

                {/* =========================
                        ARROW
                    ========================= */}

                <span
                  className="
                        text-slate-300
                      "
                >
                  ›
                </span>
              </div>
            ))}
          </div>
        )}
      </Panel>
    </PageFrame>
  );
}
