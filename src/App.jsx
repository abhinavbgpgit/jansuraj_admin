import { BrowserRouter, Route, Routes } from "react-router-dom";

import AdminLayout from "./components/AdminLayout";

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

// ==================================
// Ward Head Pages
// ==================================

import WardHeadRegister from "./pages/WardHeadRegister";
import WardHeadLogin from "./pages/WardHeadLogin";
import WardHeadApprovalStatus from "./pages/wardHeadApprovalStatus";
import WardHeadWelcome from "./pages/WardHeadWelcome";

function App() {
  return (
    <BrowserRouter>
      <Routes>

         {/* ================================== */}
        {/* Ward Head Welcome Page */}
        {/* ================================== */}

        <Route
          path="/"
          element={<WardHeadWelcome />}
        />

        {/* ================================== */}
        {/* Ward Head Public Routes */}
        {/* ================================== */}

        <Route
          path="/ward-head/register"
          element={<WardHeadRegister />}
        />

        <Route
          path="/ward-head/login"
          element={<WardHeadLogin />}
        />

         <Route
          path="/ward-head/approval-status"
          element={<WardHeadApprovalStatus />}
        />

        {/* ================================== */}
        {/* Admin Routes */}
        {/* ================================== */}

        <Route 
         path="/admin"
         element={<AdminLayout />}>

          <Route
            index
            element={<Dashboard />}
          />

          <Route
            path="users"
            element={<Users />}
          />

          <Route
            path="issues"
            element={<Issues />}
          />

          <Route
            path="issues/:id"
            element={<IssueDetails />}
          />

          <Route
            path="geography"
            element={<Geography />}
          />

          <Route
            path="analytics"
            element={<Analytics />}
          />

          <Route
            path="calendar"
            element={<Calendar />}
          />

          <Route
            path="alerts"
            element={<Alerts />}
          />

          <Route
            path="reports"
            element={<Reports />}
          />

          <Route
            path="admin-audit"
            element={<AdminAudit />}
          />

          <Route
            path="settings"
            element={<Settings />}
          />

        </Route>


        {/* ================================== */}
        {/* Fallback Route */}
        {/* ================================== */}

        {/* <Route
          path="*"
          element={<Dashboard />}
        /> */}

        <Route
          path="*"
          element={<WardHeadWelcome />}
        />

      </Routes>
    </BrowserRouter>
  );
}

export default App;