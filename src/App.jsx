import { BrowserRouter, Route, Routes } from "react-router-dom";

import AdminLayout from "./components/AdminLayout";
import WardHeadProtectedRoute from "./components/WardHeadProtectedRoute";

import Dashboard from "./pages/Dashboard";
import Users from "./pages/Users";
import Issues from "./pages/Issues";
import IssueDetails from "./pages/IssueDetails";
import Geography from "./pages/Geography";
import Analytics from "./pages/Analytics";
import Calendar from "./pages/Calendar";
import Alerts from "./pages/Alerts";
import Reports from "./pages/Reports";
import AdminAudit from "./pages/AdminAudit";
import Settings from "./pages/Settings";

// Ward Head Pages
import WardHeadRegister from "./pages/WardHeadRegister";
import WardHeadLogin from "./pages/WardHeadLogin";
import WardHeadApprovalStatus from "./pages/wardHeadApprovalStatus";
import WardHeadWelcome from "./pages/WardHeadWelcome";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* ========================= */}
        {/* PUBLIC WELCOME */}
        {/* ========================= */}

        <Route path="/" element={<WardHeadWelcome />} />

        {/* ========================= */}
        {/* PUBLIC AUTH ROUTES */}
        {/* ========================= */}

        <Route path="/ward-head/register" element={<WardHeadRegister />} />

        <Route path="/ward-head/login" element={<WardHeadLogin />} />

        {/* ========================= */}
        {/* PROTECTED WARD HEAD ROUTES */}
        {/* ========================= */}

        <Route
          path="/ward-head"
          element={
            <WardHeadProtectedRoute>
              <AdminLayout />
            </WardHeadProtectedRoute>
          }
        >
          <Route index element={<Dashboard />} />

          {/* Dashboard */}
          <Route path="dashboard" element={<Dashboard />} />

          {/* Users */}
          <Route path="users" element={<Users />} />

          {/* Issues */}
          <Route path="issues" element={<Issues />} />

          <Route path="issues/:id" element={<IssueDetails />} />

          {/* Geography */}
          <Route path="geography" element={<Geography />} />

          {/* Analytics */}
          <Route path="analytics" element={<Analytics />} />

          {/* Calendar */}
          <Route path="calendar" element={<Calendar />} />

          {/* Alerts */}
          <Route path="alerts" element={<Alerts />} />

          {/* Reports */}
          <Route path="reports" element={<Reports />} />

          {/* Admin Audit */}
          <Route path="admin-audit" element={<AdminAudit />} />

          {/* Settings */}
          <Route path="settings" element={<Settings />} />
        </Route>

        {/* ========================= */}
        {/* PROTECTED APPROVAL STATUS */}
        {/* ========================= */}

        <Route
          path="/ward-head/approval-status"
          element={
            <WardHeadProtectedRoute>
              <WardHeadApprovalStatus />
            </WardHeadProtectedRoute>
          }
        />

        {/* ========================= */}
        {/* ALL UNKNOWN URL → WELCOME */}
        {/* ========================= */}

        <Route path="*" element={<WardHeadWelcome />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
