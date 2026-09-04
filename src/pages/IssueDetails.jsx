import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";

import PageFrame, { Panel } from "../components/PageFrame";

export default function IssueDetails() {
  // ==========================================
  // GET ISSUE ID FROM URL
  // ==========================================

  const { id } = useParams();

  // ==========================================
  // STATE
  // ==========================================

  const [issue, setIssue] = useState(null);
  const [reporter, setReporter] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // ==========================================
  // FETCH WARD HEAD ISSUES
  //
  // GET /api/ward-head/dashboard
  //
  // Backend automatically returns only issues
  // from logged-in Ward Head's own location.
  // ==========================================

  useEffect(() => {
    const fetchIssueDetails = async () => {
      try {
        setLoading(true);
        setError("");

        const backendUrl = import.meta.env.VITE_BACKEND_URL;

        if (!backendUrl) {
          setError("Backend URL is not configured.");
          return;
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
          setError(response.data?.message || "Failed to load issue details.");

          return;
        }

        // ======================================
        // GET ONLY WARD HEAD'S ISSUES
        // ======================================

        const wardIssues = Array.isArray(response.data?.recentIssues)
          ? response.data.recentIssues
          : [];

        // ======================================
        // FIND ISSUE FROM URL ID
        //
        // This issue is already filtered by
        // backend according to Ward Head's ward.
        // ======================================

        const selectedIssue = wardIssues.find(
          (item) => String(item._id || item.id) === String(id)
        );

        // ======================================
        // ISSUE NOT FOUND
        // ======================================

        if (!selectedIssue) {
          setIssue(null);

          setReporter(null);

          setError(
            "Issue not found or this issue does not belong to your assigned ward."
          );

          return;
        }

        // ======================================
        // SET ISSUE
        // ======================================

        setIssue(selectedIssue);

        // ======================================
        // SET REPORTER
        //
        // createdBy is populated by backend
        // in Ward Head Dashboard Controller.
        // ======================================

        const createdBy = selectedIssue.createdBy;

        if (createdBy && typeof createdBy === "object") {
          setReporter(createdBy);
        } else {
          setReporter(null);
        }
      } catch (error) {
        console.error(
          "Ward Head issue details fetch error:",
          error.response?.data || error.message
        );

        setError(
          error.response?.data?.message ||
            error.message ||
            "Failed to load issue details."
        );
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchIssueDetails();
    } else {
      setLoading(false);

      setError("Issue ID is missing.");
    }
  }, [id]);

  // ==========================================
  // FORMAT DATE & TIME
  // ==========================================

  const formatDateTime = (date) => {
    if (!date) {
      return "Not available";
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
  // GET REPORTER NAME
  // ==========================================

  const getReporterName = (reporter) => {
    if (!reporter) {
      return "Not available";
    }

    // ========================================
    // DIRECT NAME
    // ========================================

    if (reporter.name && String(reporter.name).trim()) {
      return String(reporter.name).trim();
    }

    // ========================================
    // FIRST + MIDDLE + LAST NAME
    // ========================================

    const fullName = [
      reporter.firstName,
      reporter.middleName,
      reporter.lastName,
    ]
      .filter(Boolean)
      .join(" ")
      .trim();

    if (fullName) {
      return fullName;
    }

    return "Not available";
  };

  // ==========================================
  // STATUS DISPLAY
  // ==========================================

  const getStatusClass = (status) => {
    switch (String(status || "").toLowerCase()) {
      case "resolved":
        return "bg-green-50 text-green-700";

      case "in-progress":
        return "bg-orange-50 text-orange-700";

      case "pending":
      default:
        return "bg-yellow-50 text-yellow-700";
    }
  };

  // ==========================================
  // GET STATUS TEXT
  // ==========================================

  const getStatusText = (status) => {
    switch (String(status || "").toLowerCase()) {
      case "resolved":
        return "Resolved";

      case "in-progress":
        return "In Progress";

      case "pending":
      default:
        return "Pending";
    }
  };

  // ==========================================
  // LOADING
  // ==========================================

  if (loading) {
    return (
      <PageFrame
        title="Issue Details"
        description="View complete issue information."
        action={null}
      >
        <Panel>
          <div className="py-10 text-center text-sm text-slate-500">
            Loading issue details...
          </div>
        </Panel>
      </PageFrame>
    );
  }

  // ==========================================
  // ERROR
  // ==========================================

  if (error) {
    return (
      <PageFrame
        title="Issue Details"
        description="View complete issue information."
        action={null}
      >
        <Panel>
          <div className="py-6 text-center">
            <p className="text-sm text-red-600">{error}</p>

            <Link
              to="/issues"
              className="mt-4 inline-block rounded-lg bg-[#0b766d] px-4 py-2 text-sm font-semibold text-white"
            >
              Back to Issues
            </Link>
          </div>
        </Panel>
      </PageFrame>
    );
  }

  // ==========================================
  // ISSUE NOT FOUND
  // ==========================================

  if (!issue) {
    return (
      <PageFrame
        title="Issue Details"
        description="View complete issue information."
        action={null}
      >
        <Panel>
          <div className="py-10 text-center">
            <p className="text-sm text-slate-500">Issue not found.</p>

            <Link
              to="/issues"
              className="mt-4 inline-block rounded-lg bg-[#0b766d] px-4 py-2 text-sm font-semibold text-white"
            >
              Back to Issues
            </Link>
          </div>
        </Panel>
      </PageFrame>
    );
  }

  // ==========================================
  // UI
  // ==========================================

  return (
    <PageFrame
      title="Issue Details"
      description="View complete issue information."
      action={null}
    >
      {/* ======================================
          BACK BUTTON
      ====================================== */}

      <div className="mb-5">
        <Link
          to="/issues"
          className="inline-flex items-center rounded-lg border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
        >
          ← Back to Issues
        </Link>
      </div>

      {/* ======================================
          ISSUE DETAILS
      ====================================== */}

      <Panel
        title={issue.category || issue.title || "Issue Details"}
        subtitle="Complete information about this reported issue"
      >
        <div className="grid gap-6 lg:grid-cols-2">
          {/* ==================================
              LEFT SIDE
          ================================== */}

          <div className="space-y-5">
            {/* ISSUE ID */}

            <div>
              <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                Issue ID
              </p>

              <p className="mt-1 break-all text-sm font-semibold text-slate-800">
                #{issue._id || issue.id || "Not available"}
              </p>
            </div>

            {/* DESCRIPTION */}

            <div>
              <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                Description
              </p>

              <p className="mt-2 whitespace-pre-wrap text-sm leading-6 text-slate-700">
                {issue.description ||
                  issue.problemDescription ||
                  issue.details ||
                  issue.problemDetails ||
                  "No description provided"}
              </p>
            </div>

            {/* ADDRESS */}

            {issue.address && String(issue.address).trim() && (
              <div>
                <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                  Address
                </p>

                <p className="mt-2 text-sm text-slate-700">{issue.address}</p>
              </div>
            )}
          </div>

          {/* ==================================
              RIGHT SIDE
          ================================== */}

          <div className="space-y-5 rounded-xl border border-slate-100 bg-slate-50 p-5">
            {/* STATUS */}

            <div>
              <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                Status
              </p>

              <span
                className={`mt-2 inline-block rounded-full px-3 py-1 text-xs font-semibold ${getStatusClass(
                  issue.status
                )}`}
              >
                {getStatusText(issue.status)}
              </span>
            </div>

            {/* PRIORITY */}

            <div>
              <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                Priority
              </p>

              <p className="mt-2 text-sm font-semibold text-slate-700">
                {issue.priority || "Normal"}
              </p>
            </div>

            {/* REPORT COUNT */}

            <div>
              <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                Total Support
              </p>

              <p className="mt-2 text-sm font-semibold text-slate-700">
                {issue.reportCount || 1} people
              </p>
            </div>

            {/* REPORTED DATE */}

            <div>
              <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                Reported Date & Time
              </p>

              <p className="mt-2 text-sm font-semibold text-slate-700">
                {formatDateTime(issue.createdAt)}
              </p>
            </div>
          </div>
        </div>
      </Panel>

      {/* ======================================
          REPORTER DETAILS
      ====================================== */}

      <div className="mt-6">
        <Panel
          title="Reporter Details"
          subtitle="Citizen who reported this issue"
        >
          {reporter && typeof reporter === "object" ? (
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {/* REPORTER NAME */}

              <div>
                <p className="text-xs font-semibold text-slate-400">
                  Reporter Name
                </p>

                <p className="mt-1 text-base font-semibold text-slate-800">
                  {getReporterName(reporter)}
                </p>
              </div>

              {/* PHONE */}

              {reporter.phone && (
                <div>
                  <p className="text-xs font-semibold text-slate-400">
                    Mobile Number
                  </p>

                  <p className="mt-1 text-base font-semibold text-slate-700">
                    {reporter.phone}
                  </p>
                </div>
              )}

              {/* REPORTER DISTRICT */}

              {reporter.district && (
                <div>
                  <p className="text-xs font-semibold text-slate-400">
                    District
                  </p>

                  <p className="mt-1 font-semibold text-slate-700">
                    {reporter.district}
                  </p>
                </div>
              )}

              {/* REPORTER AREA TYPE */}

              {reporter.areaType && (
                <div>
                  <p className="text-xs font-semibold text-slate-400">
                    Area Type
                  </p>

                  <p className="mt-1 font-semibold capitalize text-slate-700">
                    {reporter.areaType}
                  </p>
                </div>
              )}

              {/* REPORTER LOCAL BODY */}

              {reporter.localBody && (
                <div>
                  <p className="text-xs font-semibold text-slate-400">
                    Local Body
                  </p>

                  <p className="mt-1 font-semibold text-slate-700">
                    {reporter.localBody}
                  </p>
                </div>
              )}

              {/* REPORTER BLOCK */}

              {reporter.block && (
                <div>
                  <p className="text-xs font-semibold text-slate-400">Block</p>

                  <p className="mt-1 font-semibold text-slate-700">
                    {reporter.block}
                  </p>
                </div>
              )}

              {/* REPORTER PANCHAYAT */}

              {reporter.panchayat && (
                <div>
                  <p className="text-xs font-semibold text-slate-400">
                    Panchayat
                  </p>

                  <p className="mt-1 font-semibold text-slate-700">
                    {reporter.panchayat}
                  </p>
                </div>
              )}

              {/* REPORTER WARD */}

              {reporter.ward && (
                <div>
                  <p className="text-xs font-semibold text-slate-400">Ward</p>

                  <p className="mt-1 font-semibold text-slate-700">
                    {reporter.ward}
                  </p>
                </div>
              )}
            </div>
          ) : (
            <p className="text-sm text-slate-500">
              Reporter details are not available.
            </p>
          )}
        </Panel>
      </div>

      {/* ======================================
          LOCATION DETAILS
      ====================================== */}

      <div className="mt-6">
        <Panel title="Location Details" subtitle="Reported issue location">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {/* DISTRICT */}

            {issue.district && (
              <div>
                <p className="text-xs font-semibold text-slate-400">District</p>

                <p className="mt-1 font-semibold text-slate-700">
                  {issue.district}
                </p>
              </div>
            )}

            {/* AREA TYPE */}

            {issue.areaType && (
              <div>
                <p className="text-xs font-semibold text-slate-400">
                  Area Type
                </p>

                <p className="mt-1 font-semibold capitalize text-slate-700">
                  {issue.areaType}
                </p>
              </div>
            )}

            {/* WARD */}

            {issue.ward && (
              <div>
                <p className="text-xs font-semibold text-slate-400">Ward</p>

                <p className="mt-1 font-semibold text-slate-700">
                  {issue.ward}
                </p>
              </div>
            )}

            {/* LOCAL BODY */}

            {issue.localBody && (
              <div>
                <p className="text-xs font-semibold text-slate-400">
                  Local Body
                </p>

                <p className="mt-1 font-semibold text-slate-700">
                  {issue.localBody}
                </p>
              </div>
            )}

            {/* BLOCK */}

            {issue.block && (
              <div>
                <p className="text-xs font-semibold text-slate-400">Block</p>

                <p className="mt-1 font-semibold text-slate-700">
                  {issue.block}
                </p>
              </div>
            )}

            {/* PANCHAYAT */}

            {issue.panchayat && (
              <div>
                <p className="text-xs font-semibold text-slate-400">
                  Panchayat
                </p>

                <p className="mt-1 font-semibold text-slate-700">
                  {issue.panchayat}
                </p>
              </div>
            )}
          </div>
        </Panel>
      </div>

      {/* ======================================
          PHOTOS
      ====================================== */}

      {Array.isArray(issue.photos) &&
        issue.photos.filter(Boolean).length > 0 && (
          <div className="mt-6">
            <Panel
              title="Issue Photos"
              subtitle="Photos uploaded with this report"
            >
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {issue.photos.filter(Boolean).map((photo, index) => (
                  <img
                    key={index}
                    src={photo}
                    alt={`Issue ${index + 1}`}
                    className="h-48 w-full rounded-xl object-cover"
                  />
                ))}
              </div>
            </Panel>
          </div>
        )}

      {/* ======================================
          VIDEOS
      ====================================== */}

      {Array.isArray(issue.videoLinks) &&
        issue.videoLinks.filter(Boolean).length > 0 && (
          <div className="mt-6">
            <Panel
              title="Issue Videos"
              subtitle="Videos uploaded with this report"
            >
              <div className="space-y-4">
                {issue.videoLinks.filter(Boolean).map((video, index) => (
                  <video key={index} controls className="w-full rounded-xl">
                    <source src={video} />
                    Your browser does not support video playback.
                  </video>
                ))}
              </div>
            </Panel>
          </div>
        )}
    </PageFrame>
  );
}
